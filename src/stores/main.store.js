import { makeAutoObservable, runInAction } from "mobx"
import * as B from "../lib/bInterface"
import * as ApiHelper from "../lib/ApiHelper"
import Web3 from "web3"
import axios from "axios"
import {toCommmSepratedString} from "../lib/Utils"
const BP_API = "https://eth-node.b-protocol.workers.dev"


/**
 * Main Store is desigend for general purpose app data
 */
class MainStore {

    generalInfo = null
    jarBalanceEth = "--,---" //  default
    jarBalanceUsd = 10000 // dafult
    tvlUsdNumeric = 0
    tvlUsd = "--,---" //  default
    tvlEth = "--,---" //  default
    tvlDai = "--,---"
    cdpi = 0
    spotPrice = null
    makerPriceFeedPrice = ""
    makerPriceFeedPriceNextPrice = ""
    defiexploreLastUpdate = ""
    stabilityFee = new Map()
    ethMarketPrice = ""
    coinbaseLastUpdate
    dataPromise
    tvlDaiRaw = "0"
    artToDaiRatio = "0"


    constructor (){
        makeAutoObservable(this)
        this.dataPromise = this.fetchGeneralDappData()
    }

    async fetchGeneralDappData () {
        await this.fetchPrices()
        await this.fetchTvl() // tvl requires the spot price
        await this.fetchPrices()
    }

    async getTvlUsdNumeric () {
        await this.dataPromise
        return this.tvlUsdNumeric
    }

    async fetchTvl () {
        try{
            const web3 = new Web3(BP_API)
            let info = await B.getStats(web3, "1")
            this.tvlEth = parseFloat(web3.utils.fromWei(info.eth)).toFixed(1)
            this.tvlUsdNumeric = parseFloat(this.tvlEth * this.spotPrice)
            this.tvlUsd = toCommmSepratedString(this.tvlUsdNumeric.toFixed(1))
            this.tvlDaiRaw = info.dai
            this.tvlDai = parseFloat(web3.utils.fromWei(info.dai)).toFixed(1)
            this.cdpi = info.cdpi
        }catch (err){
            console.error("failed to fatch TVL")
        }
    }

    async fetchPrices () {
        try{
            const dataPromises = [
                axios.get('https://defiexplore.com/api/stats/globalInfo'),
                axios.get('https://www.coinbase.com/api/v2/assets/prices/ethereum?base=USD')
            ]
            let [{data: data1}, {data: data2}] = await Promise.all(dataPromises)
            const data3 = data1['tokenData']['ETH-B']
            const data4 = data1['tokenData']['ETH-C']
            data1 = data1['tokenData']['ETH-A']
           
            this.makerPriceFeedPrice = parseFloat(data1.price).toFixed(2)
            this.makerPriceFeedPriceNextPrice = parseFloat(data1.futurePrice).toFixed(2)
            this.defiexploreLastUpdate = data1.updatedAt
            runInAction(()=> {
                this.stabilityFee.set('ETH-A', data1.stabilityFee)
                this.stabilityFee.set('ETH-B', data3.stabilityFee)
                this.stabilityFee.set('ETH-C', data4.stabilityFee)
            })

            this.artToDaiRatio = data1.rate
            this.coinbaseLastUpdate = data2.data.prices.latest_price.timestamp
            data2 = data2.data.prices.latest
            this.spotPrice = parseFloat(data2)
            this.ethMarketPrice = parseFloat(data2).toFixed(2)
            
        }catch (err){
            console.error(err)
        } 
    }
}

export default new MainStore()
