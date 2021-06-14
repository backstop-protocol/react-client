import { makeAutoObservable, runInAction } from "mobx"
import * as B from "../lib/bInterface"
import * as ApiHelper from "../lib/ApiHelper"
import Web3 from "web3"
import axios from "axios"
import {toCommmSepratedString} from "../lib/Utils"
import {makerStoreNames} from "./maker.store"
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
    makerPriceFeedPrice = ""
    makerPriceFeedPriceNextPrice = ""
    defiexploreLastUpdate = ""
    stabilityFee = new Map()
    ethMarketPrice = ""
    btcMarketPrice = ""
    coinbaseLastUpdate
    dataPromise
    tvlDaiRaw = "0"
    artToDaiRatio = "0"


    constructor (){
        makeAutoObservable(this)
        this.dataPromise = this.fetchGeneralDappData()
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
        const btcPricePromise = axios.get('https://www.coinbase.com/api/v2/assets/prices/bitcoin?base=USD')
        let {data} = await axios.get('https://www.coinbase.com/api/v2/assets/prices/ethereum?base=USD')
        this.coinbaseLastUpdate = data.data.prices.latest_price.timestamp
        data = data.data.prices.latest
        this.spotPrice = parseFloat(data)
        this.ethMarketPrice = parseFloat(data).toFixed(2)
        const data2 = await btcPricePromise
        this.btcMarketPrice = parseFloat(data2.data.data.prices.latest).toFixed(2)

    }

    async fetchBTCPrices () {
        let {data} = await axios.get('https://www.coinbase.com/api/v2/assets/prices/bitcoin?base=USD')
        this.coinbaseLastUpdate = data.data.prices.latest_price.timestamp
        data = data.data.prices.latest
        this.wbtcMarketPrice = parseFloat(data).toFixed(2)
    }

    async fetchstabilityFees () {
        let {data} = await axios.get('https://defiexplore.com/api/stats/globalInfo')
        runInAction(()=> {
            makerStoreNames.forEach(name=>{
                const {stabilityFee} = data['tokenData'][name]
                this.stabilityFee.set(name, stabilityFee)
            })
            data = data['tokenData']["ETH-A"]
            this.makerPriceFeedPrice = parseFloat(data.price).toFixed(2)
            this.makerPriceFeedPriceNextPrice = parseFloat(data.futurePrice).toFixed(2)
            this.defiexploreLastUpdate = data.updatedAt
            this.artToDaiRatio = data.rate
        })
    }
}

export default new MainStore()
