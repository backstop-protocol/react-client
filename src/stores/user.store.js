/**
 * @format
 */
import React, {Component} from "react";
import { runInAction, makeAutoObservable } from "mobx"
import compoundStore from "./compound.store"
import makerStoreManager from "./maker.store"
import routerStore from "./router.store"
import EventBus from "../lib/EventBus"
import Web3 from "web3"
import bproStore, {uBproStore} from "./bpro.store"
import apyStore from "./apy.store"
import instaStore from "./insta.store"
import WalletConnectProvider from "@walletconnect/web3-provider";
import {walletTypes, getMetaMask, getWalletConnect} from "../wallets/Wallets"
import WalletSelectionModal from "../components/modals/WalletSelectionModal"

const supportedNetworks = {
    "1": "Mainnet",
    "42": "Kovan",
    "421611": "Arbitrum Testnet",
    "1137": "Hardhat"
}

class UserStore {

    loggedIn = false
    web3
    networkType
    user = ""
    displayConnect = false
    displayConnectTimeOut
    walletType = null
    provider
    connecting = false

    constructor (){
        makeAutoObservable(this)
    }

    selectWallet = async () => {
        return new Promise((resolve, reject) =>{
            this.walletSelectionResult = null
            const noWrapper = true
            EventBus.$emit('show-modal', <WalletSelectionModal/>, noWrapper);
            EventBus.$on('close-modal', ()=>{
                if(this.walletSelectionResult){
                    this.walletType = this.walletSelectionResult
                    resolve()
                } else {
                    reject(new Error("no wallet selection"))
                }
            })
        })

    }

    handleAccountsChanged = async (accounts) => {
        const user = accounts[0];    
        await this.onConnect(this.web3.utils.toChecksumAddress(user));// used by compound
    }

    connect = async (newConnection = true) => { 
        this.connecting = true
        try{
            if(newConnection){
                await this.selectWallet()
            }
            
            let wallet
            if(this.walletType === walletTypes.META_MASK){
                wallet = await getMetaMask(newConnection)
            } else if (this.walletType === walletTypes.WALLET_CONNECT){
                wallet = await getWalletConnect(newConnection)
            }
            this.web3 = wallet.web3
            this.provider = wallet.provider
            // connecting
            const userAccount = await wallet.connectFn()
            this.onConnect(this.web3.utils.toChecksumAddress(userAccount))
            // setting event listeners
            this.provider.on('chainChanged', (_chainId) => window.location.reload());
            this.provider.on('accountsChanged', this.handleAccountsChanged)
        } catch (e) {
            if(e.message === "no wallet selection"){
                return
            }
            console.error(e)
        }
        finally {
            this.connecting = false
        }
    }

    autoConnect = async () => {
        // read from the localstorage the wallet type
        this.walletType = window.localStorage.getItem("walletType")
        if(!this.walletType){
            return // exit
        }
        // try to establish a connection to the previously connected wallet
        const newConnection = false // overrides the default behavior that would try to establish a new connection
        this.connect(newConnection)
    }

    async onConnect(user) {
        // save connection data to local storage
        window.localStorage.setItem("walletType", this.walletType)
        const networkType = await this.web3.eth.net.getId()
        debugger
        if (!supportedNetworks[networkType.toString()]) {
            EventBus.$emit("app-error", "Only Mainnet and Kovan testnet are supported");
            return false;
        }
        runInAction(()=> { 
            this.networkType = networkType
            this.user = user
            this.loggedIn = true
            this.displayConnect = false
        })
        this.userInfosPromise = this.fetchUserInfos()
        await this.userInfosPromise
        bproStore.onUserConnect()
        uBproStore.onUserConnect()
        apyStore.onUserConnect()
        instaStore.onUserConnect()
    }

    fetchUserInfos () {
        return Promise.all([
            makerStoreManager.getAllUserInfo(),
            compoundStore.getUserInfo(),
        ])
    }

    showConnect = () => {
        clearTimeout(this.displayConnectTimeOut)
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.displayConnect = true
        this.displayConnectTimeOut = setTimeout(()=> this.displayConnect = false, 3000)
    }

    connectionWarning = () => {
        this.loggedIn = false
        if(window.location.pathname != "/compound"){
            this.removeConnectionWarning()
            return
        }
        EventBus.$emit('app-alert', "something went wrong please try to reconnect", "reconnect", this.connect)
    }

    removeConnectionWarning = () => {
        EventBus.$emit('app-alert', "")
    }
}

const userStore = new UserStore()

userStore.autoConnect()

export default userStore