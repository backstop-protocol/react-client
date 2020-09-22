import * as Api from "./ApiHelper";
import * as B from "./bInterface"
import EventBus from "./EventBus";
import {ApiAction} from "./ApiHelper";
import {calcNewBorrowLimitAndLiquidationPrice} from "./bInterface";
import {verifyWithdrawInput} from "./bInterface";
import {verifyDepositInput} from "./bInterface";
import {verifyBorrowInput} from "./bInterface";
import {verifyRepayInput} from "./bInterface";

let userInfo = {};
let originalUserInfo = {}
let user = null;
let web3 = null;

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

export function setUserInfo(u, w3, info, orgInfo) {
    user = u;
    web3 = w3;
    userInfo = info;
    originalUserInfo = orgInfo;
}

// concrete actions

export async function deposit(amountEth) {
    const val = web3.utils.toWei(amountEth);
    if (userInfo.bCdpInfo.hasCdp) {
        return ApiAction(B.depositETH(web3, userInfo.proxyInfo.userProxy, userInfo.bCdpInfo.cdp), user, web3, val);
    }
    else { // first deposit
        return ApiAction(B.firstDeposit(web3, user), user, web3, val);
    }
}

export async function withdraw(amountEth) {
    const val = web3.utils.toWei(amountEth);
    return ApiAction(B.withdrawETH(web3,userInfo.proxyInfo.userProxy, userInfo.bCdpInfo.cdp,val), user, web3, 0);
}

export async function borrow(amountDai) {
    const val = web3.utils.toWei(amountDai);
    return ApiAction(B.generateDai(web3,userInfo.proxyInfo.userProxy, userInfo.bCdpInfo.cdp,val), user, web3, 0);
}

export async function unlock() {
    return await ApiAction(B.unlockDai(web3,userInfo.proxyInfo.userProxy),  user, web3, 0);
}

export async function repay(amountDai) {
    const val = web3.utils.toWei(amountDai);
    return ApiAction(B.repayDai(web3,userInfo.proxyInfo.userProxy, userInfo.bCdpInfo.cdp,val), user, web3, 0);
}

export async function doApiAction(action, value, actionData) {
    let res;
    switch (action) {
        case 'unlock':
            res = await unlock();
            break;
        case 'deposit':
            res = await deposit(value);
            break;
        case 'withdraw':
            res = await withdraw(value);
            break;
        case 'borrow':
            res = await borrow(value);
            break;
        case 'repay':
            res = await repay(value);
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
