import { addresses as kovanAddresses } from "./compoundConfig/kovanAddress"
import { addresses as mainnetAddresses } from "./compoundConfig/mainnetAddress"
import userStore from "../stores/user.store"
import { ApiAction } from "./ApiHelper";
import * as CI from "./compound.interface"
import ActionBox from "../components/compound-components/ActionBox";
import Web3 from "web3"
import compoundStore from "../stores/compound.store"

const {BN, toWei, fromWei} = Web3.utils
const _1E = (powerOf) =>  new BN(10).pow(new BN(powerOf))
const _1e18 = _1E(18)
export const maxAllowance = new  BN("ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff", 16)
const reallyLargeAllowance = new BN("8888888888888888888888888888888888888888888888888888888888888888", 16)

export const roundBigFloatAfterTheDeciaml = (bigFloat, roundBy) => {
    roundBy = new BN(roundBy)
    const num = new BN(toWei(bigFloat))

    return fromWei(num.divRound(roundBy).mul(roundBy).toString())
}

const kovanAddressToSymbol = {}
const mainnetAddressToSymbol = {}

const init = () => {
    Object.entries(kovanAddresses).forEach(([symbol, address]) => {
        kovanAddressToSymbol[address.toUpperCase()] = symbol
    });
    Object.entries(mainnetAddresses).forEach(([symbol, address]) => {
        mainnetAddressToSymbol[address.toUpperCase()] = symbol
    });
}

init()

export const wApiAction = async(...args) => {
    const promise = await ApiAction(...args)
    compoundStore.fetchAndUpdateUserInfo()
    return promise
}

export const ActionEnum = Object.freeze({"deposit": "deposit", "withdraw": "withdraw", "borrow": "borrow", "repay": "repay"})
export const CoinStatusEnum = Object.freeze({"deposited": "deposited", "borrowed": "borrowed", "unBorrowed": "unBorrowed", "unDeposited": "unDeposited"})

const toUiDecimalPointFormat = (bn, decimalPoint) => {
    const factor = new BN(10).pow(new BN(18 - decimalPoint))
    const x = new BN(bn).mul(factor)
    return fromWei(x) 
}

const fromUiDeciamlPointFormat = (num, decimalPoint) => {
    const factor = new BN(10).pow(new BN(18 - decimalPoint))
    const x = new BN(toWei(num))
    return x.div(factor)
}

const getUnderlying = (data, info) => {
    return (new BN(data.ctokenBalance).mul(new BN(info.ctokenExchangeRate))).div(_1e18)
}

export const displayNum = (numericalString, numbersAfterTheDeciamlPoint) => {
    if(numericalString.indexOf(".") > -1) {
        // number is float 
        return numericalString.slice(0, numericalString.indexOf(".") + 1 + numbersAfterTheDeciamlPoint)
    }
    // number is integer nothing to slice returning it as is
    return numericalString
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

    transactionInProgress

    constructor (address, data, info, importInfo) {
        
        this.address = address
        this.userData = data
        this.tokenInfo = info
        this.importInfo = importInfo
        let addressToSymbol
        if(!userStore || !userStore.loggedIn){
            // user has not loged in yet showing intial empty userInfo
            addressToSymbol = kovanAddressToSymbol
        } else {
            // user logged in
            addressToSymbol = userStore.networkType == 42 ? kovanAddressToSymbol : mainnetAddressToSymbol
        }
        this.symbol = (addressToSymbol[this.tokenInfo.ctoken.toUpperCase()] || "").replace("c", "")
        this.icon = this.getIcon()
        this.underlyingBalanceStr = this.getUnderlyingBalance()
        this.underlyingBalanceUsdStr = this.getUnderlyingBalanceInUsd()
        this.WalletBalanceStr = this.getWalletBallance()
        this.positiveApy = getApy(this.tokenInfo.supplyRate)
        this.negetiveApy = getApy(this.tokenInfo.borrowRate)
        this.allowance = this.userData.underlyingAllowance
        this.borrowed = this.getBorrowed()
        this.borrowedUsd = this.getBorrowedInUsd()
    }

    isCoinStatus = (statusToCheck) => {
        if(statusToCheck == CoinStatusEnum.deposited && this.underlyingBalanceUsdStr != "0" ){
            return true
        }
        if(statusToCheck == CoinStatusEnum.borrowed && this.borrowedUsd != "0"){
            return true
        }
        if(statusToCheck == CoinStatusEnum.unDeposited && this.underlyingBalanceUsdStr == "0" ){
            return true
        }
        if(statusToCheck == CoinStatusEnum.unBorrowed && this.borrowedUsd == "0"){
            return true
        }
        return false
    }

    displayNum = displayNum

    getIcon = () => {
        try{
            return require(`../assets/coin-icons/${this.symbol}.png`)
        } catch (err){
            return require(`../assets/coin-icons/COMP.png`) // defaults to COMP icon
        }
    }

    getUnderlyingBalance = (value = this.userData.ctokenBalance) => {
        const res = (new BN(value).mul(new BN(this.tokenInfo.ctokenExchangeRate))).div(_1e18)
        return toUiDecimalPointFormat(res, this.tokenInfo.underlyingDecimals)
    }

    getWalletBallance = () => {
        const {underlyingWalletBalance} = this.userData
        return toUiDecimalPointFormat(underlyingWalletBalance, this.tokenInfo.underlyingDecimals)
    }

    getUnderlyingBalanceInUsd = (value = this.underlyingBalanceStr) => {
        const underlyingBalance = fromUiDeciamlPointFormat(value, this.tokenInfo.underlyingDecimals)
        const underlyingBalanceUsd = (underlyingBalance.mul(new BN(this.tokenInfo.underlyingPrice))).div(_1e18) // underlyingPrice is taking the decimal point to account
        // return toUiDecimalPointFormat(underlyingBalanceUsd, this.tokenInfo.underlyingDecimals)
        return fromWei(underlyingBalanceUsd.toString()) // because underlyingPrice is taking the decimal
    }

    getBorrowed = () => {
        const {ctokenBorrowBalance} = this.userData
        const {underlyingDecimals} = this.tokenInfo
        return toUiDecimalPointFormat(new BN(ctokenBorrowBalance), underlyingDecimals)
    }

    getBorrowedInUsd = () => {
        const borrowed = fromUiDeciamlPointFormat(this.borrowed, this.tokenInfo.underlyingDecimals)
        const borrowedInUsd = (borrowed.mul(new BN(this.tokenInfo.underlyingPrice))).div(_1e18)
        const borrowedInUsdStr = fromWei(borrowedInUsd.toString())
        return borrowedInUsdStr
    }

    isUnlocked = () => {
        return new BN(this.allowance).gt(reallyLargeAllowance)
    }

    unlock = async () => {
        const {web3, user, networkType} = userStore
        const txPromise = CI.grantAllowance(web3, networkType, this.address, this.tokenInfo.underlying)
        return await wApiAction(txPromise, user, web3)
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

            if(action == ActionEnum.deposit) return this.validateDeposit(input)
            if(action == ActionEnum.withdraw) return this.validateWithdraw(input)
            if(action == ActionEnum.borrow) return this.validateBorrow(input)
            if(action == ActionEnum.repay) return this.validateRepay(input)

        }catch (err){ 
            console.error(err)
            return [false, "input is not valid"]
        }
    }

    validateDeposit = (input) => {

        const value = fromUiDeciamlPointFormat(input, this.tokenInfo.underlyingDecimals)
        const {underlyingWalletBalance} = this.userData
        const balance = new BN(underlyingWalletBalance)
        
        if(value.gt(balance)){
            return [false, "Amount exceeds wallet balance"]
        }

        if(new BN(this.allowance).lt(value)){
            return [false, "Amount exceeds allowance, unlock the token to grant allowance"]
        }

        // default 
        return [true, ""]
    }

    validateWithdraw = (input) => {
        // if(this.symbol == "USDC") debugger

        const value = fromUiDeciamlPointFormat(input, this.tokenInfo.underlyingDecimals)
        const {underlyingWalletBalance} = this.userData
        const balance = new BN(underlyingWalletBalance)

        // validate the new borrow limit is not lower than the amount already borrowed
        const deposited = fromUiDeciamlPointFormat(this.underlyingBalanceStr, this.tokenInfo.underlyingDecimals)
        if(value.gt(deposited)){
            return [false, `Amount exceeds deposited ${this.symbol} balance`]
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

        // default 
        return [true, ""]
    }

    validateBorrow = (input) => {

        const value = fromUiDeciamlPointFormat(input, this.tokenInfo.underlyingDecimals)
        const currentBorrowed = new BN(toWei(compoundStore.totalBorrowedBalanceInUsd))
        const currentBorrowLimit = new BN(toWei(compoundStore.borrowLimitInUsd))
        const allowedToBorrow = currentBorrowLimit.sub(currentBorrowed)
        const inputInUsd = this.calcValueInUsd(input)
        const inputGreaterThanReaminingBorrowLimit = new BN(toWei(inputInUsd)).gt(allowedToBorrow)
        if(inputGreaterThanReaminingBorrowLimit){
            return [false, "Amount exceeds allowed borrowed"]
        }

        // default 
        return [true, ""]
    }

    validateRepay = (input) => {

        const value = fromUiDeciamlPointFormat(input, this.tokenInfo.underlyingDecimals)
        const {underlyingWalletBalance} = this.userData
        const balance = new BN(underlyingWalletBalance)

        if(value.gt(balance)){
            return [false, "Amount exceeds wallet balance"]
        }

        if(value.gt(balance)){
            return [false, "Amount exceeds wallet balance"]
        }
        // validate repay amount not greater than borrowd
        const {ctokenBorrowBalance} = this.userData
        const tokenBorrowed = new BN(toWei(this.borrowed))
        if(value.gt(tokenBorrowed)){
            return [false, "Amount exceeds borrowed amount"]
        }

        if(new BN(this.allowance).lt(value)){
            return [false, "Amount exceeds allowance, unlock the token to grant allowance"]
        }

        // default 
        return [true, ""]
    }

    deposit = async (amount, onHash) => {
        const {web3, networkType, user} = userStore
        const depositAmount = fromUiDeciamlPointFormat(amount, this.tokenInfo.underlyingDecimals)
        let ethToSendWithTransaction
        let txPromise
        if(this.symbol === "ETH"){
            txPromise = CI.depositEth(web3, networkType, this.address)
            ethToSendWithTransaction = depositAmount
        }else {
            txPromise = CI.depositToken(web3, networkType, this.address, depositAmount)
            ethToSendWithTransaction = 0
        }
        return await wApiAction(txPromise, user, web3, ethToSendWithTransaction, onHash)
    }

    withdraw = async (amount, onHash) => {
        const {web3, networkType, user} = userStore
        const withdrawAmount = fromUiDeciamlPointFormat(amount, this.tokenInfo.underlyingDecimals)
        let ethToSendWithTransaction = 0
        let txPromise
        if(this.symbol === "ETH") {
            txPromise = CI.withdrawEth(web3, networkType, withdrawAmount, this.address)
        } else {
            txPromise = CI.withdraw(web3, networkType, withdrawAmount, this.address)
        }
        return await wApiAction(txPromise, user, web3, ethToSendWithTransaction, onHash)
    }

    borrow = async (amount, onHash) => {
        const {web3, networkType, user} = userStore
        const borrowAmount = fromUiDeciamlPointFormat(amount, this.tokenInfo.underlyingDecimals)
        let ethToSendWithTransaction = 0
        let txPromise
        if(this.symbol === "ETH") {
            txPromise = CI.borrowEth(web3, networkType, borrowAmount, this.address)
        } else {
            txPromise = CI.borrowToken(web3, networkType, borrowAmount, this.address)
        }
        return await wApiAction(txPromise, user, web3, ethToSendWithTransaction, onHash)
    }

    repay = async (amount, onHash) => {
        const {web3, networkType, user} = userStore
        const reapyAmount = fromUiDeciamlPointFormat(amount, this.tokenInfo.underlyingDecimals)
        let ethToSendWithTransaction
        let txPromise
        if(this.symbol === "ETH"){
            txPromise = CI.repayEth(web3, networkType, this.address)
            ethToSendWithTransaction = reapyAmount
        }else {
            txPromise = CI.repayToken(web3, networkType, reapyAmount, this.address)
            ethToSendWithTransaction = 0
        }
        return await wApiAction(txPromise, user, web3, ethToSendWithTransaction, onHash)
    }

    calcBorrowLimit = (value) => {
        if(!value){
            return "0"
        }
        value = fromUiDeciamlPointFormat(value, this.tokenInfo.underlyingDecimals)
        const cf = new BN(this.tokenInfo.collateralFactor)
        const price = new BN(this.tokenInfo.underlyingPrice)
        const usdVal = (value.mul(price)).div(_1e18)
        // const __debug = fromWei(usdVal.toString()) // used for debugging 1 eth should be equal to 1 eth in USD on compound
        const borrowLimit = (usdVal.mul(cf)).div(_1e18)
        const res = fromWei(borrowLimit.toString())
        return res 
    }

    calcValueInUsd = (value) => {
        value = fromUiDeciamlPointFormat(value, this.tokenInfo.underlyingDecimals)
        const price = new BN(this.tokenInfo.underlyingPrice)
        const usdVal = (value.mul(price)).div(_1e18)
        const res = fromWei(usdVal.toString()) // 1 eth should be equal to 1 eth in USD on compound
        return res
    }

    canRepayAll = () => {
        if(this.borrowed <= this.WalletBalanceStr){
            return true
        }else {
            return false
        }
    }

    grantImportAllowance = async (onHash) => {
        const {avatar} = this.importInfo
        const {web3, user, networkType} = userStore
        const txPromise = CI.grantAllowance(web3, networkType, avatar, this.tokenInfo.ctoken, this.userData.ctokenBalance)
        return await wApiAction(txPromise, user, web3, 0, onHash)
    }

    hasMigrationAllowance = () => {
        return new BN(this.importInfo.ctokenAllowance).gte(new BN(this.userData.ctokenBalance))
    }
}