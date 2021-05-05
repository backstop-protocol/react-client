/**
 * @format
 */
import React, {Component} from "react";
import { runInAction, makeAutoObservable } from "mobx"
import compoundStore from "./compound.store"
import makerStore from "./maker.store"
import routerStore from "./router.store"
import EventBus from "../lib/EventBus"
import Web3 from "web3"
import {getBproDistribution, getBproBalance, getClaimedAmount, claimBpro} from "../lib/ScoreInterface" 
import {ApiAction} from "../lib/ApiHelper" 
import userStore from "../stores/user.store"
import BproClaimModal from "../components/modals/BproClaimModal"

const {toBN, toWei, fromWei} = Web3.utils
const BP_API = "https://eth-node.b-protocol.workers.dev"

class BproStore {

  userAgreesToTerms = false
  smartContractScore = null
  claimed = "0"
  claimable = "0"
  unclaimable = "0"
  walletBalance = "0"
  totalBproNotInWallet = "0"
  cliamEnabled = false 
  dataFetchRetries = 0
  mScore = "0"
  cScore = "0"

  constructor (){
    makeAutoObservable(this)
    this.init()
  }

  onUserConnect = async () => {
    try{
      await !this.smartContractScore ? this.init() : Promise.resolve(this.smartContractScore)
      await Promise.all([
        this.getClaimableAmount(),
        this.getUnclaimableAmount(),
        this.getWalletBallance()
      ])
      runInAction(()=> {
        this.totalBproNotInWallet = fromWei(toBN(toWei(this.claimable)).add(toBN(toWei(this.unclaimable))).toString())
      })
      this.cliamEnabled = true
    }catch(err){
      console.error(err)
      this.cliamEnabled = false
      if(this.dataFetchRetries < 3){
        this.dataFetchRetries++
        this.onUserConnect()
      }
    }
  }

  getWalletBallance = async () => {
    const {user, web3} = userStore
    const walletBallance = await getBproBalance(web3, user)
    runInAction(()=> {
      this.walletBalance = fromWei(walletBallance)
    })
  }

  getClaimableAmount = async () => {
    try {
      const {user, web3} = userStore
      const claimed = await getClaimedAmount(web3, user)
      
      console.log(claimed)
      const {amount} = this.smartContractScore.userData[user.toLowerCase()] || {}
      if(amount){
        runInAction(()=> {
          this.claimable = fromWei(toBN(amount).sub(toBN(claimed)).toString())
        })
      }
    }catch (err){
      console.error(err)
    }
  }

  getUnclaimableAmount = async () => {
    const {user, web3} = userStore
    const res = await fetch("https://bpro.s3.amazonaws.com/score.json")
    const currentScoreData = await res.json()
    const {amount: serverAmount, makerAmount} = currentScoreData.userData[user.toLowerCase()] || {}
    const {amount: ipfsAmount} = this.smartContractScore.userData[user.toLowerCase()] || {}
    console.log(this.claimable)
    if(serverAmount){
      runInAction(()=> {
        this.mScore = fromWei(toBN(makerAmount).toString())
        this.cScore = fromWei(toBN(serverAmount).sub(toBN(makerAmount)).toString())
        this.unclaimable = fromWei(toBN(serverAmount).sub(toBN(ipfsAmount || 0)).toString())
      })
    }
    console.log(currentScoreData)
  }

  claim = async () => {
    const {user, web3} = userStore
    const {cycle, index, amount, proof} = this.smartContractScore.userData[user.toLowerCase()]

    const tx = claimBpro(web3, user, cycle, index, amount, proof)
    await ApiAction(tx, user, web3, 0)
    await this.onUserConnect()
  }

  init = async () => {
    const web3 = new Web3(BP_API)
    // todo fetch data
    const {contentHash} = await getBproDistribution(web3)
    const res = await fetch("https://cloudflare-ipfs.com/ipfs/" + contentHash)
    this.smartContractScore = await res.json()
  }

  iAgree = () => {
    this.userAgreesToTerms = true
  }

  showClaimBproPopup = () => {
    if(!userStore.loggedIn){
      userStore.showConnect()
      return
    }
    if(!this.cliamEnabled){
      return
    }
    const noWrapper = true
    EventBus.$emit('show-modal', <BproClaimModal />, noWrapper);
  }
}

export default new BproStore()