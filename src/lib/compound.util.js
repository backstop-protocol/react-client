import { addresses as kovanAddresses } from "./compoundConfig/kovanAddress"
// TODO: fetch mainnet here
import { addresses as mainnetAddresses } from "./compoundConfig/kovanAddress"
import compoundStore from "../stores/compound.store"
import userStore from "../stores/user.store"
import Web3 from "web3"
import { ApiAction } from "./ApiHelper";
import * as CI from "./compound.interface"
import ActionBox from "../components/compound-components/ActionBox";

const {BN, toWei, fromWei} = Web3.utils
const _1e18 = new BN(10).pow(new BN(18))
export const maxAllowance = new BN("ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff", 16)

const kovanAddressToSymbol = {}
const mainnetAddressToSymbol = {}

const init = () => {
    Object.entries(kovanAddresses).forEach(([symbol, address]) => {
        kovanAddressToSymbol[address] = symbol
    });
    Object.entries(mainnetAddresses).forEach(([symbol, address]) => {
        mainnetAddressToSymbol[address] = symbol
    });
}

init()

export const ActionEnum = Object.freeze({"deposit": "deposit", "withdraw": "withdraw", "borrow": "borrow", "repay": "repay"})

const toDecimalPointFormat = (bn, decimalPoint) => {
    const factor = new BN(10).pow(new BN(18 - decimalPoint))
    const x = new BN(bn).mul(factor)
    return fromWei(x) 
}

const getUnderlying = (data, info) => {
    return (new BN(data.ctokenBalance).mul(new BN(info.ctokenExchangeRate))).div(_1e18)
}

const toUsd = (underlyingBalance, underlyingPrice) => {
    const res = (new BN(underlyingBalance).mul(new BN(underlyingPrice))).div(_1e18)
    return res.toString()
}

export const displayNum = (numericalString, numbersAfterTheDeciamlPoint) => {
    return numericalString.slice(0, numericalString.indexOf(".") + 1 + numbersAfterTheDeciamlPoint)
}

const getApy = (rate) => {
    // Calculating the APY Using Rate Per Block
    // https://compound.finance/docs#protocol-math
    const blockIntrest = parseFloat(fromWei(rate))
    const blocksPerDay = 4 * 60 * 24 // based on 4 blocks occurring every minute
    const daysPerYear = 365

    const APY = ((((blockIntrest * blocksPerDay + 1) ** daysPerYear - 1))) * 100
    return APY.toString()
}

export const validateDpositeInput = (coin, input) => {

}

export const validateWithdrawInput = (coin, input) => {

}

export const validateBorrowInput = (coin, input) => {

}

export const validateRepayInput = (coin, input) => {

}

export default class CToken {
    constructor (address) {
        const addressToSymbol = userStore.networkType == 42 ? kovanAddressToSymbol : mainnetAddressToSymbol
        this.address = address
        const [data, info] = compoundStore.getBuserTokenData(address)
        this.userData = data
        this.tokenInfo = info
        this.symbol = (addressToSymbol[address] || "").replace("c", "")
        this.icon = this.getIcon()
        this.underlyingBalance = this.getUnderlyingBalance()
        this.underlyingBalanceStr = toDecimalPointFormat(this.underlyingBalance, this.tokenInfo.underlyingDecimals)
        this.underlyingBalanceUsd = this.getUnderlyingBalanceInUsd()
        this.underlyingBalanceUsdStr = toDecimalPointFormat(this.underlyingBalanceUsd, this.tokenInfo.underlyingDecimals)
        this.WalletBalanceStr = this.getWalletBallance()
        this.positiveApy = getApy(this.tokenInfo.supplyRate)
        this.negetiveApy = getApy(this.tokenInfo.borrowRate)
        this.allowance = this.userData.underlyingAllowance
        
    }

    displayNum = (numericalString, numbersAfterTheDeciamlPoint) => {
        return numericalString.slice(0, numericalString.indexOf(".") + 1 + numbersAfterTheDeciamlPoint)
    }

    getIcon = () => {
        try{
            return require(`../assets/coin-icons/${this.symbol}.png`)
        } catch (err){
            return require(`../assets/coin-icons/COMP.png`) // defaults to COMP icon
        }
    }

    getUnderlyingBalance = () => {
        return (new BN(this.userData.ctokenBalance).mul(new BN(this.tokenInfo.ctokenExchangeRate))).div(_1e18)
    }

    getWalletBallance = () => {
        const {underlyingWalletBalance} = this.userData
        return toDecimalPointFormat(underlyingWalletBalance, this.tokenInfo.underlyingDecimals)

    }

    getUnderlyingBalanceInUsd = () => toUsd(this.underlyingBalance, this.tokenInfo.underlyingPrice)

    isUnlocked = () => {
        return new BN(this.allowance).eq(maxAllowance)
    }

    unlock = async () => {
        const {web3, user, networkType} = userStore
        const txPromise = CI.grantAllowance(web3, networkType, this.address, this.tokenInfo.underlying)
        return await ApiAction(txPromise, user, web3)

    }

    validateInput = (input, action) => {
        try{
            if (input === null || input === undefined || input === ""){
                return [false, ""]
            }
            if(isNaN(input)){
                return [false, `only numbers are valid`]
            }
            if (input <= 0){
                return [false, `the ${action} amount must be positive`]
            }
            if (action == ActionEnum.deposit) {
                // todo: validate
                const {underlyingWalletBalance} = this.userData
                const balance = new BN(underlyingWalletBalance)
                const value = new BN(toWei(input).toString())
                if(value.gt(balance)){
                    return [false, "Amount exceeds wallet balance"]
                }
                if(new BN(this.allowance).lt(value)){
                    return [false, "Amount exceeds allowance, unlock the token to grant allowance"]
                }

                return [true, ""]
            }
            if (action == ActionEnum.witdraw) {
                return [false, "not reay yet"]
            }
            if (action == ActionEnum.borrow) {
                return [false, "not reay yet"]
            }
            if (action == ActionEnum.repay) {
                return [false, "not reay yet"]
            }

        }catch (err){
            console.error(err)
        }

    }

    deposit = async (amount, onHash) => {
        const {web3, networkType, user} = userStore
        const depositAmount = toWei(amount)
        let ethToSendWithTransaction
        let txPromise
        if(this.symbol == "ETH"){
            txPromise = CI.depositEth(web3, networkType)
            ethToSendWithTransaction = depositAmount
        }else {
            txPromise = CI.depositToken(web3, networkType, this.address, depositAmount)
            ethToSendWithTransaction = 0
        }
        return await ApiAction(txPromise, user, web3, ethToSendWithTransaction, onHash)
    }

    witdraw = async (amount, onHash) => {
        const {web3, networkType, user} = userStore
        const withdrawAmount = toWei(amount)
        let ethToSendWithTransaction = 0
        let txPromise
        if(this.symbol = "ETH") {
            txPromise = CI.withdrawEth(web3, networkType, withdrawAmount)
        } else {
            txPromise = CI.withdraw(web3, networkType, withdrawAmount, this.address)
        }
        return await ApiAction(txPromise, user, web3, ethToSendWithTransaction, onHash)
    }

    borrow = async (amount, onHash) => {
        throw new Error("not ready yet")
    }

    repay = async (amount, onHash) => {
        throw new Error("not ready yet")
    }
}