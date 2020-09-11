export const numm = (v,decPoint = null) => decPoint !== null ? parseFloat(v).toFixed(decPoint) : parseFloat(v).toFixed(2)*1;
