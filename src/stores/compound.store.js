/**
 * @format
 */
import { runInAction, makeAutoObservable, observable } from "mobx"
import userStore from "./user.store"
import {getCompUserInfo } from "../lib/compound.interface"
import CToken from "../lib/compound.util"
import Web3 from "web3"

const {BN, toWei, fromWei} = Web3.utils
const _1e18 = new BN(10).pow(new BN(18))

class CompoundStore {

    userInfo
    userInfoTimeouts = []
    userInfoUpdate = 0

    unDepositedList = []
    depositedList = []
    unBorrowedList = []
    borrowedList = []

    totalDespositedBalanceInUsd
    totalBorrowedBalanceInUsd
    borrowLimitInUsd
    coinMap = {} 

    constructor (){
        makeAutoObservable(this)
    }

    getUnDeposited = ({bUser, tokenInfo}) => Object.keys(bUser).filter(key => tokenInfo[key].listed && bUser[key].ctokenBalance === "0")
    getDeposited = ({bUser, tokenInfo}) => Object.keys(bUser).filter(key => tokenInfo[key].listed && bUser[key].ctokenBalance !== "0")
    getUnBorrowedList = ({bUser, tokenInfo}) => Object.keys(bUser).filter(key => tokenInfo[key].listed && bUser[key].ctokenBorrowBalance === "0")
    getborrowedList = ({bUser, tokenInfo}) => Object.keys(bUser).filter(key =>  tokenInfo[key].listed && bUser[key].ctokenBorrowBalance !== "0")

    getUserInfo = async () => {
        try {
            const { web3, networkType, user } = userStore
            let compUserInfo = await getCompUserInfo(web3, networkType, user)
            runInAction(()=> {
                this.userInfo = compUserInfo
                this.initCoins()
                this.calcDpositedBalance()
                this.calcBorrowedBalance()
                this.calcBorrowLimit()
                this.userInfoUpdate ++
                this.unDepositedList = this.getUnDeposited(compUserInfo)
                this.depositedList = this.getDeposited(compUserInfo)
                this.unBorrowedList = this.getUnBorrowedList(compUserInfo)
                this.borrowedList = this.getborrowedList(compUserInfo)
            })
        } catch (err) {
            console.log(err)
        }
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
        this.totalDespositedBalanceInUsd = fromWei(depositsInUsd)
    }

    calcBorrowedBalance = () => {
        
        let borrowedInUsd = new BN(0)
        Object.values(this.coinMap).forEach(coin => {
            borrowedInUsd = borrowedInUsd.add(new BN(toWei(coin.borrowedUsd).toString()))
        })
        this.totalBorrowedBalanceInUsd = fromWei(borrowedInUsd)
    }

    calcBorrowLimit = () => {
        // TODO: re visit this calculation 
        // we might need to multiply the CF with the original Asset depositied amount and not it's USD representation
        let borrowLimitInUsd = new BN(0)
        Object.values(this.coinMap).forEach(coin => {
            const deposit = new BN(toWei(coin.underlyingBalanceUsdStr).toString())
            const cf = new BN(coin.tokenInfo.collateralFactor)
            const coinBorrowLimit = (deposit.mul(cf)).div(_1e18)
            borrowLimitInUsd = borrowLimitInUsd.add(coinBorrowLimit)
        })
        this.borrowLimitInUsd = fromWei(borrowLimitInUsd)
    }
}

export default new CompoundStore()