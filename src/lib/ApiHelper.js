const B = require('./bInterface.js');

const humanizeExcludeFields = [
    'userProxy','daiAllowance'
];

export const Humanize = function(result, web3) {
    let onlyNum = true, hasNum = false;
    for (let k in result) {
        if (isNaN(k*1)) { onlyNum = false; }
        else hasNum = true;
    }
    if (!onlyNum && hasNum) {
        const res = {};
        for (let k in result) {
            if (isNaN(k*1)) {
                if (result[k] instanceof Array) {
                    res[k] = Humanize(result[k], web3);
                }
                else {
                    if (typeof result[k] === "string" && !isNaN(result[k]*1) && humanizeExcludeFields.indexOf(k) === -1) {
                        res[k] = (result[k].length > 16) ? web3.utils.fromWei(result[k])*1 : result[k]*1;
                    }
                    else {
                        res[k] = result[k];
                    }
                }
            }
        }
        result = res;
    }

    return result;
};

export function repayUnlocked(web3, userInfo) {
    return (web3.utils.toBN(userInfo.userWalletInfo.daiAllowance).toString(16) === "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
}

function increaseABit(number) {
    return parseInt(1.2 * number);
}

export const ApiAction = async function(action, user, web3, gasValue = 0, hashCb = null) {
    return new Promise(async (res, rej) => {

        try {
            const txObject = await action;
            const gasEstimate = await txObject.estimateGas({ value : gasValue, from : user });
            console.log("345345", gasEstimate)
            const gasConsumption = increaseABit(gasEstimate);
            const transaction = txObject.send({ gas:gasConsumption, value: gasValue, from:user })
                .once('transactionHash', (hash) => { if (hashCb) hashCb(hash)})
                .on('error', (error) => { console.log("hmmm?", error); rej(error)} )
                .then((receipt) => {
                    res(receipt);
                })
                .catch((error) => {
                    console.log("oh nooo")
                    rej(error);
                })

        }
        catch (error) {
            rej(error);
        }
    })
};
