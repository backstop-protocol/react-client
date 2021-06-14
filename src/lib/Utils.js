import Web3 from "web3"
const {toBN, toWei, fromWei} = Web3.utils

export const numm = (v,decPoint = null, max = Infinity) => {const r = parseFloat(Math.min(max, v)).toFixed(decPoint?decPoint:2); return (isNaN(r*1))?0:r}

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
  