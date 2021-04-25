import { makeAutoObservable, runInAction } from "mobx"
import Web3 from "web3"
import {vote, getVoteProposal} from "../lib/compound.interface"
import CToken from "../lib/compound.util"
import {toCommmSepratedString} from "../lib/Utils"
import {ApiAction} from "../lib/ApiHelper"
import userStore from "./user.store"
import mainCompStore from "./main.comp.store"


const proposalId = window.appConfig.compoundPropsalId
const {BN, toBN, fromWei, toWei} = Web3.utils

const BP_API = window.appConfig.voteBpApi //"https://eth-node.b-protocol.workers.dev"

class CompVoteStore {

  forVotes = "0"
  voted = false
  cantVote = false
  voting = false

  constructor (){
    makeAutoObservable(this)
    this.getData()
  }

  canVote = async () => {
    try{
      const {networkType, user, web3} = userStore
      const tx = vote(web3, networkType, proposalId)
      const voteRes = await tx.call({gasLimit:10e6, from:user})
      runInAction(()=> {
        this.cantVote = false
      })
    } catch(e){
      runInAction(()=> {
        this.cantVote = true
      })
    }
  }

  vote = async () => {
    try{
      const {loggedIn, showConnect, networkType, user, web3} = userStore
      if(!loggedIn){
        showConnect()
        return
      }
      runInAction(()=> {
        this.voting = true
      })
      const tx = vote(web3, networkType, proposalId)
      const voteRes = await ApiAction(tx, user, web3)
      localStorage.setItem(user+"_voted_compound", Date.now().toString())
      await this.getData()
      runInAction(()=> {
        this.voting = false
        this.voted = true
      })
      return voteRes
    } catch (err){
      runInAction(()=> {
        this.voting = false
      })
      console.error(err)
    }
  }

  async getData() {
    try{
      const web3 = new Web3(BP_API)
      const proposal = await getVoteProposal(web3, 1, proposalId)
      runInAction(()=> {
        this.forVotes = fromWei(proposal.forVotes)
      })
    } catch(e){
      console.error(e)
    }
  }

  calcVotePrecent = (forVotes, totalScore) => {
    debugger
    forVotes = toWei(forVotes)
    totalScore = toWei(totalScore)
    if(forVotes == "0" || totalScore == "0"){
      return "0"
    }

    let res = ((toBN(forVotes).mul(toBN(1000000000000))).div(toBN(totalScore))).toString()
    res = parseFloat(res)/10000000000
    return res  //((forVotes / totalScore)*100).toFixed(10) : 0
  }

  async getUserInfoDependentData(){
    try{
      this.getData()
      const {user} = userStore
      this.voted = localStorage.getItem(user+"_voted_compound") ? true : false
      this.canVote()
    }catch(err){
      console.error(err)
    }
  }
}

export default new  CompVoteStore ()