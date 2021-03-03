export const numm = (v,decPoint = null, max = Infinity) => {const r = parseFloat(Math.min(max, v)).toFixed(decPoint?decPoint:2); return (isNaN(r*1))?0:r}

export const isKovan = () => {
    try{
        return parseInt(window.ethereum.chainId) === parseInt("0x2A")
    } catch (err){
        return false
    }
}
