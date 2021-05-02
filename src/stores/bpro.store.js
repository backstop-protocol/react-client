/**
 * @format
 */
import { runInAction, makeAutoObservable } from "mobx"
import compoundStore from "./compound.store"
import makerStore from "./maker.store"
import routerStore from "./router.store"
import EventBus from "../lib/EventBus"
import Web3 from "web3"

class BproStore {

  userAgreesToTerms = false

  constructor (){
    makeAutoObservable(this)
  }

  iAgree = () => {
    this.userAgreesToTerms = true
  }
}

export default new BproStore()