import { makeAutoObservable } from "mobx"
import * as B from "../lib/bInterface"
import * as ApiHelper from "../lib/ApiHelper";
import Web3 from "web3";
const BP_API = "https://bp-api.bprotocol.workers.dev"

const toCommmSepratedString = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

/**
 * Main Store is desigend for general purpose app data
 */
class MainStore {

    originalInfoResponse = null
    generalInfo = null
    jarBalanceEth = "--,---" //  default
    jarBalanceUsd = 10000 // dafult
    tvlUsd = "--,---" //  default
    tvlEth = "--,---" //  default
    tvlDai = "--,---"
    cdpi = 0
    spotPrice = null

    constructor (){
        makeAutoObservable(this)
        this.fetchGneralDappData()
    }

    async fetchGneralDappData () {
        await this.fetchJar()
        this.fetchTvl() // tvl requires the spot price
    }

    async fetchJar () {
        try{
            const web3 = new Web3(BP_API)
            let info = await B.getUserInfo(web3, "1", "0x0000000000000000000000000000000000000000")
            this.originalInfoResponse = info
            info = ApiHelper.Humanize(info, web3);
            this.spotPrice = info.miscInfo.spotPrice
            this.jarBalanceEth = parseFloat(info.userRatingInfo.jarBalance).toFixed(1);
            this.jarBalanceUsd = parseFloat(info.userRatingInfo.jarBalance * this.spotPrice).toFixed(0)
        }catch (err){
            console.error("failed to fatch jar amount")
        }
    }

    async fetchTvl () {
        try{
            const web3 = new Web3(BP_API)
            let info = await B.getStats(web3, "1")
            this.tvlEth = parseFloat(web3.utils.fromWei(info.eth)).toFixed(1)
            const tvlUsd = parseFloat(this.tvlEth * this.spotPrice).toFixed(0)
            this.tvlUsd = toCommmSepratedString(tvlUsd)
            this.tvlDai = parseFloat(web3.utils.fromWei(info.dai)).toFixed(1)
            this.cdpi = info.cdpi
        }catch (err){
            console.error("failed to fatch TVL")
        }
    }
}

export default new MainStore()
