import { addresses as kovanAddresses } from "./compoundConfig/kovanAddress"
// TODO: fetch mainnet here
import { addresses as mainnetAddresses } from "./compoundConfig/kovanAddress"
import userStore from "../stores/user.store"
import { ApiAction } from "./ApiHelper";
import * as CI from "./compound.interface"
import ActionBox from "../components/compound-components/ActionBox";
import Web3 from "web3"
import compoundStore from "../stores/compound.store"

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

export default class CToken {
    constructor (address, data, info) {
        const addressToSymbol = userStore.networkType == 42 ? kovanAddressToSymbol : mainnetAddressToSymbol
        this.address = address
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
        this.borrowed = this.getBorrowed()
        this.borrowedUsd = this.getBorrowedInUsd()
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

    getUnderlyingBalance = (value = this.userData.ctokenBalance) => {
        return (new BN(value).mul(new BN(this.tokenInfo.ctokenExchangeRate))).div(_1e18)
    }

    getWalletBallance = () => {
        const {underlyingWalletBalance} = this.userData
        return toDecimalPointFormat(underlyingWalletBalance, this.tokenInfo.underlyingDecimals)

    }

    getUnderlyingBalanceInUsd = () => toUsd(this.underlyingBalance, this.tokenInfo.underlyingPrice)

    getBorrowed = () => {
        const {ctokenBorrowBalance} = this.userData
        const {underlyingDecimals} = this.tokenInfo
        return toDecimalPointFormat(new BN(ctokenBorrowBalance), underlyingDecimals)
    }

    getBorrowedInUsd = () => {
        const borrowed = new BN(toWei(this.borrowed))
        const borrowedInUsd = (borrowed.mul(new BN(this.tokenInfo.underlyingPrice))).div(_1e18)
        const borrowedInUsdStr = fromWei(borrowedInUsd.toString())
        return borrowedInUsdStr
    }

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
            const value = new BN(toWei(input))
            if(new BN(this.allowance).lt(value)){
                return [false, "Amount exceeds allowance, unlock the token to grant allowance"]
            }

            if (action == ActionEnum.deposit) {
                const {underlyingWalletBalance} = this.userData
                const balance = new BN(underlyingWalletBalance)
                if(value.gt(balance)){
                    return [false, "Amount exceeds wallet balance"]
                }
            }
            if (action == ActionEnum.withdraw) {
                const balance = new BN(toWei(this.underlyingBalanceStr))
                if(value.gt(balance)){
                    return [false, `Amount exceeds ${this.symbol} balance`]
                }
                if(compoundStore.totalBorrowedBalanceInUsd > 0){
                    // check that the new borrow limit would not become lower then the already borrowed amount
                    // reduce the collateral bellow the required
                    const inputBl = this.calcBorrowLimit(input)
                    const currentBl = new BN(toWei(compoundStore.borrowLimitInUsd))
                    const updatedBorrowLimit = currentBl.sub(new BN(toWei(inputBl)))
                    const currentBorrowed = new BN(toWei(compoundStore.totalBorrowedBalanceInUsd))
                    if(updatedBorrowLimit.lt(currentBorrowed)){
                        return [false, `Amount exceeds allowed withdrawal`]
                    }
                }
            }
            if (action == ActionEnum.borrow) {
                return [false, "not reday yet"]
            }
            if (action == ActionEnum.repay) {
                return [false, "not reday yet"]
            }
            // default 
            return [true, ""]

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

    calcBorrowLimit = (value) => {
        value = new BN(toWei(value))
        const cf = new BN(this.tokenInfo.collateralFactor)
        const price = new BN(this.tokenInfo.underlyingPrice)
        const usdVal = (value.mul(price)).div(_1e18)
        // const __debug = fromWei(usdVal.toString()) // used for debugging 1 eth should be equal to 1 eth in USD on compound
        const borrowLimit = (usdVal.mul(cf)).div(_1e18)
        const res = fromWei(borrowLimit.toString())
        return res 
    }

    calcValueInUsd = (value) => {
        value = new BN(toWei(value))
        const price = new BN(this.tokenInfo.underlyingPrice)
        const usdVal = (value.mul(price)).div(_1e18)
        const res = fromWei(usdVal.toString()) // 1 eth should be equal to 1 eth in USD on compound
        return res
    }
}