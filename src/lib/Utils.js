import Web3 from "web3"
const {toBN, toWei, fromWei} = Web3.utils

/**
 * 
 * @param {*} v 
 * @param {*} decPoint 
 * @param {*} max 
 */
export const numm = (v,decPoint = 2, max = Infinity) => {const r = parseFloat(Math.min(max, v)).toFixed(decPoint); return (isNaN(r*1))?0:r}
 
/**
  * 
  * @param {*} number 
  * @param {*} decimalPoint 
  */
export const chop = (number, decimalPoint) => Math.floor(parseFloat(number) * Math.pow(10, decimalPoint)) / Math.pow(10, decimalPoint)


export const symbolToDisplayDecimalPointMap = {
    USD: 2,
    DAI: 2,
    ETH: 4,
    WBTC: 5,
}

export const maxAllowance = toBN("ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff", 16)
const reallyLargeAllowance = toBN("8888888888888888888888888888888888888888888888888888888888888888", 16)
export const hasAllowance = (allowance) => toBN(allowance).gt(reallyLargeAllowance)

export const isKovan = () => {
    try{
        return parseInt(window.ethereum.chainId) === parseInt("0x2A")
    } catch (err){
        return false
    }
}

export const toCommmSepratedString = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const percentage = (partialValue, totalValue) =>  (100 * partialValue) / totalValue;

export const stringToFixed = (string, numbersAfterTheDeciamlPoint) => {
    const decimalPointIndex = string.indexOf(".")
    if(decimalPointIndex === -1){
        return string
    }
    return string.slice(0, decimalPointIndex + numbersAfterTheDeciamlPoint)
}

const delay = (msec, value) => {
    return new Promise(done => window.setTimeout((() => done(value)), msec));
}

export const isFinished = (promise) => {
    return Promise.race([delay(0, false), promise.then(() => true, () => true)]);
}

export const toUiDecimalPointFormat = (bn, decimalPoint) => {
    const factor = toBN(10).pow(toBN(18 - decimalPoint))
    const x = toBN(bn).mul(factor)
    return fromWei(x) 
}

export const fromUiDeciamlPointFormat = (num, decimalPoint) => {
    const factor = toBN(10).pow(toBN(18 - decimalPoint))
    const x = toBN(toWei(num))
    return x.div(factor)
}
  
export const gasToEth = async (gas, web3) => {
    const gasPrice = await web3.eth.getGasPrice()
    const cost = toBN(gas).mul(toBN(gasPrice))
    const result = web3.utils.fromWei(cost.toString())
    return result
}