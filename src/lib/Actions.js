import * as Api from "./ApiHelper";

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


export async function deposit(amountEth, user, userProxy, cdp, web3) {
    const depositVal = web3.utils.toWei(amountEth);
    const txObject = await Api.depositETH(web3, userProxy ,cdp);
    const gasConsumption = increaseABit(await txObject.estimateGas({value:depositVal,from:user}));
    await txObject.send({gas:gasConsumption,value:depositVal,from:user});
    await mineBlock(web3)
}

export async function doApiAction(action) {

}
