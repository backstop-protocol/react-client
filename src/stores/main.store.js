import { makeAutoObservable } from "mobx"
import * as B from "../lib/bInterface"
import * as ApiHelper from "../lib/ApiHelper";
import Web3 from "web3";

/**
 * Main Store is desigend for general purpose app data
 */
class MainStore {

    originalInfoResponse = null
    generalInfo = null
    jarBalanceEth = "--,---" //  default
    jarBalanceUsd = 10000 // dafult
    tvlUsd = 0
    tvlGraphData = [1, 2, 3, 4, 5, 6, 16, 26, 46, 106, 1016, ]
    userIsConnected = false

    constructor (){
        makeAutoObservable(this)
        this.fetchData()
    }

    async fetchData () {
        try{
            // const web3 = new Web3("https://bp-api.bprotocol.workers.dev")
            const web3 = new Web3("https://tight-bush-91a4.b-protocol.workers.dev")
            // const web3 = new Web3("http://api.bprotocol.org")
            let info = await B.getUserInfo(web3, "1", "0x0000000000000000000000000000000000000000")

            this.originalInfoResponse = info
            info = ApiHelper.Humanize(info, web3);
           
            this.jarBalanceEth = parseFloat(info.userRatingInfo.jarBalance).toFixed(1);
            this.jarBalanceUsd = parseFloat(info.userRatingInfo.jarBalance * info.miscInfo.spotPrice).toFixed(0)

        }catch (err){
            console.error("failed to fatch general stats")
        }
    }
}

export default new MainStore()
