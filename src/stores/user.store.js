/**
 * @format
 */
import { runInAction, makeAutoObservable } from "mobx"

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
        runInAction(()=> { 
            this.networkType = networkType
            this.web3 = web3;
            this.user = user
            this.loggedIn = true
            this.displayConnect = false
        })
    }

    showConnect = () => {
        clearTimeout(this.displayConnectTimeOut)
        this.displayConnect = true
        this.displayConnectTimeOut = setTimeout(()=> this.displayConnect = false, 2000)
    }
}

export default new UserStore()