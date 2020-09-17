import * as Api from "./ApiHelper";

let userInfo = {};
let user = null;
let web3 = null;

function increaseABit(number) {
    return parseInt(1.2 * number);
}

function getTestProvider (web3) {
    return new web3.providers.WebsocketProvider('ws://localhost:8545')
}

async function mineBlock (web3) {
    const providerSendAsync = Promise.promisify((getTestProvider(web3)).send).bind(getTestProvider(web3));
    await providerSendAsync({
        jsonrpc: '2.0',
        method: 'evm_mine',
        params: [],
        id: 1
    })
}

export function setUserInfo(u, w3, info) {
    console.log(u);
    user = u;
    web3 = w3;
    userInfo = info;
}

export async function deposit(amountEth, user) {
    const depositVal = web3.utils.toWei(amountEth);
    console.log(userInfo.proxyInfo.userProxy, userInfo);
    const txObject = await Api.depositETH(web3, userInfo.proxyInfo.userProxy, userInfo.bCdpInfo.cdp);
    const gasConsumption = increaseABit(await txObject.estimateGas({ value : depositVal, from : user }));
    await txObject.send({ gas:gasConsumption, value:depositVal, from:user });
    await mineBlock(web3)
}

export async function doApiAction(action, value) {
    switch (action) {
        case 'deposit':
            await deposit(value)
            break;
        case 'withdraw':

            break;

        case 'borrow':

            break;
        case 'repay':

            break;
    }
}
