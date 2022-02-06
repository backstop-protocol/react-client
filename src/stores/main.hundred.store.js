import { makeAutoObservable, runInAction } from "mobx"
import axios from "axios"

/**
 * Main Store is desigend for general purpose app data
 */
class MainHundredStore {

    hundredTvlFantom = 0
    hundredTvlArbitrum = 0

    get TVL(){
        return this.hundredTvlFantom + this.hundredTvlArbitrum
    }

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
        try{
            const {data} = await axios.get('https://api.llama.fi/protocol/b.protocol')
            const {currentChainTvls} = data
            this.hundredTvlArbitrum = currentChainTvls.Arbitrum
            this.hundredTvlFantom = currentChainTvls.Fantom
        } catch (err) {
            console.error(err)
        }
    }
}

export default new MainHundredStore()
