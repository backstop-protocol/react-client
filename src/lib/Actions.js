import React, {Component} from "react"
import * as Api from "./ApiHelper";
import * as B from "./bInterface"
import EventBus from "./EventBus";
import { ApiAction } from "./ApiHelper";
import { calcNewBorrowLimitAndLiquidationPrice } from "./bInterface";
import { verifyWithdrawInput } from "./bInterface";
import { verifyDepositInput } from "./bInterface";
import { verifyBorrowInput } from "./bInterface";
import { verifyRepayInput } from "./bInterface";
import { repayUnlocked } from "./ApiHelper";
import makerStoreManager from "../../src/stores/maker.store"
import userStore from "../../src/stores/user.store"
import GemModal from "../components/modals/GemModal"
import {fromUiDeciamlPointFormat, hasAllowance} from "./Utils"
import Web3 from "web3"
const {toWei} = Web3.utils

export const refreshUserInfo = () => {
    makerStoreManager.getMakerStore().getUserInfo()
}

function increaseABit(number) {
    return parseInt(1.2 * number);
}

// verification actions
export function getLiquidationPrice(valEth, valDai) {
    const {userInfo, originalUserInfo, ilk} = makerStoreManager.getMakerStore()
    const {web3} = userStore
    if (!userInfo) return 0;

    console.log(valEth, valDai);

    const retVal = calcNewBorrowLimitAndLiquidationPrice(originalUserInfo, web3.utils.toWei(valEth.toString()), web3.utils.toWei(valDai.toString()), ilk);
    retVal[0] = web3.utils.fromWei(retVal[0]);
    retVal[1] = web3.utils.fromWei(retVal[1]);
    return retVal;
}

export function validateDeposit(val) {
    const {originalUserInfo, userInfo} = makerStoreManager.getMakerStore() 
    val = fromUiDeciamlPointFormat(val, userInfo.miscInfo.gemDecimals).toString()
    return verifyDepositInput(originalUserInfo, val) 
}

export function validateWithdraw(val) { 
    const {originalUserInfo, ilk} = makerStoreManager.getMakerStore()
    const {web3} = userStore
    return verifyWithdrawInput(originalUserInfo, toWei(val.toString()), ilk) 
}

export function validateBorrow(val) { 
    const {originalUserInfo} = makerStoreManager.getMakerStore()
    const {web3} = userStore
    return verifyBorrowInput(originalUserInfo, web3.utils.toWei(val.toString()), web3) 
}

export function validateRepay(val) { 
    const {originalUserInfo} = makerStoreManager.getMakerStore()
    const {web3} = userStore
    return verifyRepayInput(originalUserInfo, web3.utils.toWei(val.toString()), web3) 
}

// meta actions
// TODO: rename this and call it witout setting globals
export function setUserInfo() {
    checkForUnlockedEth()
    checkForLiquidation()
}

export function checkForLiquidation() {
    const {userInfo} = makerStoreManager.getMakerStore()
    if(userInfo && userInfo.bCdpInfo && userInfo.bCdpInfo.ethDeposit == 0 && userInfo.bCdpInfo.expectedDebtMissmatch) {
        const msg = 'Your Vault might be externally liquidated now'
        EventBus.$emit('app-alert', msg)
    }
}

export function checkForUnlockedEth() {
    const {userInfo} = makerStoreManager.getMakerStore()
    const {web3} = userStore
    if(userInfo && userInfo.bCdpInfo && userInfo.bCdpInfo.unlockedEth) {
        const eth = userInfo.bCdpInfo.unlockedEth.toFixed(4)
        const msg = `your ETH vault auction is completed. you have ${eth} ETH to claim`
        const btn = 'claim'
        const btnAction = claimUnlockedEth
        EventBus.$emit('app-alert', msg, btn, btnAction)
    }
}

export async function claimUnlockedEth() {
    try {
        const {userInfo, originalUserInfo, getUserInfo, ilk} = makerStoreManager.getMakerStore()
        const {web3, networkType: networkId, user} = userStore
        EventBus.$emit('app-alert', 'claim unlocked ETH pending')
        const action = B.claimUnlockedCollateral(web3, networkId, userInfo.proxyInfo.userProxy, userInfo.bCdpInfo.cdp, originalUserInfo.bCdpInfo.unlockedEth, ilk)
        await ApiAction(action, user, web3, 0)
        getUserInfo()
    } catch (err) {
        checkForUnlockedEth()
        throw err
    }
}

export function isRepayUnlocked() {
    const {userInfo} = makerStoreManager.getMakerStore()
    const {web3} = userStore
    return repayUnlocked(web3, userInfo);
}

// concrete actions

export async function migrateMakerDao() {
    const {userInfo, ilk} = makerStoreManager.getMakerStore()
    const {web3, networkType: networkId, user} = userStore
    if (userInfo.bCdpInfo.hasCdp) {
        return await ApiAction(B.migrateToExisting(web3, networkId, userInfo.proxyInfo.userProxy, userInfo.makerdaoCdpInfo.cdp, userInfo.bCdpInfo.cdp, ilk), user, web3, 0);
    }
    else { // first deposit
        return await ApiAction(
            B.migrateFresh(web3, networkId, userInfo.proxyInfo.userProxy, userInfo.makerdaoCdpInfo.cdp, ilk),
            user,
            web3,
            0
        );
    }
}

export async function exportBackToMakerDao(onHash) {
    try{
        const {userInfo, ilk} = makerStoreManager.getMakerStore()
        const {web3, networkType: networkId, user} = userStore
        const exportCdpBackToMakerDao = B.exportFresh(web3, networkId, userInfo.proxyInfo.userProxy, userInfo.bCdpInfo.cdp, ilk)
        // wrapping the transactions with an async transaction validator
        return await ApiAction(exportCdpBackToMakerDao, user, web3, 0, onHash)
    } catch (err){
        console.error('exportBackToMakerDao function failed: failed to export user CDP back to maker ')
        throw(err)
    }
}

export async function deposit(amountEth, onHash) {
    const {userInfo, ilk, isGem} = makerStoreManager.getMakerStore()
    if(isGem){
        return depositGem(amountEth, onHash)
    }
    const {web3, networkType: networkId, user} = userStore
    const val = web3.utils.toWei(amountEth);
    if (userInfo.bCdpInfo.hasCdp) {
        return await ApiAction(B.depositETH(web3, networkId, userInfo.proxyInfo.userProxy, userInfo.bCdpInfo.cdp, ilk), user, web3, val, onHash);
    }
    else { // first deposit
        return await ApiAction(B.firstDepositETH(web3, networkId, user, ilk), user, web3, val, onHash);
    }
}

export async function openProxy () {
    const {web3, networkType: networkId, user} = userStore
    const tx = B.openProxy(web3, networkId, user)
    return await ApiAction(tx, user, web3, 0)
}

export async function unlockGem () {
    const {web3, networkType: networkId, user} = userStore
    const {userInfo, ilk} = makerStoreManager.getMakerStore()
    const tx = B.unlockGem(web3, networkId, userInfo.proxyInfo.userProxy, ilk)
    return await ApiAction(tx, user, web3, 0)
}

function openGemDepositModal(depositFn) {
    return new Promise((resolve, reject) => {
        const noWrapper = true
        EventBus.$emit('show-modal', <GemModal depositFn={depositFn}/>, noWrapper)
        EventBus.$on('close-modal', ()=> reject(new Error("GEM_MODAL_CLOSED")))
    })
}

export async function depositGem(amount, onHash) {
    const {userInfo, ilk} = makerStoreManager.getMakerStore()
    const {web3, networkType: networkId, user} = userStore
    // check for user proxy
    let userProxy = userInfo.proxyInfo.userProxy
    if(!userProxy || !hasAllowance(userInfo.userWalletInfo.gemAllowance)){
        return openGemDepositModal(()=> depositGem(amount, onHash))
    }
    // deposit
    const val = 0
    const amt = fromUiDeciamlPointFormat(amount, userInfo.miscInfo.gemDecimals)
    if (userInfo.bCdpInfo.hasCdp) {
        const tx = B.depositGem(web3, networkId, userProxy, userInfo.bCdpInfo.cdp, amt, ilk)
        return ApiAction(tx, user, web3, val, onHash);
    }
    else { // first deposit
        const tx = B.firstDepositGem(web3, networkId, userProxy, amt, ilk)
        return ApiAction(tx, user, web3, val, onHash);
    }
}

export async function withdraw(amountEth, onHash) {
    const {userInfo, ilk, isGem} = makerStoreManager.getMakerStore()
    if(isGem) {
        return withdrawGem(amountEth, onHash)
    }
    const {web3, networkType: networkId, user} = userStore
    const val = web3.utils.toWei(amountEth);
    return await ApiAction(B.withdrawETH(web3, networkId, userInfo.proxyInfo.userProxy, userInfo.bCdpInfo.cdp, val, ilk), user, web3, 0, onHash);
}

export async function withdrawGem(amount, onHash) {
    const {userInfo, ilk} = makerStoreManager.getMakerStore()
    const {web3, networkType: networkId, user} = userStore
    const val = fromUiDeciamlPointFormat(amount, userInfo.miscInfo.gemDecimals)
    return await ApiAction(B.withdrawGem(web3, networkId, userInfo.proxyInfo.userProxy, userInfo.bCdpInfo.cdp, val, ilk), user, web3, 0, onHash);
}

export async function borrow(amountDai, onHash) {
    const {userInfo} = makerStoreManager.getMakerStore()
    const {web3, networkType: networkId, user} = userStore
    const val = web3.utils.toWei(amountDai);
    return await ApiAction(B.generateDai(web3, networkId, userInfo.proxyInfo.userProxy, userInfo.bCdpInfo.cdp, val), user, web3, 0, onHash);
}

export async function unlock(onHash) {
    const {userInfo} = makerStoreManager.getMakerStore()
    const {web3, networkType: networkId, user} = userStore
    return await ApiAction(B.unlockDai(web3, networkId, userInfo.proxyInfo.userProxy), user, web3, 0, onHash);
}

export async function repay(amountDai, onHash) {
    const {userInfo} = makerStoreManager.getMakerStore()
    const {web3, networkType: networkId, user} = userStore
    const val = web3.utils.toWei(amountDai);
    if (Number(userInfo.bCdpInfo.daiDebt) <= Number(amountDai) + 1) {
        return await ApiAction(B.repayAllDai(web3, networkId, userInfo.proxyInfo.userProxy, userInfo.bCdpInfo.cdp), user, web3, 0, onHash);
    }
    else {
        return await ApiAction(B.repayDai(web3, networkId, userInfo.proxyInfo.userProxy, userInfo.bCdpInfo.cdp, val), user, web3, 0, onHash);
    }

}

export async function doApiAction(action, value, actionData, onHash) {
    let res;
    switch (action) {
        case 'unlock':
            res = await unlock(onHash);
            break;
        case 'deposit':
            res = await deposit(value, onHash);
            break;
        case 'withdraw':
            res = await withdraw(value, onHash);
            break;
        case 'borrow':
            res = await borrow(value, onHash);
            break;
        case 'repay':
            res = await repay(value, onHash);
            break;
    }

    if (res) {
        if (res.status) {
            EventBus.$emit('action-completed', res, action, actionData);
        }
        else {
            EventBus.$emit('action-failed', res, action, actionData);
        }
    }
}
