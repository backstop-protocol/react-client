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

let userInfo = {};
let originalUserInfo = {}
let user = null;
let web3 = null;
let networkId = null;

export const refreshUserInfo = () => {
    [0, 1500, 5000, 1900, 3000].forEach(timeOut => {
        setTimeout(()=> EventBus.$emit("get-user-info"), timeOut)
    })
}

function increaseABit(number) {
    return parseInt(1.2 * number);
}

// verification actions
export function getLiquidationPrice(valEth, valDai) {
    if (!userInfo) return 0;

    console.log(valEth, valDai);

    const retVal = calcNewBorrowLimitAndLiquidationPrice(originalUserInfo, web3.utils.toWei(valEth.toString()), web3.utils.toWei(valDai.toString()), web3);
    retVal[0] = web3.utils.fromWei(retVal[0]);
    retVal[1] = web3.utils.fromWei(retVal[1]);
    return retVal;
}

export function validateDeposit(val) { return verifyDepositInput(originalUserInfo, web3.utils.toWei(val.toString()), web3) }
export function validateWithdraw(val) { return verifyWithdrawInput(originalUserInfo, web3.utils.toWei(val.toString()), web3) }
export function validateBorrow(val) { return verifyBorrowInput(originalUserInfo, web3.utils.toWei(val.toString()), web3) }
export function validateRepay(val) { return verifyRepayInput(originalUserInfo, web3.utils.toWei(val.toString()), web3) }

// meta actions

export function setUserInfo(u, w3, id, info, orgInfo) {
    user = u;
    web3 = w3;
    networkId = id;
    userInfo = info;
    originalUserInfo = orgInfo;
    checkForUnlockedEth()
}

export function checkForUnlockedEth() {
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
        EventBus.$emit('app-alert', 'claim unlocked ETH pending')
        const action = B.claimUnlockedCollateral(web3, networkId, userInfo.proxyInfo.userProxy, userInfo.bCdpInfo.cdp, originalUserInfo.bCdpInfo.unlockedEth)
        await ApiAction(action, user, web3, 0)
        refreshUserInfo()
    } catch (err) {
        checkForUnlockedEth()
        throw err
    }
}

export function isRepayUnlocked() {
    return repayUnlocked(web3, userInfo);
}

// concrete actions

export async function migrateMakerDao() {
    if (userInfo.bCdpInfo.hasCdp) {
        return await ApiAction(B.migrateToExisting(web3, networkId, userInfo.proxyInfo.userProxy, userInfo.makerdaoCdpInfo.cdp, userInfo.bCdpInfo.cdp), user, web3, 0);
    }
    else { // first deposit
        return await ApiAction(
            B.migrateFresh(web3, networkId, userInfo.proxyInfo.userProxy, userInfo.makerdaoCdpInfo.cdp),
            user,
            web3,
            0
        );
    }
}

export async function exportBackToMakerDao(onHash) {
    try{
        const exportCdpBackToMakerDao = B.exportFresh(web3, networkId, userInfo.proxyInfo.userProxy, userInfo.bCdpInfo.cdp)
        // wrapping the transactions with an async transaction validator
        return await ApiAction(exportCdpBackToMakerDao, user, web3, 0, onHash)
    } catch (err){
        console.error('exportBackToMakerDao function failed: failed to export user CDP back to maker ')
        throw(err)
    }
}

export async function deposit(amountEth, onHash) {
    const val = web3.utils.toWei(amountEth);
    if (userInfo.bCdpInfo.hasCdp) {
        return await ApiAction(B.depositETH(web3, networkId, userInfo.proxyInfo.userProxy, userInfo.bCdpInfo.cdp), user, web3, val, onHash);
    }
    else { // first deposit
        return await ApiAction(B.firstDeposit(web3, networkId, user), user, web3, val, onHash);
    }
}

export async function withdraw(amountEth, onHash) {
    const val = web3.utils.toWei(amountEth);
    return await ApiAction(B.withdrawETH(web3, networkId, userInfo.proxyInfo.userProxy, userInfo.bCdpInfo.cdp, val), user, web3, 0, onHash);
}

export async function borrow(amountDai, onHash) {
    const val = web3.utils.toWei(amountDai);
    return await ApiAction(B.generateDai(web3, networkId, userInfo.proxyInfo.userProxy, userInfo.bCdpInfo.cdp, val), user, web3, 0, onHash);
}

export async function unlock(onHash) {
    return await ApiAction(B.unlockDai(web3, networkId, userInfo.proxyInfo.userProxy), user, web3, 0, onHash);
}

export async function repay(amountDai, onHash) {
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
