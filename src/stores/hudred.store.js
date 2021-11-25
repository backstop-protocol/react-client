/**
 * @format
 */
import { makeAutoObservable, runInAction } from "mobx"
import {pools} from "../lib/hundred/config"
import { getWalletBallance, getPoolBallance } from "../lib/hundred/interface"
import userStore from "./user.store"

class PoolStore {
  totalEth = "0"
  totalToken = "0"
  tvl = "0.00"
  amount = "0.00"
  apy = "0.00"
  walletBalance = "0.00"

  constructor({poolAddresses, tokenAddresses, tokenName}) {
    this.poolAddresses = poolAddresses
    this.tokenAddresses = tokenAddresses
    this.asset = tokenName
    makeAutoObservable(this)
    this.fetchData()
  }

  fetchData = async () => {
    const {web3, user} = userStore
    const walletBalancePromise = await getWalletBallance(web3, user, this.tokenAddresses)
    const poolBalancePromise = await getPoolBallance(web3, this.tokenAddresses, this.poolAddresses);
    const [walletBalance, { eth, token }] = Promise.all([walletBalancePromise, poolBalancePromise])
    runInAction(()=> {
      debugger
      this.walletBalance = walletBalance
    })
  }
}

class HundredStore {
  stabilityPools = []

  constructor() {
    makeAutoObservable(this)
  }

  onUserConnect = () =>{
    pools.forEach(pool => {
      const sp = new PoolStore(pool)
      this.stabilityPools.push(sp)
    })
  }

  getPools = () => {

  }
}

export default new HundredStore()