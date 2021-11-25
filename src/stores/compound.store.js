/**
 * @format
 */
import { runInAction, makeAutoObservable, observable } from "mobx"
import userStore from "./user.store"
import {getCompUserInfo, claimComp, claimCompEfficiently, getBalanceOfcomp, getCompByBtokens} from "../lib/compound.interface"
import CToken, { CoinStatusEnum } from "../lib/compound.util"
import {initialState} from "../lib/compoundConfig/initialState"
import {wApiAction} from "../lib/compound.util"
import {ApiAction} from "../lib/ApiHelper";
import Web3 from "web3"
import compoundMigrationStore from "./compoundMigration.store"
import {isFinished} from "../lib/Utils"
import {percentage} from "../lib/Utils"

const {BN, toWei, fromWei, toBN} = Web3.utils
const _1e18 = new BN(10).pow(new BN(18))

class CompoundStore {

    userInfo
    userInfoTimeouts = []
    userInfoUpdate = 0

    coinList = []
    showBorrowReapyBox = false
    showDepositWithdrawBox = false
    compBalance = "0"
    efficentClaimCompBalance = "0"
    compClaimGasEstimate = "0"
    efficientCompClaimGasEstimate = "0"
    userScore = "0"
    totalScore = "0"
    originalUserScore = "0"
    originaltotalScore = "0"

    totalDespositedBalanceInUsd = "0"
    totalBorrowedBalanceInUsd = "0"
    borrowLimitInUsd = "0"
    coinMap = {}
    coinsInTx = {}
    firstUserInfoFetch = false
    userScoreInterval
    userInfoPromise

    constructor (){
        makeAutoObservable(this)
        this.processUserInfo(initialState)
    }

    toggleInTx = (address, inTx) => {
        if(inTx){
            this.coinsInTx[address] = inTx
        }else{
            delete this.coinsInTx[address]
        }
        this.showHideEmptyBalanceBoxs()    
    }

    
    handleFirstFatch = ()=> {
        if(!this.firstUserInfoFetch){
            this.firstUserInfoFetch = true;
        }
    }

    // thin promise managmanet wrapper to the original getUserInfo
    getUserInfo = async () => {
        const promiseFinshed = this.userInfoPromise ? await isFinished(this.userInfoPromise) : true
        if(promiseFinshed){
            //create a new userInfo promise
            this.userInfoPromise = this._getUserInfo()
        }
        return this.userInfoPromise
    }

    _getUserInfo = async () => {
        try {
            const { web3, networkType, user, loggedIn } = userStore
            if(!loggedIn) return
            let compUserInfo = await getCompUserInfo(web3, networkType, user)
            this.processUserInfo(compUserInfo)
            compoundMigrationStore.getSupplyAndBorrow()
            this.handleFirstFatch()
            this.userInfoUpdateSideAffects()
            userStore.removeConnectionWarning()
        } catch (err) {
            console.log(err)
            userStore.connectionWarning()
        }
    }

    supportedCoins = (address) => this.coinMap[address].tokenInfo.btoken !== "0x0000000000000000000000000000000000000000"
    supportedBtokens = x => x !== "0x0000000000000000000000000000000000000000"

    processUserInfo = (userInfo) => {
        runInAction(()=> {
            this.userInfo = userInfo
            this.bTokens = Object.values(this.userInfo.tokenInfo).map(({btoken}) => btoken).filter(this.supportedBtokens)
            this.initCoins()
            this.calcCompBlance()
            this.calcUserScore()
            this.calcDpositedBalance()
            this.calcBorrowedBalance()
            this.calcBorrowLimit()
            this.coinList = Object.keys(this.userInfo.bUser).filter(this.supportedCoins)
            this.showHideEmptyBalanceBoxs()
            this.userInfoUpdate ++
        })
    }

    userInfoUpdateSideAffects = () => {
    }

    calcCompBlance = async () => {
        const {web3, networkType, loggedIn} = userStore || {}
        if(!loggedIn){
            return
        }
        const obj = this.userInfo.compTokenInfo || {} 
        const val = obj[Object.keys(obj)[0]] || {}
        const [{avatar}] = Object.values(this.userInfo.importInfo)
        runInAction(()=> {        
            this.compBalance = fromWei(val.compBalance || "0")
        })
        this.calcClaimCompGasEstimation()
    }

    calcClaimCompGasEstimation = async () => {
        try{
            const {web3, networkType, user} = userStore
            const compByBtokens = await getCompByBtokens(web3, networkType, user, this.bTokens)
            const totalComp = toWei(this.compBalance)
            this.bTokensForEfficientCompClaim = []
            let efficentClaimCompBalance = "0"
            compByBtokens.forEach((compAmount, index)=> {
                if(compAmount == 0){
                    return
                }
                const percentOfTotalComp = percentage(compAmount, totalComp)
                if(percentOfTotalComp < 10){
                    return
                }
                this.bTokensForEfficientCompClaim.push(this.bTokens[index])
                efficentClaimCompBalance = toBN(efficentClaimCompBalance).add(toBN(compAmount)).toString()
            })
            runInAction(()=> {
                this.efficentClaimCompBalance = fromWei(efficentClaimCompBalance)
            })
            const [claimGas, fullClaimGas] = await Promise.all([
              this.claimCompEfficiently(null, true),
              this.claimComp(null, true)
            ])

            runInAction(()=> {
                this.efficientCompClaimGasEstimate = claimGas.toString()
                this.compClaimGasEstimate = fullClaimGas.toString()
            })
        }catch(err){
            console.error(err)
        }
    }

    calcUserScore = () => {
        
        const seconds = 3
        const obj = this.userInfo.scoreInfo
        if(!obj) return 
        const val = obj[Object.keys(obj)[0]] || {}
        // 480000 * 100 * 5944368153772800000000000000000 / 1e18
        const factor = new BN("480000").mul(new BN("100")).mul(new BN("5944368153772800000000000000000")).div(new BN(toWei("1")))
        this.userScore = this.userScore == "0" ? fromWei(new BN(val.userScore).div(factor)) : this.userScore
        this.totalScore = (parseFloat(fromWei(new BN(val.totalScore).div(factor))) + 0.005).toFixed(2) // round up
        const progress = parseFloat(fromWei(new BN(val.userScoreProgressPerSec).div(factor)))
        this.originalUserScore = fromWei(val.userScore)
        this.originaltotalScore = fromWei(val.totalScore)
        if(this.userScoreInterval){
            clearInterval(this.userScoreInterval)
        }
        this.userScoreInterval = setInterval(()=> {
            runInAction(()=> {
                this.userScore = parseFloat(this.userScore) + (progress * seconds)
            })
        }, seconds * 1000)
    }

    showHideEmptyBalanceBoxs = () =>{
        let noCoinDeposited = true
        let noCoinBorrowed = true
        const coins = Object.values(Object.assign({}, this.coinMap, this.coinsInTx)).forEach(coin => {
            if(coin.isCoinStatus(CoinStatusEnum.deposited)){
                noCoinDeposited = false
            }
            if(coin.isCoinStatus(CoinStatusEnum.borrowed)){
                noCoinBorrowed = false
            }
        })
        this.showBorrowReapyBox = noCoinBorrowed
        this.showDepositWithdrawBox = noCoinDeposited
    }

    getBuserTokenData = (address) => {
        if(!this.userInfo){
            return
        }
        return [this.userInfo.bUser[address], this.userInfo.tokenInfo[address]]
    }

    /**
     * permits only four timeouts
     */
    fetchAndUpdateUserInfo = async () => { 
        await this.getUserInfo()
        const timeouts = [1500, 5000, 19000, 30000]
        this.userInfoTimeouts.forEach(clearTimeout) // clearing all timeouts
        this.userInfoTimeouts = timeouts.map(timeout => setTimeout(this.getUserInfo, timeout)) // setting 4 new one
    }

    initCoins = () => {
        Object.keys(this.userInfo.bUser).forEach(address=> {
            const [data, info] = this.getBuserTokenData(address)
            this.coinMap[address] = new CToken(address, data, info)
        })
    }

    calcDpositedBalance = () => {
        let depositsInUsd = new BN(0)
        Object.values(this.coinMap).forEach(coin => {
            depositsInUsd = depositsInUsd.add(new BN(toWei(coin.underlyingBalanceUsdStr).toString()))
        })
        runInAction(()=> {
            this.totalDespositedBalanceInUsd = fromWei(depositsInUsd)     
        })
    }

    calcBorrowedBalance = () => {

        let borrowedInUsd = new BN(0)
        Object.values(this.coinMap).forEach(coin => {
            borrowedInUsd = borrowedInUsd.add(new BN(toWei(coin.borrowedUsd).toString()))
        })
        runInAction(()=>{
            this.totalBorrowedBalanceInUsd = fromWei(borrowedInUsd)
        })
    }

    calcBorrowLimit = () => {
        let borrowLimitInUsd = new BN(0)
        Object.values(this.coinMap).forEach(coin => {
            const deposit = new BN(toWei(coin.underlyingBalanceUsdStr).toString())
            const cf = new BN(coin.tokenInfo.collateralFactor)
            const coinBorrowLimit = (deposit.mul(cf)).div(_1e18)
            borrowLimitInUsd = borrowLimitInUsd.add(coinBorrowLimit)
        })
        this.borrowLimitInUsd = fromWei(borrowLimitInUsd)
    }

    claimComp = async (onHash, onlyGasEstimate) => {
        const {web3, networkType, user} = userStore
        const txPromise = claimComp(web3, networkType, user)
        if(onlyGasEstimate){
            return ApiAction(txPromise, user, web3, 0, onHash, onlyGasEstimate)
        }else{
            return wApiAction(txPromise, user, web3, 0, onHash, onlyGasEstimate)
        }
    }

    claimCompEfficiently = async (onHash, onlyGasEstimate) => {
        const {web3, networkType, user} = userStore
        const txPromise = claimCompEfficiently(web3, networkType, user, this.bTokensForEfficientCompClaim)
        if(onlyGasEstimate){
            return ApiAction(txPromise, user, web3, 0, onHash, onlyGasEstimate)
        }else{
            return wApiAction(txPromise, user, web3, 0, onHash, onlyGasEstimate)
        }    
    }
}
const xxx = "xxx"
export default xxx
