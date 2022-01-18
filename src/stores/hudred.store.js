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
  apy = "0"
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
      const tx = Interface.grantAllowance(web3, this.tokenAddress, this.poolAddress)
      await ApiAction(tx, user, web3, 0, ()=>{})
      await this.fetchData()
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
      const tx = Interface.deposit(this.context, amount)
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
      await wait(5)
      this.fetchData()
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
      const amountInShare = await Interface.usdToShare(this.context, amount)
      const tx = Interface.withdraw(this.context, amountInShare)
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
      await wait(5)
      this.fetchData()
      this.reset()
    }
  }

  constructor(config) {
    this.config = config
    this.asset = config.tokenName
    makeAutoObservable(this)
    this.fetchData()
  }

  get context(){
    const {web3, user, chain} = userStore
    return {
      web3, user, chain, ...this.config
    }
  }

  fetchData = async () => {
    try{
      this.decimals = await Interface.getDecimals(this.context)
      const tvlPromise = Interface.getTvl(this.context)
      const walletBalancePromise = Interface.getWalletBallance(this.context)
      const poolBalancePromise = Interface.getPoolBallance(this.context)
      const allowancePromise = Interface.getAllowance(this.context)
      const userShareInUsdPromise = Interface.getUserShareInUsd(this.context)
      const collateralsPromise = Interface.getCollaterals(this.context)
      // fetching in  parallel
      const [walletBalance, { eth, token }, {tvl, usdRatio, collRatio}, allowance, userShareInUsd, collaterals] = await Promise.all([
        walletBalancePromise, 
        poolBalancePromise,
        tvlPromise,
        allowancePromise,
        userShareInUsdPromise,
        collateralsPromise
      ])

      runInAction(()=> {
        this.walletBalance = Interface.normlize(walletBalance, this.decimals)
        this.tvl = Interface.normlize(tvl, this.decimals)
        this.allowance = allowance
        this.userShareInUsd = Interface.normlize(userShareInUsd, this.decimals)
        this.collateralRatio = collRatio
        this.usdRatio = usdRatio
        this.collaterals.replace(collaterals)
      })
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

  onUserConnect = () =>{
    const {chain} = userStore
    debugger
    const pools = getPools(chain).map(pool => new PoolStore(pool))
    this.stabilityPools.replace(pools)
  }
}

export default new HundredStore()