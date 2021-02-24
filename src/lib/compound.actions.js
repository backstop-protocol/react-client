/**
 * @format
 */
import { ApiAction } from "./ApiHelper";
import * as CI from "./compound.interface"
import userStore from "../stores/user.store"
import Web3 from "web3"
const {BN, toWei, fromWei} = Web3.utils

export const validateInput = (input) => {
    if (input <= 0) {
        throw new Error("Deposit amount must be positive")
    }
} 


const validateAllowance = (input, address) => {

}

const grantAllowance = (address) => {
    const {web3, networkType, user} = userStore
    const txPromise = CI.grantAllowance(web3, networkType, address, )
}