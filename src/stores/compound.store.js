/**
 * @format
 */
import { runInAction, makeAutoObservable, observable } from "mobx"
import userStore from "./user.store"
import {getCompUserInfo } from "../lib/compound.interface"

class CompoundStore {

    userInfo
    userInfoTimeouts = []
    userInfoUpdate = 0

    unDepositedList = []
    depositedList = []
    unBorrowedList = []
    borrowedList = []

    despositedBalance
    borrowedBalance
    borrowLimit //TODO: use the colateral factor to sum the dsposited the deposited assets to get the borrow limit     

    constructor (){
        makeAutoObservable(this)
    }

    getUnDeposited = ({bUser, tokenInfo}) => Object.keys(bUser).filter(key => tokenInfo[key].listed && bUser[key].ctokenBalance === "0")
    getDeposited = ({bUser, tokenInfo}) => Object.keys(bUser).filter(key => tokenInfo[key].listed && bUser[key].ctokenBalance !== "0")
    getUnBorrowedList = ({bUser, tokenInfo}) => Object.keys(bUser).filter(key => tokenInfo[key].listed && bUser[key].ctokenBorrowBalance === "0")
    getborrowedList = ({bUser, tokenInfo}) => Object.keys(bUser).filter(key =>  tokenInfo[key].listed && bUser[key].ctokenBorrowBalance !== "0")

    fetchAndUpdateUserInfo = async () => {
        try {
            const { web3, networkType, user } = userStore
            let compUserInfo = await getCompUserInfo(web3, networkType, user)
            runInAction(()=> {

                this.userInfo = compUserInfo
                this.userInfoUpdate ++
                this.unDepositedList = this.getUnDeposited(compUserInfo)
                this.depositedList = this.getDeposited(compUserInfo)
                this.unBorrowedList = this.getUnBorrowedList(compUserInfo)
                this.borrowedList = this.getborrowedList(compUserInfo)
            })
            // const orgInfo = userInfo;
            // userInfo = ApiHelper.Humanize(userInfo, web3);
            // setUserInfo(user, web3, networkType, userInfo, orgInfo);
            // runInAction(()=>{
            //     this.userInfo = userInfo
            //     this.userInfoUpdate ++
            // })
        } catch (err) {
            console.log(err)
        }
    }

    getBuserTokenData = (address) => {
        if(!this.userInfo){
            return
        }
        return [this.userInfo.bUser[address], this.userInfo.tokenInfo[address]]
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
}

export default new CompoundStore()