import * as Api from "./ApiHelper";
import EventBus from "./EventBus";
import {ApiAction} from "./ApiHelper";

let userInfo = {};
let user = null;
let web3 = null;

function increaseABit(number) {
    return parseInt(1.2 * number);
}


export function setUserInfo(u, w3, info) {
    console.log(info);
    user = u;
    web3 = w3;
    userInfo = info;
}

export async function deposit(amountEth) {
    const val = web3.utils.toWei(amountEth);
    return ApiAction(Api.depositETH(web3, userInfo.proxyInfo.userProxy, userInfo.bCdpInfo.cdp), user, web3, val);
}

export async function withdraw(amountEth) {
    const val = web3.utils.toWei(amountEth);
    return ApiAction(Api.withdrawETH(web3,userInfo.proxyInfo.userProxy, userInfo.bCdpInfo.cdp,val), user, web3, 0);
}

export async function borrow(amountDai) {
    const val = web3.utils.toWei(amountDai);
    return ApiAction(Api.generateDai(web3,userInfo.proxyInfo.userProxy, userInfo.bCdpInfo.cdp,val), user, web3, 0);
}

export async function repay(amountDai) {
    const val = web3.utils.toWei(amountDai);
    await ApiAction(Api.unlockDai(web3,userInfo.proxyInfo.userProxy),  user, web3, 0);
    return ApiAction(Api.repayDai(web3,userInfo.proxyInfo.userProxy, userInfo.bCdpInfo.cdp,val), user, web3, 0);
}

export async function doApiAction(action, value) {
    let res;
    switch (action) {
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
            EventBus.$emit('action-completed', res);
        }
        else {
            EventBus.$emit('action-failed', res);
        }
    }
}
