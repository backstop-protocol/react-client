export const numm = (v,decPoint = null, max = Infinity) => {const r = parseFloat(Math.min(max, v)).toFixed(decPoint?decPoint:2); return (isNaN(r*1))?0:r}

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
  