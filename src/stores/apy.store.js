import { runInAction, makeAutoObservable } from "mobx"
import mainStore from "../stores/main.store"
import mainCompStore from "../stores/main.comp.store"
import makerStore from "../stores/maker.store"
import compoundStore from "../stores/compound.store"
import {getCompounndTotalDebt} from "../lib/ScoreInterface"
import {ApiAction} from "../lib/ApiHelper"
import Web3 from "web3"

const {toBN, fromWei, toWei} = Web3.utils
const _1e18 = toBN("10").pow(toBN("18"))

const BP_API = "https://eth-node.b-protocol.workers.dev"

class ApyStore {

  totalDebt = 0
  totalCollateral = 0
  userDebt = 0
  userCollateral = 0
  userBproMonthlyYeald = 0
  apy

  constructor(){
    makeAutoObservable(this)
    this.initPromise = this.init()
  }

  onUserConnect = async () => {
    await this.initPromise
    await this.getUserCollateral()
    await this.getUserDebt()
    await this.calcApy()
  }

  getUserDebt = async () => {
    const {userInfo} = makerStore
    const makerDebt = userInfo.bCdpInfo.daiDebt.toString()
    const compoundDebt = compoundStore.totalBorrowedBalanceInUsd
    debugger
    this.userDebt = fromWei(toBN(toWei(makerDebt)).add(toBN(toWei(compoundDebt))).toString())
  }

  getUserCollateral = async () => {
    const {userInfo} = makerStore
    const ethDeposit = userInfo.bCdpInfo.ethDeposit.toString()
    const spotPrice = userInfo.miscInfo.spotPrice.toString()
    
    const makerColl = fromWei((toBN(toWei(ethDeposit)).mul(toBN(toWei(spotPrice)))).div(_1e18).toString())
    const compoundColl = compoundStore.totalDespositedBalanceInUsd
    debugger
    this.userCollateral = fromWei(toBN(toWei(makerColl)).add(toBN(toWei(compoundColl))).toString())
  }

  calcBproGrantForDebt = () => {
    const totalBproForDebtMonthly = (200000/3)
    const userDebtRatio = parseFloat(this.userDebt)/parseFloat(this.totalDebt)
    const userMontlyBproReturnOnDebt = userDebtRatio * totalBproForDebtMonthly
    return userMontlyBproReturnOnDebt
  }

  calcBproGrantForCollateral = () => {
    const totalBproForCollateralMonthly = (50000/3)
    const userCollateralRatio = parseFloat(this.userCollateral)/parseFloat(this.totalCollateral)
    const userMontlyBproReturnOnCollateral = userCollateralRatio * totalBproForCollateralMonthly
    debugger
    return userMontlyBproReturnOnCollateral
  }

  calcCompoundTotalDebt = async () => {
    try{
      const tokenAddresses = await mainCompStore.getTokenList()
      const web3 = new Web3(BP_API)
      const tvlInfo = await getCompounndTotalDebt(web3, tokenAddresses)
      let totalDebt = toBN("0")
      tvlInfo.ctokenBorrow.map((debt, index)=> {
        const coin = mainCompStore.coinMap[tokenAddresses[index]]
        const borrowed = coin.getBorrowed(debt)
        const debtInUsd = coin.getBorrowedInUsd(borrowed)
        totalDebt = totalDebt.add(toBN(toWei(debtInUsd)))
      })
      const res = fromWei(totalDebt.toString())
      return res

    }catch (err){
      console.error(err, "shmuel")
    }
  }
  
  calcMakerTotalDebt = async () => {
    // div(10 pow 27)
    await mainStore.dataPromise
    const daiDebt = mainStore.tvlDaiRaw
    const artToDaiRatio = mainStore.artToDaiRatio
    const _10pow27 = toBN("10").pow(toBN("27"))
    const res = fromWei(((toBN(daiDebt).mul(toBN(artToDaiRatio))).div(_10pow27)).toString())
    return res
  }

  calcApy = async () => {
    const bproGrantForCollateral = this.calcBproGrantForCollateral()
    const bproGrantForDebt = this.calcBproGrantForDebt()
    debugger
    this.apy = bproGrantForCollateral + bproGrantForDebt
  }

  init = async () => {
    const makerTotalColl = await mainStore.getTvlUsdNumeric()
    const makerTotalDebt = await this.calcMakerTotalDebt()
    const compoundTotalCollateral = await mainCompStore.tvlPromise
    const compoundTotalDebt = await this.calcCompoundTotalDebt()
    
    this.totalDebt = fromWei(toBN(toWei(makerTotalDebt)).add(toBN(toWei(compoundTotalDebt))).toString())
    debugger
    this.totalCollateral = fromWei(toBN(toWei(makerTotalColl.toString())).add(toBN(toWei(compoundTotalCollateral.toString()))).toString())
  }
}

export default new ApyStore()