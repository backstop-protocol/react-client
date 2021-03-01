import { makeAutoObservable, runInAction } from "mobx"
import Web3 from "web3"
import {getCompUserInfo} from "../lib/compound.interface"
import CToken from "../lib/compound.util"
import compoundStore from "./compound.store"
// const {API} = require("../../src/API")
const {BN, fromWei, toWei} = Web3.utils

// const BP_API = "https://bp-api.bprotocol.workers.dev"
const BP_API = "https://cloudflare-eth.com"

class MainCompStore {
    tvl = "--,---"
    tvlNumeric = 0
    compoundAccounts = 0
    jar = "--,---"
    constructor (){
        makeAutoObservable(this)
        const web3 = new Web3(BP_API)
        this.compUserInfoPromise = getCompUserInfo(web3, 1, "0x0000000000000000000000000000000000000001", true)
        this.fetchTvl()
        this.fetchJar()
        this.setIntialStateApy()
    }

    async fetchJar () {
        try{
            const compUserInfo = await this.compUserInfoPromise
            let jar = 0
            Object.keys(compUserInfo.bUser).forEach(address=> {
                const jarData = compUserInfo.jarInfo[address]
                const [data, info] = [compUserInfo.bUser[address], compUserInfo.tokenInfo[address]]
                const coin = new CToken(address, data, info)
                const totalBalance = coin.getUnderlyingBalance(jarData.ctokenBalance)
                const totalBalanceUsd = coin.getUnderlyingBalanceInUsd(totalBalance)
                jar += parseFloat(totalBalanceUsd)

            })
            runInAction(()=> {
                this.jar = jar.toFixed(0)
            })
        } catch (err){
            console.error("failed to fatch Jar for compound")
        }
    }

    async fetchTvl (){
        try{
            const compUserInfo = await this.compUserInfoPromise
            let tvl = 0
            let numAccounts
            Object.keys(compUserInfo.bUser).forEach(address=> {
                const tvlData = compUserInfo.tvlInfo[address]
                numAccounts = tvlData.numAccounts
                const [data, info] = [compUserInfo.bUser[address], compUserInfo.tokenInfo[address]]
                const coin = new CToken(address, data, info)
                const totalBalance = coin.getUnderlyingBalance(tvlData.ctokenBalance)
                const totalBalanceUsd = coin.getUnderlyingBalanceInUsd(totalBalance)
                tvl += parseFloat(totalBalanceUsd)
            })
            
            runInAction(()=> {
                this.tvlNumeric = tvl
                this.tvl = this.tvlNumeric.toFixed(1)
                this.compoundAccounts = numAccounts
            })
        }catch (err){
            console.error("failed to fatch TVL for compound")
        }
    }

    async setIntialStateApy (){
        const compUserInfo = await this.compUserInfoPromise
        if(!compoundStore.firstUserInfoFetch){
            compoundStore.processUserInfo(compUserInfo)
        }
    }
}

export default new  MainCompStore ()