export const numm = (v,decPoint = null, max = Infinity) => {const r = Math.min(max, decPoint !== null ? parseFloat(v).toFixed(decPoint) : parseFloat(v).toFixed(2)); return (isNaN(r))?0:r}
