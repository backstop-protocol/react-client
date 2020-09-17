import * as Api from "./ApiHelper";
import EventBus from "./EventBus";

let userInfo = {};
let user = null;
let web3 = null;

const Promisify = (fn) => {
    return (...args) => {
        return new Promise((resolve, reject) => {
            function customCallback(err, ...results) {
                if (err) {
                    return reject(err)
                }
                return resolve(results.length === 1 ? results[0] : results)
            }
            args.push(customCallback)
            fn.call(this, ...args)
        })
    }
}

function increaseABit(number) {
    return parseInt(1.2 * number);
}

function getTestProvider (web3) {
    return new web3.providers.WebsocketProvider('ws://localhost:8545')
}

async function mineBlock (web3) {
    const providerSendAsync = Promisify((getTestProvider(web3)).send).bind(getTestProvider(web3));
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

export async function deposit(amountEth) {
    const depositVal = web3.utils.toWei(amountEth);
    const txObject = await Api.depositETH(web3, userInfo.proxyInfo.userProxy, userInfo.bCdpInfo.cdp);
    const gasConsumption = increaseABit(await txObject.estimateGas({ value : depositVal, from : user }));
    try {
        return await txObject.send({ gas:gasConsumption, value:depositVal, from:user });
    }
    catch (error) {
        return { error }
    }
}

export async function doApiAction(action, value) {
    let res;
    switch (action) {
        case 'deposit':
            res = await deposit(value);
            break;
        case 'withdraw':

            break;

        case 'borrow':

            break;
        case 'repay':

            break;
    }

    if (res) {
        if (res.status) {
            EventBus.$emit('action-completed', res);
        }
    }
}
