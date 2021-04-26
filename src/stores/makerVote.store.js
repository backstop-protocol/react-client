import { makeAutoObservable, runInAction, autorun } from "mobx"
import Web3 from "web3"
import {vote, claimJar, getVoteProposal, jarClaimedScore} from "../lib/bInterface"
import {ApiAction} from "../lib/ApiHelper"
import userStore from "./user.store"
import makerStore from "./maker.store"
import mainStore from "./main.store"

const proposalId = window.appConfig.makerPropsalId
const {BN, fromWei, toWei, toBN} = Web3.utils

// const BP_API = "https://bp-api.bprotocol.workers.dev"
const BP_API = window.appConfig.voteBpApi//"https://eth-node.b-protocol.workers.dev"

class MakerVoteStore {

  forVotes = "0"
  voted = false
  cantVote = false
  cantClaim = false
  scoreClaimedFromJar = 0
  personalJarBalance = 0
  voting = false

  constructor (){
    makeAutoObservable(this)
  }

  getVoteTx (){
    const {web3, networkType, user, loggedIn, showConnect} = userStore
    const {userInfo} = makerStore
    const tx = vote(web3, networkType, userInfo.proxyInfo.userProxy, userInfo.bCdpInfo.cdp, proposalId)
    return tx
  }

  async canVote (){ 
    try{
      const {web3, networkType, user, loggedIn, showConnect} = userStore
      if(!loggedIn){
        return
      }
      const voteTX = await this.getVoteTx().call({gasLimit:10e6, from:user})
      runInAction(()=> {
        this.cantVote = false
      })
    } catch(e){
      runInAction(()=> {
        this.cantVote = true
      })
    }
  }

  async getJarClaimedScore (){
    try{
      const web3 = new Web3(BP_API)
      const res = await jarClaimedScore(web3)
      runInAction(()=> {
        this.scoreClaimedFromJar = fromWei(res)
      })
    } catch(e){
      console.error(e)
    }
  }

  async vote () {
    try{
      const {loggedIn, showConnect, user, web3} = userStore
      if(!loggedIn){
        showConnect()
        return
      }
      runInAction(()=> {
        this.voting = true
      })
      const tx = this.getVoteTx()
      const voteRes = await ApiAction(tx, user, web3)
      localStorage.setItem(user+"_voted_maker", Date.now().toString())
      await this.getData()
      runInAction(()=> {
        this.voted = true
        this.voting = false
      })
      return voteRes
    } catch (err){
      runInAction(()=> {
        this.voting = false
      })
      console.error(err)
    }
  }  

  async claim(){
    try{
      const {loggedIn, networkType, showConnect, user, web3} = userStore
      if(!loggedIn){
        showConnect()
        return
      }
      const {userInfo} = makerStore
      const tx = claimJar(web3, networkType, userInfo.proxyInfo.userProxy, userInfo.bCdpInfo.cdp)
      const res = await ApiAction(tx, user, web3)
      this.getData()
    }catch (err){
      console.error(err)
    }
  }

  async canClaim(){
    try{
      const {loggedIn, networkType, showConnect, user, web3} = userStore
      if(!loggedIn){
        return
      }
      const {userInfo} = makerStore
      const tx = claimJar(web3, networkType, userInfo.proxyInfo.userProxy, userInfo.bCdpInfo.cdp)
      await tx.call({gasLimit:10e6, from:user})

      runInAction(()=> {
        this.cantClaim = false
      })
    }catch (err){
      runInAction(()=> {
        this.cantClaim = true
      })
    }
  }

  async getData() {
     try{
      const {user, loggedIn} = userStore
      this.getJarClaimedScore()
      const web3 = new Web3(BP_API)
      const proposal = await getVoteProposal(web3, 1, proposalId)
      runInAction(()=> {
        this.forVotes = fromWei(proposal.forVotes)
      })
     } catch(e){
      console.error(e)
     }
  }

  calcPersonalJarBalance () { 
    const { userInfo, userInfoUpdate } = makerStore
    const totalScore = userInfo ? userInfo.userRatingInfo.totalRating : 0  
    const userScore = userInfo ? userInfo.userRatingInfo.userRating : 0
    const jarBalance = (!userScore || this.cantClaim) ? 0 : (userScore*(mainStore.jarBalanceUsd/(totalScore - this.scoreClaimedFromJar))).toFixed(8)
    this.personalJarBalance = jarBalance
  }

  calcVotePrecent = (forVotes, totalScore) => {
    forVotes = toWei(forVotes)
    totalScore = toWei(totalScore.toString())
    const {generalInfo} = mainStore
    if(forVotes == "0" || totalScore == "0"){
      return "0"
    }

    let res = ((toBN(forVotes).mul(toBN(10000))).div(toBN(totalScore))).toString()
    res = parseFloat(res)/100
    return res  //((forVotes / totalScore)*100).toFixed(10) : 0
  }

  async getUserInfoDependentData(){
    try{
      this.getData()
      const {user} = userStore
      this.voted = localStorage.getItem(user+"_voted_maker") ? true : false
      this.canVote()
      await this.canClaim()
      this.calcPersonalJarBalance()
    }catch(err){
      console.error(err)
    }
  }
}

export default new MakerVoteStore ()
