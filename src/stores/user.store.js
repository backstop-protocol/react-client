/**
 * @format
 */
import { runInAction, makeAutoObservable } from "mobx"
import compoundStore from "./compound.store"
import makerStore from "./maker.store"
import routerStore from "./router.store"
import EventBus from "../lib/EventBus"
import Web3 from "web3"
import {genesisStore} from "../containers/GenesisClaim"

class UserStore {
    userAggresToTerms = false
    loggedIn = false
    web3
    networkType
    user = null
    displayConnect = false
    displayConnectTimeOut
    displayTermsRequired = false
    displayTermsRequiredTimeOut

    constructor (){
        makeAutoObservable(this)
    }

    aggreToTerms = () => {
        this.userAggresToTerms = true
        window.history.back()
    }

    showTermsRequiredBeforeConnect = () => {
        clearTimeout(this.displayTermsRequiredTimeOut)
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.displayTermsRequired = true
        this.displayTermsRequiredTimeOut = setTimeout(()=> this.displayTermsRequired = false, 3000)
    }

    userIsLoggedIn = () => !!this.user


    handleAccountsChanged = async (accounts) => {
        const user = accounts[0];    
        await this.onConnect(this.web3.utils.toChecksumAddress(user));// used by compound
    }

    connect = async () => {
        if (typeof window.ethereum == 'undefined') {
            // error bus
            EventBus.$emit("app-error", "Meta Mask is not connected");
            return false;
        }

        if (this.loggedIn) return false;
        if (this.userAggresToTerms  === false){
            this.showTermsRequiredBeforeConnect()
            return
        }

        this.web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

        this.networkType = await this.web3.eth.net.getId();
        if (parseInt(this.networkType) !== parseInt(0x2a) && parseInt(this.networkType) !== parseInt(0x1) && parseInt(this.networkType) !== 1337) {
            EventBus.$emit("app-error", "Only Mainnet and Kovan testnet are supported");
            return false;
        }

        window.ethereum.on('chainChanged', (_chainId) => window.location.reload());
        window.ethereum.on('accountsChanged', this.handleAccountsChanged)

        window.ethereum
            .request({ method: "eth_requestAccounts" })
            .then(this.handleAccountsChanged)
            .catch((err) => {
                if (err.code === 4001) {
                    // EIP-1193 userRejectedRequest error
                    // If this happens, the user rejected the connection request.
                    EventBus.$emit("app-error", "Please connect to Meta Mask");
                } else {
                    EventBus.$emit("app-error", err.message);
                }
            });
    };

    async onConnect(user) {
        const networkType = await this.web3.eth.net.getId()
        // if(networkType != 42 && ){
        //     EventBus.$emit("app-error","Only Kovan testnet is supported");
        //     return //exit
        // }
        runInAction(()=> { 
            this.networkType = networkType
            this.user = user
            this.loggedIn = true
            this.displayConnect = false
        })
        genesisStore.checkIfBproIsClaimed()
    }

    fetchUserInfoBasedOnRouter () {
        const page = routerStore.getRoute()
        if(page && page.indexOf("compound") > -1) {
            compoundStore.getUserInfo()
            return // exit
        }
        // defaults to maker
        makerStore.getUserInfo()
    }

    showConnect = () => {
        clearTimeout(this.displayConnectTimeOut)
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.displayConnect = true
        this.displayConnectTimeOut = setTimeout(()=> this.displayConnect = false, 3000)
    }

    connectionWarning = () => {
        this.loggedIn = false
        EventBus.$emit('app-alert', "something went wrong please try to reconnect", "reconnect", this.connect)
    }

    removeConnectionWarning = () => {
        EventBus.$emit('app-alert', "")
    }
}

export default new UserStore()