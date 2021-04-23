/**
 * @format
 */
import { runInAction, makeAutoObservable, observable } from "mobx"
import * as ApiHelper from "../lib/ApiHelper";
import { setUserInfo } from "../lib/Actions";
import * as B from "../lib/bInterface";
import userStore from "./user.store"
import makerVoteStore from "./makerVote.store"

class MakerStore {

    userInfo = null
    userInfoTimeouts = []
    userInfoUpdate = 0

    constructor (){
        makeAutoObservable(this)
    }

    fetchAndUpdateUserInfo = async () => {
        try {
            const { web3, networkType, user } = userStore
            let userInfo = await B.getUserInfo(web3, networkType, user);
            const orgInfo = userInfo;
            userInfo = ApiHelper.Humanize(userInfo, web3);
            setUserInfo(user, web3, networkType, userInfo, orgInfo);
            runInAction(()=>{
                this.userInfo = userInfo
                this.userInfoUpdate ++
                this.makerUserInfoUpdateSideAffects()
            })
        } catch (err) {
            console.log(err)
        }
    }

    /**
     * permits only four timeouts
     */
    getUserInfo = async () => { 
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
        makerVoteStore.getUserInfoDependentData()
    }
}

export default new MakerStore()