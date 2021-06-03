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
import bproStore from "./bpro.store"
import apyStore from "./apy.store"
import WalletConnectProvider from "@walletconnect/web3-provider";
import {walletTypes, getMetaMask, getWalletConnect} from "../wallets/Wallets"
import WalletSelectionModal from "../components/modals/WalletSelectionModal"

class UserStore {

    loggedIn = false
    web3
    networkType
    user
    displayConnect = false
    displayConnectTimeOut
    walletType = null
    provider

    constructor (){
        makeAutoObservable(this)
    }

    selectWallet = async () => {
        return new Promise((resolve, reject) =>{
            const noWrapper = true
            EventBus.$emit('show-modal', <WalletSelectionModal/>, noWrapper);
            EventBus.$on('close-modal', resolve)
        })

    }

    handleAccountsChanged = async (accounts) => {
        const user = accounts[0];    
        await this.onConnect(this.web3.utils.toChecksumAddress(user));// used by compound
    }

    connect = async () => { 
        try{
            if (this.loggedIn) return false;

            await this.selectWallet()
            if(!this.walletType) return false
            
            let wallet
            if(this.walletType === walletTypes.META_MASK){
                wallet = getMetaMask()
            } else if (this.walletType === walletTypes.WALLET_CONNECT){
                wallet = getWalletConnect()
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
            console.error(e)
        }
    };

    async onConnect(user) {
        const networkType = await this.web3.eth.net.getId()
        if (parseInt(networkType) !== parseInt(0x2a) && parseInt(networkType) !== parseInt(0x1) && parseInt(networkType) !== 1337) {
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
        apyStore.onUserConnect()
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
        EventBus.$emit('app-alert', "something went wrong please try to reconnect", "reconnect", this.connect)
    }

    removeConnectionWarning = () => {
        EventBus.$emit('app-alert', "")
    }
}

export default new UserStore()