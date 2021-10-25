/**
 * @format
 */
import { makeAutoObservable, runInAction } from "mobx"
import {getAccounts} from "../lib/insta.interface"
import userStore from "./user.store"
import { BproStore } from './bpro.store'
import { ApyStore } from './apy.store'

export const bproInstaStores = {}

class InstaStore {
  accounts = []

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
      bproInstaStores[account] = new BproStore('uBPRO-BIP4', account)
      bproInstaStores[account].onUserConnect()
    })
    runInAction(()=> {
      this.accounts = accounts
    })
  }
    
}

export default new InstaStore()