/**
 * @format
 */
import { makeAutoObservable, runInAction, computed } from "mobx"
import {getPools} from "../lib/hundred/config"
import * as Interface from "../lib/hundred/interface"
import userStore from "./user.store"
import { ApiAction } from "../lib/ApiHelper"
import Web3 from "web3"
const {toBN} = Web3.utils

const reallyLargeAllowance = toBN("8888888888888888888888888888888888888888888888888888888888888888", 16)
const wait = (seconds) => new Promise(resolve => setTimeout(resolve, seconds * 1000))

class PoolStore {
  totalEth = "0"
  totalToken = "0"
  tvl = "0"
  amount = "0"
  apy = "7"
  walletBalance = "0"
  footerIsOpen = false
  action = "Deposit"
  txInProgress = false
  hash = null
  val = ""
  err = ""
  success = ""
  inputIsValid = null
  inputErrMsg = ""
  asset = ""
  decimals = null
  allowanceInProgress = null
  allowance = null
  userShareInUsd = "0"
  collaterals = []
  collateralRatio = null
  usdRatio = null 
  reward = null

  get collPercnet(){
    return this.collateralRatio ? (parseFloat(this.collateralRatio) * 100).toFixed(2) : "0.00"
  }

  get usdPercnet(){
    return this.usdRatio ? (parseFloat(this.usdRatio) * 100).toFixed(2) : "0.00"
  }

  get inputIsInvalid() {
    return this.inputIsValid === false ? true : undefined;
  }

  get hasAllowance() {
    if(!this.allowance) return false
    return toBN(this.allowance).gte(reallyLargeAllowance)
  }

  get withdrawValues() {
    if(this.inputIsValid && parseFloat(this.val) > 0 ){
      return {
        usd: (parseFloat(this.val) * parseFloat(this.usdRatio)).toString(),
        coll: (parseFloat(this.val) * parseFloat(this.collateralRatio)).toString()
      }
    } else {
      return {
        usd: "0",
        coll: "0"
      }
    }
  }

  openFooter = (action) => {
    this.action = action
    this.footerIsOpen = true
  }

  closeFooter = () => {
    this.footerIsOpen = false
  }

  validateInput = (input) => {
    if(isNaN(input) || parseFloat(input) <= 0){
      this.inputIsValid = false
      this.inputErrMsg = `${this.action} amount must be a positive number`
      return
    }

    if(this.action == "Deposit") {
      if(parseFloat(input) > parseFloat(this.walletBalance)){
        this.inputIsValid = false
        this.inputErrMsg = "Insufficient wallet balance"
        return
      }

      if(!this.hasAllowance){
        this.inputIsValid = false
        this.inputErrMsg = "Insufficient allowance, unlock to grant allowance"
        return
      }
    }

    if(this.action == "Withdraw") {
      if(parseFloat(input) > parseFloat(this.userShareInUsd)){
        this.inputIsValid = false
        this.inputErrMsg = `${this.action} amount is greater than balance`
        return
      }
    }

    this.inputIsValid = true
    this.inputErrMsg = ""
    return
  }

  onInputChange = e => {
    this.val = e.target.value;
    this.validateInput(this.val)
  }

  onHash = txHash => {
    this.hash = txHash
  }

  reset = () => {
    this.txInProgress = false
    this.success = ""
    this.err = ""
    this.hash = null
    this.val = 0
    this.footerIsOpen = false
  } 

  grantAllowance = async (e) => {
    try{
      e.preventDefault()
      runInAction(()=> {
        this.allowanceInProgress = true
      })
      const {web3, user} = userStore
      const context = this.getContext()
      const tx = Interface.grantAllowance(context)
      await ApiAction(tx, user, web3, 0, ()=>{})
      await this.fetchData()
      this.validateInput(this.val)
    } catch(err) {
      console.error(err)
    } finally {
      this.allowanceInProgress = false
    }
  }

  deposit = async amount => {
    try{
      if(!this.inputIsValid){
        return
      }
      runInAction(()=> {
        this.txInProgress = true
      })
      const {web3, user} = userStore
      const context = this.getContext()
      const tx = Interface.deposit(context, amount)
      await ApiAction(tx, user, web3, 0, this.onHash)
      runInAction(()=> {
        this.success = true
      })
    }catch (err) {
      console.error(err)
      runInAction(()=> {
        this.err = err
      })
    }finally{
      const [updateUi,] = await Promise.all([
        this.fetchData(true),
        wait(5)
      ])
      updateUi()
      this.reset()
    }
  }

  withdraw = async amount => {
    try{
      if(!this.inputIsValid){
        return
      }
      runInAction(()=> {
        this.txInProgress = true
      })
      const {web3, user} = userStore
      const context = this.getContext()
      const amountInShare = await Interface.usdToShare(context, amount)
      const tx = Interface.withdraw(context, amountInShare)
      await ApiAction(tx, user, web3, 0, this.onHash)
      runInAction(()=> {
        this.success = true
      })
    }catch (err) {
      console.error(err)
      runInAction(()=> {
        this.err = err
      })
    }finally{
      const [updateUi,] = await Promise.all([
        this.fetchData(true),
        wait(5)
      ])
      updateUi()
      this.reset()
    }
  }

  claimReward = async () => {
    try{
      runInAction(()=> {
        this.txInProgress = true
      })
      const {web3, user} = userStore
      const amountInShare = "0"
      const context = this.getContext()
      const tx = Interface.withdraw(context, amountInShare)
      await ApiAction(tx, user, web3, 0, this.onHash)
      runInAction(()=> {
        this.success = true
      })
    }catch (err) {
      console.error(err)
      runInAction(()=> {
        this.err = err
      })
    }finally{
      const [updateUi,] = await Promise.all([
        this.fetchData(true),
        wait(5)
      ])
      updateUi()
      this.reset()
    }
  }

  constructor(config) {
    this.config = config
    this.asset = config.tokenName
    makeAutoObservable(this)
  }

  init = () => {
    return this.fetchData()
  }

  getContext = () => {
    const {web3, user, chain} = userStore
    return {
      web3, user, chain, ...this.config
    }
  }

  fetchData = async (updateFn) => {
    try{
      const context = this.getContext()
      this.decimals = this.config.decimals
      const tvlPromise = Interface.getTvl(context)
      const walletBalancePromise = Interface.getWalletBallance(context)
      const poolBalancePromise = Interface.getPoolBallance(context)
      const allowancePromise = Interface.getAllowance(context)
      const userShareInUsdPromise = Interface.getUserShareInUsd(context)
      const collateralsPromise = Interface.getCollaterals(context)
      const rewardPromise = Interface.getReward(context)
      // fetching in  parallel
      const [walletBalance, { eth, token }, {tvl, usdRatio, collRatio}, allowance, userShareInUsd, collaterals, reward] = await Promise.all([
        walletBalancePromise, 
        poolBalancePromise,
        tvlPromise,
        allowancePromise,
        userShareInUsdPromise,
        collateralsPromise,
        rewardPromise
      ])
      
      const uiUpdate = () => {
        runInAction(()=> {
          this.walletBalance = Interface.normlize(walletBalance, this.decimals)
          this.tvl = Interface.normlize(tvl, this.decimals)
          this.allowance = allowance
          this.userShareInUsd = Interface.normlize(userShareInUsd, this.decimals)
          this.collateralRatio = collRatio
          this.usdRatio = usdRatio
          this.collaterals.replace(collaterals)
          this.reward = reward
        })
      }
      if (updateFn === true){
        return uiUpdate
      }
      uiUpdate()
    }catch (err) {
      console.error(`fetchData: ${err.message} @: ${err.stack}`)
    }
  }

}

class HundredStore {
  stabilityPools = []

  constructor() {
    makeAutoObservable(this)
  }

  onUserConnect = async () => {
    const {chain} = userStore
    const pools = []
    for (const pool of getPools(chain)){
      const store = new PoolStore(pool)
      await store.init()
      pools.push(store)
      runInAction(()=> {
        this.stabilityPools.replace(pools)
      })
    }
  }
}

export default new HundredStore()