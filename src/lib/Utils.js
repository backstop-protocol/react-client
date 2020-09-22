export const numm = (v,decPoint = null, max = Infinity) => Math.min(max, decPoint !== null ? parseFloat(v).toFixed(decPoint) : parseFloat(v).toFixed(2)*1);
