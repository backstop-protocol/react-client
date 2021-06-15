import { makeAutoObservable, runInAction } from "mobx"
import * as B from "../lib/bInterface"
import * as ApiHelper from "../lib/ApiHelper"
import Web3 from "web3"
import axios from "axios"
import {toCommmSepratedString} from "../lib/Utils"
import makerStoreManager, {makerStoreNames} from "./maker.store"
import {BP_API} from "../common/constants"

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
    makerPriceFeed = {}
    defiexploreLastUpdate = ""
    stabilityFee = new Map()
    ethMarketPrice = ""
    wbtcMarketPrice = ""
    coinbaseLastUpdate
    dataPromise
    tvlDaiRaw = "0"
    artToDaiRatio = "0"


    constructor (){
        makeAutoObservable(this)
        this.dataPromise = this.fetchGeneralDappData()
    }

    getIlkData () {
        return this.makerPriceFeed[makerStoreManager.currentStore] || {
            makerPriceFeedPrice: "",
            makerPriceFeedPriceNextPrice: "",
        }
    }

    async fetchGeneralDappData () {
        try{
            await this.fetchPrices()
            await this.fetchBTCPrices()
            await this.fetchTvl() // tvl requires the spot price
            await this.fetchstabilityFees()
        } catch (err) {
            console.error(err)
        }
    }

    async getTvlUsdNumeric () {
        await this.dataPromise
        return this.tvlUsdNumeric
    }

    async fetchTvl () {
        const web3 = new Web3(BP_API)
        let info = await B.getStats(web3, "1")
        this.tvlEth = parseFloat(web3.utils.fromWei(info.eth)).toFixed(1)
        this.tvlWbtc = parseFloat(web3.utils.fromWei(info.wbtc)).toFixed(2)
        this.tvlUsdNumeric = parseFloat(this.tvlEth * this.ethMarketPrice) + parseFloat(this.tvlWbtc * this.wbtcMarketPrice)
        this.tvlUsd = toCommmSepratedString(this.tvlUsdNumeric.toFixed(1))
        this.tvlDaiRaw = info.dai
        this.tvlDai = parseFloat(web3.utils.fromWei(info.dai)).toFixed(1)
        this.cdpi = info.cdpi
    }

    async fetchPrices () {
        let {data} = await axios.get('https://www.coinbase.com/api/v2/assets/prices/ethereum?base=USD')
        this.coinbaseLastUpdate = data.data.prices.latest_price.timestamp
        data = data.data.prices.latest
        this.spotPrice = parseFloat(data)
        this.ethMarketPrice = parseFloat(data).toFixed(2)
    }

    async fetchBTCPrices () {
        let {data} = await axios.get('https://www.coinbase.com/api/v2/assets/prices/bitcoin?base=USD')
        this.coinbaseLastUpdate = data.data.prices.latest_price.timestamp
        data = data.data.prices.latest
        this.wbtcMarketPrice = parseFloat(data).toFixed(2)
    }

    async fetchstabilityFees () {
        const {data} = await axios.get('https://defiexplore.com/api/stats/globalInfo')
        runInAction(()=> {
            makerStoreNames.forEach(name=>{
                const {stabilityFee} = data['tokenData'][name]
                this.stabilityFee.set(name, stabilityFee)
            })
            this.defiexploreLastUpdate = data['tokenData']["ETH-A"].updatedAt
            this.artToDaiRatio = data['tokenData']["ETH-A"].rate
            makerStoreNames.forEach(name=>{
                const ilkdData = data['tokenData'][name]
                this.makerPriceFeed[name] = {
                    makerPriceFeedPrice: parseFloat(ilkdData.price).toFixed(2),
                    makerPriceFeedPriceNextPrice: parseFloat(ilkdData.futurePrice).toFixed(2),
                }
            })
        })
    }
}

export default new MainStore()
