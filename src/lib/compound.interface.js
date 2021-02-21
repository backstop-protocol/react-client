/**
 * @format
 */
import { ABI } from "./compoundConfig/abi"
import { compUserInfoAbi } from "./compoundConfig/compUserInfoAbi"
import { compoundImportAbi } from "./compoundConfig/compoundImportAbi"
import { flashImportAbi } from "./compoundConfig/flashImportAbi"
import { registryAbi } from "./compoundConfig/registryAbi"
import { addresses as kovanAddresses } from "./compoundConfig/kovanAddress"
import Web3 from "web3"

const {toBN, toWei, fromWei} = Web3.utils

const compUserInfoAddress = "0xf0f2e5aa370e33ebbea467c568cb9d018c9e9916" 
export const maximum = "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
const bComptrollerAddress = "0x16f56Cda8741613348257b82D28008E6CfC20D84"
const registryAddress = "0x0704aa791bAC1Bf3195a608240E6a8F9E4F63E5F"
const sugerDady = "0xA1A343B4245e4364e6b9c4574F9F7A3C1D849Ad6"
const compoundImportAddress = "0x3545a9AB6a57B1172690769175A3242a644f1574"
const flashImportAddress = "0xF9fa648c46bb1e1f249ABA973397077CDc20fC78"
const jarConnector = "0x061133BE90f97B6Eb7f73eD9Dc50eFB1DD96ED72"
const jar = "0x18DB5F7711d57974d825f9ca45D21627353bEb72"

export const getAddress = (name, networkId) => {
  const addresses = networkId == 42 ? kovanAddresses : {}
  return addresses[name]
}

export const depositEth = (web3, networkId, cEthAddress) => {
  const { Contract } = web3.eth
  const cETH = new Contract(ABI.cETH, cEthAddress)
  return cETH.methods.mint()
}

export const depositToken = (web3, networkId, tokenAddress, amount) => {
  const { Contract } = web3.eth
  const cToken = new Contract(ABI.cToken, tokenAddress)
  return cToken.methods.mint(amount)
}

export const enterMarket = (web3, networkId, tokenAddresses) => {
  const { Contract } = web3.eth
  const comptrollerAddress = getAddress("Comptroller", networkId)
  const comptroller = new Contract(ABI.Comptroller, comptrollerAddress)
  return comptroller.methods.enterMarkets(tokenAddresses)
}

export const getOpenMarkets = (web3, networkId, user) => {
  const { Contract } = web3.eth
  const comptrollerAddress = getAddress("Comptroller", networkId)
  const comptroller = new Contract(ABI.Comptroller, comptrollerAddress)
  return comptroller.methods.getAssetsIn(user).call()
}

export const borrowEth = (web3, networkId, amount, cEthAddress) => {
  const { Contract } = web3.eth
  const cEth = new Contract(ABI.cETH, cEthAddress)
  return cEth.methods.borrow(amount)
}

export const borrowToken = (web3, networkId, amount, tokenAddress) => {
  const { Contract } = web3.eth
  const cToken = new Contract(ABI.cToken, tokenAddress)
  return cToken.methods.borrow(amount)
}

export const repayEth = (web3, networkId, cEthAddress) => {
  const { Contract } = web3.eth
  const cETH = new Contract(ABI.cETH, cEthAddress)
  return cETH.methods.repayBorrow()
}

export const repayToken = (web3, networkId, amount, tokenAddress) => {
  const { Contract } = web3.eth
  const cToken = new Contract(ABI.cToken, tokenAddress)
  return cToken.methods.repayBorrow(amount)
}

export const withdrawEth = (web3, networkId, amount, cEthAddress) => {
  const { Contract } = web3.eth
  const cETH = new Contract(ABI.cETH, cEthAddress)
  return cETH.methods.redeemUnderlying(amount)
}

export const withdraw = (web3, networkId, amount, tokenAddress) => {
  const { Contract } = web3.eth
  const cToken = new Contract(ABI.cToken, tokenAddress)
  return cToken.methods.redeemUnderlying(amount)
}

export const grantAllowance = (web3, networkId, spender, token, allowance = maximum) => {
  const { Contract } = web3.eth
  const erc20Token = new Contract(ABI.erc20, token)
  return erc20Token.methods.approve(spender, allowance)
}

export const calcUnderlyingDepositBalance = (cTokenAddress, compUserInfo) => {
  const { ctokenExchangeRate: cTokenExchangeRate } = compUserInfo.tokenInfo[cTokenAddress]
  const { ctokenBalance: cTokenBalance } = compUserInfo.bUser[cTokenAddress]
  const underlyingBalance = toBN(cTokenBalance).mul(toBN(cTokenExchangeRate))
  return underlyingBalance.div(toBN(toWei("1"))) // dividing by 1e18 in order to clean the number from fractions
}

export const normlizeCompUserInfo = (userInfo, networkId) => {
  const normalized = {
    tokenInfo: {},
    cUser: {},
    bUser: {},
    importInfo: {},
    jarInfo: {},
    tvlInfo: {},
    compTokenInfo: {},
    scoreInfo: {}
  }
  const tokens = userInfo.tokenInfo.btoken
  for (let i = 0; i < tokens.length; i++) {
    const address = tokens[i]

    Object.keys(normalized).forEach((prop) => {
      normalized[prop][address] = {}
      Object.keys(userInfo[prop])
        .filter((k) => isNaN(k)) // removing numerical strings
        .forEach((key) => {
          normalized[prop][address][key] = Array.isArray(userInfo[prop][key]) ? userInfo[prop][key][i] : userInfo[prop][key]
        })
    })
  }
  // debugger
  // console.log("normalized", normalized)
  return normalized
}

export const getCompUserInfo = async (web3, networkId, user) => {
  const { Contract } = web3.eth
  const userInfoContract = new Contract(compUserInfoAbi, compUserInfoAddress)
  const comptroller = getAddress("Comptroller", networkId)
  const userInfoTx = userInfoContract.methods.getUserInfo(user, comptroller, bComptrollerAddress, registryAddress, sugerDady, jarConnector, jar)
  const userInfo = await userInfoTx.call({ gasLimit: "10000000" })
  // debugger
  // console.log("userInfo", userInfo)
  return normlizeCompUserInfo(userInfo)
}

export const increaseABit = (number) => {
  return parseInt(1.2 * Number(number))
}

export const gasCalc = async (networkId, transaction, transactionArgs) => {
  return increaseABit(await transaction.estimateGas(transactionArgs))
}

export const importFormCompoundToBProtocol = ()=> {

}

export const importCollateral = (web3, networkId, cTokens) => {
  const { Contract } = web3.eth
  const importContract = new Contract(compoundImportAbi, compoundImportAddress)
  const importData = importContract.methods.importCollateral(cTokens).encodeABI()
  const registryContract = new Contract(registryAbi, registryAddress)
  return registryContract.methods.delegateAndExecuteOnce(compoundImportAddress, compoundImportAddress, importData)
}

export const importDebt = (web3, networkId, supplyCTokens, supplyUnderlying, borrowCTokens, borrowUnderlying) => {
  const { Contract } = web3.eth
  const importContract = new Contract(compoundImportAbi, compoundImportAddress)
  // const importData = importContract.methods.importAccount(supplyCTokens, supplyUnderlying, borrowCTokens, borrowUnderlying).encodeABI()
  const flashImportContract = new Contract(flashImportAbi, flashImportAddress)
  const flashImportData = flashImportContract.methods.flashImport(supplyCTokens, supplyUnderlying, borrowCTokens, borrowUnderlying, compoundImportAddress, toWei("10"), sugerDady).encodeABI()
  const registryContract = new Contract(registryAbi, registryAddress)
  return registryContract.methods.delegateAndExecuteOnce(compoundImportAddress, flashImportAddress, flashImportData)
}

export const claimComp = (web3, networkId, user) => {
  const { Contract } = web3.eth
  const bComptrollerContract = new Contract(ABI.Comptroller, bComptrollerAddress)
  return bComptrollerContract.methods.claimComp(user)
}