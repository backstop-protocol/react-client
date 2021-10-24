/**
 * @format
 */
import React, {Component} from "react";
import { runInAction, makeAutoObservable } from "mobx"
import compoundStore from "./compound.store"
import routerStore from "./router.store"
import EventBus from "../lib/EventBus"
import Web3 from "web3"
import {getBproDistribution, getBproBalance, getClaimedAmount, claimBpro, validBproType} from "../lib/ScoreInterface" 
import {ApiAction} from "../lib/ApiHelper" 
import userStore from "../stores/user.store"
import BproClaimModal from "../components/modals/BproClaimModal"
import {BP_API} from "../common/constants"

const {toBN, toWei, fromWei} = Web3.utils

export class BproStore {

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
  mScoreTotal = "0"
  mScoreShare = "0"
  cScore = "0"
  instaUser = null
  cStoreTotal = "0"
  cScoreShare = "0"

  constructor (type, instaUser){
    if(!validBproType(type)){
      throw new Error(type +' is invalid BPRO type')
    }
    this.bproType = type
    this.instaUser = instaUser
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
        this.totalBproNotInWallet = (parseFloat(this.claimable)+parseFloat(this.unclaimable)).toString()
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
    let {user, web3} = userStore
    user = this.instaUser || user
    const walletBallance = await getBproBalance(web3, user, this.bproType)
    runInAction(()=> {
      this.walletBalance = fromWei(walletBallance)
    })
  }

  getClaimableAmount = async () => {
    try {
      let {user, web3} = userStore
      user = this.instaUser || user
      const claimed = await getClaimedAmount(web3, user, this.bproType)
      
      console.log(claimed)
      const {amount} = this.smartContractScore.userData[user.toLowerCase()] || {}
      if(amount){
        runInAction(()=> {
          this.claimable = fromWei(toBN(amount).sub(toBN(claimed)).toString())
          this.claimable = parseFloat(this.claimable) >= 0 ? this.claimable : "0"
        })
      }
    }catch (err){
      console.error(err)
    }
  }

  getUnclaimableAmount = async () => {
    let {user, web3} = userStore
    user = this.instaUser || user
    const api = this.bproType === 'BPRO' ? 'score' : 'bip4'
    const res = await fetch(`https://${api}.bprotocol.org`)
    const currentScoreData = await res.json()
    let {amount: serverAmount, makerAmount} = currentScoreData.userData[user.toLowerCase()] || {}
    let {amount: ipfsAmount} = this.smartContractScore.userData[user.toLowerCase()] || {}
    let serverAmountTotal = Object.entries(currentScoreData.userData).map(([k,v]) => toBN(v.amount)).reduce((p, n) => p.add(n)) || "0"
    let makerAmountTotal = Object.entries(currentScoreData.userData).map(([k,v]) => toBN(v.makerAmount)).reduce((p, n) => p.add(n)) || "0"

    serverAmount = serverAmount || "0"
    ipfsAmount = ipfsAmount || "0"
    makerAmount = makerAmount || "0"
    const unclaimable = fromWei(toBN(serverAmount).sub(toBN(ipfsAmount || "0")).toString())
    if(serverAmount){
      runInAction(()=> {
        this.mScore = fromWei(toBN(makerAmount).toString())
        this.cScore = fromWei(toBN(serverAmount).sub(toBN(makerAmount)).toString())
        this.mScoreTotal = fromWei(makerAmountTotal.toString())
        this.cScoreTotal = fromWei(serverAmountTotal.sub(makerAmountTotal).toString())
        this.mScoreShare = ((this.mScore / this.mScoreTotal) * 100).toString()
        this.cScoreShare = ((this.cScore / this.cScoreTotal) * 100).toString()
        this.unclaimable = parseFloat(unclaimable) >= 0 ? unclaimable : "0"
      })
    }
    console.log(currentScoreData)
  }

  claim = async () => {
    let {user, web3} = userStore
    user = this.instaUser || user
    const {cycle, index, amount, proof} = this.smartContractScore.userData[user.toLowerCase()]
    const tx = claimBpro(web3, user, cycle, index.toString(), amount, proof, this.bproType)
    await ApiAction(tx, user, web3, 0)
    await this.onUserConnect() // refresh state
  }

  init = async () => {
    const web3 = new Web3(BP_API)
    // todo fetch data
    const {contentHash} = await getBproDistribution(web3, this.bproType)
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
    EventBus.$emit('show-modal', <BproClaimModal type={this.bproType} />, noWrapper);
  }
}

export const uBproStore = new BproStore('uBPRO-BIP4')
export default new BproStore('BPRO')