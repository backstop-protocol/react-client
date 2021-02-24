import { makeAutoObservable, runInAction } from "mobx"
import Web3 from "web3"
import {getCompUserInfo} from "../lib/compound.interface"
import CToken from "../lib/compound.util"
const {API} = require("../../src/API")
const {BN, fromWei, toWei} = Web3.utils

const BP_API = "https://bp-api.bprotocol.workers.dev"

class MainCompStore {
    tvl = "--,---"
    tvlNumeric = 0
    compoundAccounts = 0
    jar = "--,---"
    constructor (){
        makeAutoObservable(this)
        const web3 = new Web3(API)
        this.compUserInfoPromise = getCompUserInfo(web3, 42, "0x18DB5F7711d57974d825f9ca45D21627353bEb72", true)
        this.fetchTvl()
        this.fetchJar()
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
}

export default new  MainCompStore ()