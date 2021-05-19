const B = require('./bInterface.js');


const humanizeMustFields = [
    "ethDeposit", "daiDebt", "maxDaiDebt", "minEthDeposit","userRating","userRatingProgressPerSec","totalRating","totalRatingProgressPerSec","jarBalance",
    "ethBalance", "daiBalance"
]

const humanizeExcludeFields = [
    'userProxy', 'daiAllowance'
];

export const Humanize = function (result, web3) {
    let onlyNum = true, hasNum = false;
    for (let k in result) {
        if (isNaN(k * 1)) { onlyNum = false; }
        else hasNum = true;
    }
    if (!onlyNum && hasNum) {
        const res = {};
        for (let k in result) {
            if (isNaN(k * 1)) {
                if (result[k] instanceof Array) {
                    res[k] = Humanize(result[k], web3);
                }
                else {
                    if (typeof result[k] === "string" && !isNaN(result[k] * 1) && humanizeExcludeFields.indexOf(k) === -1) {
                        res[k] = (result[k].length > 16 || humanizeMustFields.includes(k)) ? web3.utils.fromWei(result[k]) * 1 : result[k] * 1;
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

function validateTx(tx) {
    tx.arguments.forEach(arg => {
        debugger
        if(!arg || arg === "0x0000000000000000000000000000000000000000"){
            const msg = "one of the TX arguments is falsy or invalid and might send ETH to an invalid account"
            console.error(msg)
            throw new Error(msg)
        }
    })
}

export const ApiAction = async function (action, user, web3, value = 0, hashCb = null) {
    return new Promise(async (res, rej) => {
        try {
            validateTx(action)
            const txObject = await action;
            const gasEstimate = await txObject.estimateGas({ value: value, from: user });
            const gasConsumption = increaseABit(gasEstimate);
            const transaction = txObject.send({ gas: gasConsumption, value: value, from: user })
                .once('transactionHash', (hash) => { if (hashCb) hashCb(hash) })
                .on('error', (error) => { console.log("hmmm?", error); rej(error) })
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
