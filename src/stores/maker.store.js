/**
 * @format
 */
import { runInAction, makeAutoObservable, observable } from "mobx"
import {humanize, gemHumanize} from "../lib/ApiHelper";
import { setUserInfo } from "../lib/Actions";
import * as B from "../lib/bInterface";
import userStore from "./user.store"
import apyStore from "./apy.store"
import {isFinished} from "../lib/Utils"

class MakerStore {

    userInfo = null
    originalUserInfo
    userInfoTimeouts = []
    userInfoUpdate = 0
    userInfoPromise

    constructor (ilk, name){
        makeAutoObservable(this)
        this.name = name
        this.ilk = ilk
        this.symbol = name.split("-")[0]
        this.isGem = this.symbol !== "ETH"
    }

    fetchAndUpdateUserInfo = async () => {
        const { web3, networkType, user } = userStore
        let userInfo = await B.getUserInfo(web3, networkType, user, this.ilk);
        userInfo = this.renameUserInfoProps(userInfo)
        this.originalUserInfo = userInfo
        userInfo = this.isGem ? gemHumanize(userInfo) : humanize(userInfo)
        setUserInfo(user, web3, networkType, userInfo, this.originalUserInfo);
        this.userInfo = userInfo
        runInAction(()=>{
            this.userInfoUpdate ++
        })
        this.makerUserInfoUpdateSideAffects()
    }

    renameUserInfoProps = (userInfo) => {
        const newProps = {
            walletBalance: this.isGem ? userInfo.userWalletInfo.gemBalance : userInfo.userWalletInfo.ethBalance,
            collaeralDeposited: userInfo.bCdpInfo.ethDeposit
        }
        return Object.assign({}, userInfo, newProps)
    }

    // thin promise managmanet wrapper to the original getUserInfo
    getUserInfo = async () => {
        const promiseFinshed = this.userInfoPromise ? await isFinished(this.userInfoPromise) : true
        if(promiseFinshed){
            //create a new userInfo promise
            this.userInfoPromise = this._getUserInfo()
        }
        return this.userInfoPromise
    }

    /**
     * permits only four timeouts
     */
    _getUserInfo = async () => { 
        await this.fetchAndUpdateUserInfo()
        const timeouts = [1500, 5000, 19000, 30000]
        runInAction(()=>{
            this.userInfoTimeouts.forEach(clearTimeout) // clearing all timeouts
            this.userInfoTimeouts = timeouts.map(timeout => setTimeout(this.fetchAndUpdateUserInfo, timeout)) // setting 4 new one
        })
    }

    /**
     * use this action to update other stores
     */
    makerUserInfoUpdateSideAffects = () => {
        apyStore.onUserConnect()
    }
}

export const makerStores = {
    "ETH-A": new MakerStore("0x4554482d41000000000000000000000000000000000000000000000000000000", "ETH-A"),
    "WBTC-A": new MakerStore("0x574254432d410000000000000000000000000000000000000000000000000000", "WBTC-A"),
    "ETH-B": new MakerStore("0x4554482d42000000000000000000000000000000000000000000000000000000", "ETH-B"),
    "ETH-C": new MakerStore("0x4554482d43000000000000000000000000000000000000000000000000000000", "ETH-C")
}

export const makerStoreNames = Object.keys(makerStores)

class MakerStoreManager {

    currentStore = "ETH-A"
    storeChanges = 0

    constructor (){
        makeAutoObservable(this)
    }

    getAllUserInfo = () => {
        return Promise.all(Object.values(makerStores).map(store => store.getUserInfo()))
    }

    switchStore = (storeName) => {
        this.currentStore = storeName
        this.storeChanges++
        // fetch userInfo every time user switch tabs
        if(userStore.loggedIn){
            this.getMakerStore().getUserInfo() 
        }
    }

    getMakerStore = () => {
        const makerStore = makerStores[this.currentStore]
        return makerStore
    }
}

const makerStoreManager = new MakerStoreManager()

export default makerStoreManager