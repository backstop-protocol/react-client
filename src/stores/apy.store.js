import { runInAction, makeAutoObservable } from "mobx"
import mainStore from "../stores/main.store"
import mainCompStore from "../stores/main.comp.store"
import {makerStores} from "../stores/maker.store"
import compoundStore from "../stores/compound.store"
import {getCompounndTotalDebt} from "../lib/ScoreInterface"
import {ApiAction} from "../lib/ApiHelper"
import Web3 from "web3" 
import {BP_API} from "../common/constants"

const {toBN, fromWei, toWei} = Web3.utils
const _1e18 = toBN("10").pow(toBN("18"))

class ApyStore {

  totalDebt = "0"
  makerTotalDebt = "0"
  CompoundTotalDebt = "0"
  totalCollateral = "0"
  makerTotalCollateral = "0"
  compoundTotalCollateral = "0"
  userDebt = 0
  userCollateral = 0
  userBproMonthlyYeald = 0
  apy = "0"
  apyDataFetchErr = false
  totalUsers = "0"
  makerUsers = "0"
  compoundUsers = "0"

  constructor(){
    makeAutoObservable(this)
    this.initPromise = this.init()
  }

  onUserConnect = async () => {
    try{
      await this.initPromise
      await this.getUserCollateral()
      await this.getUserDebt()
      await this.calcApy()
    } catch (err){
      this.apyDataFetchErr = true
    }
  }

  getMakerDebt = async () => {
    let makerDebt = 0
    await Promise.all(Object.values(makerStores).map(store => store.userInfoPromise))
    Object.values(makerStores).forEach(store => {
      const userInfo = store.userInfo
      makerDebt += userInfo.bCdpInfo.daiDebt
    })
    return makerDebt.toString()
  }

  getUserDebt = async () => {
    const makerDebt = await this.getMakerDebt()
    await compoundStore.userInfoPromise
    const compoundDebt = compoundStore.totalBorrowedBalanceInUsd
    this.userDebt = (parseFloat(makerDebt) + parseFloat(compoundDebt)).toString()
  }

  getMakerColl = async() => {
    let makerColl = 0
    await Promise.all(Object.values(makerStores).map(store => store.userInfoPromise))
    Object.values(makerStores).forEach(store => {
      const userInfo = store.userInfo
      const ethDeposit = userInfo.bCdpInfo.ethDeposit.toString()
      const spotPrice = userInfo.miscInfo.spotPrice.toString()
      
      makerColl += (parseFloat(ethDeposit) * parseFloat(spotPrice))
    })
    return makerColl.toString()
  }

  getUserCollateral = async () => {
    const makerColl = await this.getMakerColl()
    await compoundStore.userInfoPromise
    const compoundColl = compoundStore.totalDespositedBalanceInUsd
    this.userCollateral = (parseFloat(makerColl) + parseFloat(compoundColl)).toString()
  }

  calcBproGrantForDebt = () => {
    const totalBproForDebtMonthly = (0)
    const userDebtRatio = parseFloat(this.userDebt)/parseFloat(this.totalDebt)
    const userMontlyBproReturnOnDebt = userDebtRatio * totalBproForDebtMonthly
    return userMontlyBproReturnOnDebt
  }

  calcBproGrantForCollateral = () => {
    const totalBproForCollateralMonthly = (0)
    const userCollateralRatio = parseFloat(this.userCollateral)/parseFloat(this.totalCollateral)
    const userMontlyBproReturnOnCollateral = userCollateralRatio * totalBproForCollateralMonthly
    return userMontlyBproReturnOnCollateral
    return userMontlyBproReturnOnCollateral
  }

  calcCompoundTotalDebt = async () => {
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
    this.apy = bproGrantForCollateral + bproGrantForDebt
  }

  getNumberOfUsers = async () =>{
    this.makerUsers = await mainStore.dataPromise.then(()=>mainStore.cdpi)
    this.compoundUsers = await mainCompStore.tvlPromise.then(()=>mainCompStore.compoundAccounts)

    runInAction(()=> {
      this.totalUsers = parseFloat(this.makerUsers)+ parseFloat(this.compoundUsers)
    })
  }

  init = async () => {
    try {
      this.getNumberOfUsers()
      const [makerTotalColl, makerTotalDebt, compoundTotalCollateral, compoundTotalDebt] = await Promise.all([
        mainStore.getTvlUsdNumeric(), 
        this.calcMakerTotalDebt(),
        mainCompStore.tvlPromise,
        this.calcCompoundTotalDebt()
      ])
      if(!makerTotalColl || !makerTotalDebt || !compoundTotalCollateral || !compoundTotalDebt || 
          makerTotalColl == 0 || makerTotalDebt == 0 || compoundTotalCollateral == 0 || compoundTotalDebt == 0){
        throw new Error("apyStore data fetch error")
      }
      
      runInAction(()=> {
        this.totalDebt = (parseFloat(makerTotalDebt) + parseFloat(compoundTotalDebt)).toString()
        this.totalCollateral = (makerTotalColl + compoundTotalCollateral).toString()
        this.makerTotalDebt = makerTotalDebt
        this.compoundTotalDebt = compoundTotalDebt
        this.makerTotalCollateral = makerTotalColl
        this.compoundTotalCollateral = compoundTotalCollateral
      })
    } catch (err){
      this.apyDataFetchErr = true
    }
  }
}

export default new ApyStore()