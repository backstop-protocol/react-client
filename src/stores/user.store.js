/**
 * @format
 */
import { runInAction, makeAutoObservable } from "mobx"
import compoundStore from "./compound.store"
import makerStore from "./maker.store"
import routerStore from "./router.store"
import EventBus from "../lib/EventBus"

class UserStore {

    loggedIn = false
    web3
    networkType
    user
    displayConnect = false
    displayConnectTimeOut

    constructor (){
        makeAutoObservable(this)
    }

    async onConnect(web3, user) {
        const networkType = await web3.eth.net.getId()
        if(networkType != 42){
            EventBus.$emit("app-error","Only Kovan testnet is supported");
            return //exit
        }
        runInAction(()=> { 
          
            this.networkType = networkType
            this.web3 = web3;
            this.user = user
            this.loggedIn = true
            this.displayConnect = false
        })
        this.fetchUserInfoBasedOnRouter()
    }

    fetchUserInfoBasedOnRouter () {
        const page = routerStore.getRoute()

        if(page == "compound") {
            compoundStore.getUserInfo()
            return // exit
        }
        // defaults to maker
        makerStore.getUserInfo()
    }

    showConnect = () => {
        clearTimeout(this.displayConnectTimeOut)
        this.displayConnect = true
        this.displayConnectTimeOut = setTimeout(()=> this.displayConnect = false, 2000)
    }
}

export default new UserStore()