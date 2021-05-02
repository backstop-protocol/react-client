/**
 * @format
 */
import { runInAction, makeAutoObservable } from "mobx"
import compoundStore from "./compound.store"
import makerStore from "./maker.store"
import routerStore from "./router.store"
import EventBus from "../lib/EventBus"
import Web3 from "web3"
import {getBproDistribution, getBproBalance, getClaimedAmount, claimBpro} from "../lib/ScoreInterface" 
import {ApiAction} from "../lib/ApiHelper" 
import userStore from "../stores/user.store"

const {toBN, toWei, fromWei} = Web3.utils
const BP_API = "https://eth-node.b-protocol.workers.dev"

class BproStore {

  userAgreesToTerms = false
  userData = null
  claimed = "0"
  claimable = "0"
  unclaimable = "0"
  walletBalance = "0"
  totalBproNotInWallet = "0"

  constructor (){
    makeAutoObservable(this)
    this.init()
  }

  onUserConnect = () => {
    this.getClaimableAmount()
    this.getWalletBallance()
  }

  getWalletBallance = async () => {
    const {user, web3} = userStore
    const walletBallance = await getBproBalance(web3, user)
    runInAction(()=> {
      debugger
      this.walletBalance = fromWei(walletBallance)
    })
  }

  getClaimableAmount = async () => {
    const {user, web3} = userStore
    const claimed = await getClaimedAmount(web3, user)
    
    console.log(claimed)
    runInAction(()=> {
      const {amount} = this.userData.userData[user.toLowerCase()]
      if(amount){
        this.claimable = fromWei(toBN(amount).sub(toBN(claimed)).toString())
      }
    })
  }

  claim = async () => {
    const {user, web3} = userStore
    const {cycle, index, amount, proof} = this.userData.userData[user.toLowerCase()]

    const tx = claimBpro(web3, user, cycle, index, amount, proof)
    await ApiAction(tx, user, web3, 0)
  }

  init = async () => {
    const web3 = new Web3(BP_API)
    // todo fetch data
    const {contentHash} = await getBproDistribution(web3)
    const res = await fetch("https://cloudflare-ipfs.com/ipfs/" + contentHash)
    this.userData = await res.json()
  }

  iAgree = () => {
    this.userAgreesToTerms = true
  }

  // getBproBalance = async () => {
  //   0xbbBBBBB5AA847A2003fbC6b5C16DF0Bd1E725f61
  // }
}

export default new BproStore()