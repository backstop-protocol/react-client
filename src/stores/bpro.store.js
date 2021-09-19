/**
 * @format
 */
import React, {Component} from "react";
import { runInAction, makeAutoObservable } from "mobx"
import compoundStore from "./compound.store"
import routerStore from "./router.store"
import EventBus from "../lib/EventBus"
import Web3 from "web3"
import {getBproDistribution, getBproBalance, getClaimedAmount, claimBpro} from "../lib/ScoreInterface" 
import {ApiAction} from "../lib/ApiHelper" 
import userStore from "../stores/user.store"
import BproClaimModal from "../components/modals/BproClaimModal"
import {BP_API} from "../common/constants"

const {toBN, toWei, fromWei} = Web3.utils

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
        this.totalBproNotInWallet = fromWei(toBN(toWei(this.claimable)).toString())
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
    runInAction(()=> {
      this.walletBalance = "0"
    })
    // const {user, web3} = userStore
    // const walletBallance = await getBproBalance(web3, user)
    // runInAction(()=> {
    //   this.walletBalance = fromWei(walletBallance)
    // })
  }

  getClaimableAmount = async () => {
    runInAction(()=> {
      this.claimable = "0"
    })

    // try {

    //   const {user, web3} = userStore
    //   const claimed = await getClaimedAmount(web3, user)
      
    //   console.log(claimed)
    //   const {amount} = this.smartContractScore.userData[user.toLowerCase()] || {}
    //   if(amount){
    //     runInAction(()=> {
    //       this.claimable = fromWei(toBN(amount).sub(toBN(claimed)).toString())
    //       this.claimable = parseFloat(this.claimable) >= 0 ? this.claimable : "0"
    //     })
    //   }
    // }catch (err){
    //   console.error(err)
    // }
  }

  getUnclaimableAmount = async () => {
    const {user, web3} = userStore
    const res = await fetch("https://score.bprotocol.org")
    const bip4 = await fetch("https://bip4.bprotocol.org")
    const bipScoreData = await bip4.json()
    const currentScoreData = await res.json()
    let {amount: serverAmount, makerAmount} = currentScoreData.userData[user.toLowerCase()] || {}
    let {amount: serverAmountBip4 } = bipScoreData.userData[user.toLowerCase()] || {}
    let {amount: ipfsAmount} = this.smartContractScore.userData[user.toLowerCase()] || {}

    serverAmountBip4 = serverAmountBip4 || "0"
    serverAmount = serverAmount || "0"
    ipfsAmount = ipfsAmount || "0"
    makerAmount = makerAmount || "0"
    const unclaimable = fromWei(toBN(serverAmountBip4).sub(toBN(ipfsAmount || "0")).toString())
    if(serverAmount){
      runInAction(()=> {
        this.mScore = fromWei(toBN(makerAmount).toString())
        this.cScore = fromWei(toBN(serverAmount).sub(toBN(makerAmount)).toString())
        // this.unclaimable = parseFloat(unclaimable) >= 0 ? unclaimable : "0"
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