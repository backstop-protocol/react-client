import { makeAutoObservable, runInAction } from "mobx"
import { getBammLusd } from "../lib/liquity.interface"
import Web3 from "web3"
import {BP_API} from "../common/constants"

const { fromWei} = Web3.utils

/**
 * Main Store is desigend for general purpose app data
 */
class MainLiquityStore {

    liquityTvlNumeric = 0

    constructor (){
        makeAutoObservable(this)
        this.dataPromise = this.fetchGeneralDappData()
    }

    async fetchGeneralDappData () {
        try{
            await this.fetchBammUsd()
        } catch (err) {
            console.error(err)
        }
    }

    async fetchBammUsd () {
        const web3 = new Web3(BP_API)
        const lusd = await getBammLusd(web3, "1")
        const usd = parseFloat(fromWei(lusd))
        runInAction(()=>{
            this.liquityTvlNumeric = usd
        })
    }
}

export default new MainLiquityStore()
