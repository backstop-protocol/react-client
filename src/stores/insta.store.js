/**
 * @format
 */
import { makeAutoObservable, runInAction } from "mobx"
import {getAccounts} from "../lib/insta.interface"
import userStore from "./user.store"
import { BproStore } from './bpro.store'
import { ApyStore } from './apy.store'

class InstaStore {
  bproInstaStores = {}

  constructor (){
    makeAutoObservable(this)
  }

  onUserConnect = async () => {
    try{
      this.getAccounts()
    } catch (err){
      console.error(err)
    }
  }
   
  async getAccounts() {
    const { web3, networkType, user } = userStore
    const accounts = await getAccounts(web3, networkType, user)
    accounts.forEach(account => {
      const store = new BproStore('uBPRO-BIP4', account)
      store.onUserConnect()
      this.bproInstaStores[account] = store
    })
  }
} 


export default new InstaStore()