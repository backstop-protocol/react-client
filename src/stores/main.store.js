import { makeAutoObservable, configure } from "mobx"
import * as B from "../lib/bInterface"
import * as ApiHelper from "../lib/ApiHelper";
import Web3 from "web3";

configure({
    useProxies: "never"
})

/**
 * Main Store is desigend for general purpose app data
 */
class MainStore {

    originalInfoResponse = null
    generalInfo = null
    jarBalanceEth = 0 //  default
    jarBalanceUsd = 10000 // dafult

    constructor (){
        makeAutoObservable(this)
        this.fetchData()
    }

    async fetchData () {
        try{
            const web3 = new Web3('https://bp-api.bprotocol.workers.dev')
            // const web3 = new Web3('https://bp-api.bprotocol.workers.dev/wrapper')
            let info = await B.getUserInfo(web3, '1', '0x0000000000000000000000000000000000000000')
            debugger
            this.originalInfoResponse = info
            info = ApiHelper.Humanize(info, web3);
            // this is a patch to avoid the wired response object being parsed as an array
            const fixedInfoObj = {}
            Object.keys(info).forEach(key => {
                if(isNaN(key)){
                    fixedInfoObj[key] = info[key]
                }
            })
            this.generalInfo = fixedInfoObj
            
            this.jarBalanceEth = parseFloat(info.userRatingInfo.jarBalance).toFixed(1);
            this.jarBalanceUsd = parseFloat(info.userRatingInfo.jarBalance * info.miscInfo.spotPrice).toFixed(0)
        }catch (err){
            console.error('failed to fatch general stats')
        }
    }
}

export default new MainStore()