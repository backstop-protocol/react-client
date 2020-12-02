import { makeAutoObservable, configure } from "mobx"
import * as B from "../lib/bInterface"
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

    constructor (){
        makeAutoObservable(this)
        this.fetchData()
    }

    async fetchData () {
        // todo
        const web3 = new Web3('https://bp-api.bprotocol.workers.dev')
        // const web3 = new Web3('https://bp-api.bprotocol.workers.dev/wrapper')
        const info = await B.getUserInfo(web3, '1', '0x0000000000000000000000000000000000000000')
        debugger
        this.originalInfoResponse = info
        // this is a patch to avoid the wired response object being parsed as an array
        const fixedInfoObj = {}
        Object.keys(info).forEach(key => {
            if(isNaN(key)){
                fixedInfoObj[key] = info[key]
            }
        })
        this.generalInfo = fixedInfoObj
    }
}

export default new MainStore()