import * as Api from "./ApiHelper";
import EventBus from "./EventBus";
import {ApiAction} from "./ApiHelper";
import {calcNewBorrowLimitAndLiquidationPrice} from "./ApiHelper";
import {verifyWithdrawInput} from "./ApiHelper";
import {verifyDepositInput} from "./ApiHelper";
import {verifyBorrowInput} from "./ApiHelper";
import {verifyRepayInput} from "./ApiHelper";

let userInfo = {};
let user = null;
let web3 = null;

function increaseABit(number) {
    return parseInt(1.2 * number);
}

// verification actions

export function getLiquidationPrice(valEth, valDai) {
    const currentEth = userInfo.bCdpInfo.ethDeposit*1, currentDai = userInfo.bCdpInfo.daiDebt*1;
    return calcNewBorrowLimitAndLiquidationPrice(userInfo, currentEth + valEth*1, currentDai + valDai, web3)
}

export function validateDeposit(val) { return verifyDepositInput(userInfo, val, web3) }
export function validateWithdraw(val) { return verifyWithdrawInput(userInfo, val, web3) }
export function validateBorrow(val) { return verifyBorrowInput(userInfo, val, web3) }
export function validateRepay(val) { return verifyRepayInput(userInfo, val, web3) }

// meta actions

export function setUserInfo(u, w3, info) {
    console.log(info);
    user = u;
    web3 = w3;
    userInfo = info;
}

// concrete actions

export async function deposit(amountEth) {
    const val = web3.utils.toWei(amountEth);
    if (userInfo.bCdpInfo.hasCdp) {
        return ApiAction(Api.depositETH(web3, userInfo.proxyInfo.userProxy, userInfo.bCdpInfo.cdp), user, web3, val);
    }
    else { // first deposit
        return ApiAction(Api.firstDeposit(web3, user), user, web3, val);
    }
}

export async function withdraw(amountEth) {
    const val = web3.utils.toWei(amountEth);
    return ApiAction(Api.withdrawETH(web3,userInfo.proxyInfo.userProxy, userInfo.bCdpInfo.cdp,val), user, web3, 0);
}

export async function borrow(amountDai) {
    const val = web3.utils.toWei(amountDai);
    return ApiAction(Api.generateDai(web3,userInfo.proxyInfo.userProxy, userInfo.bCdpInfo.cdp,val), user, web3, 0);
}

export async function unlock() {
    return await ApiAction(Api.unlockDai(web3,userInfo.proxyInfo.userProxy),  user, web3, 0);
}

export async function repay(amountDai) {
    const val = web3.utils.toWei(amountDai);
    return ApiAction(Api.repayDai(web3,userInfo.proxyInfo.userProxy, userInfo.bCdpInfo.cdp,val), user, web3, 0);
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
