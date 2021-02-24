/**
 * @format
 */
import { ABI } from "./compoundConfig/abi"
import { compUserInfoAbi } from "./compoundConfig/compUserInfoAbi"
import { compoundImportAbi } from "./compoundConfig/compoundImportAbi"
import { flashImportAbi } from "./compoundConfig/flashImportAbi"
import { registryAbi } from "./compoundConfig/registryAbi"
import { addresses as kovanAddresses } from "./compoundConfig/kovanAddress"
import { addresses as mainnetAddresses } from "./compoundConfig/mainnetAddress"
import Web3 from "web3"

export const maximum = "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
const {toBN, toWei, fromWei} = Web3.utils

export const getAddress = (name, networkId) => {
  const addresses = networkId == 42 ? kovanAddresses : mainnetAddresses
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

export const repayToken = (web3, networkId, amount, tokenAddress, repayAll) => {
  const { Contract } = web3.eth
  const cToken = new Contract(ABI.cToken, tokenAddress)
  if(repayAll){
    amount = maximum
  }
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

export const withdrawMax = (web3, networkId, amount, tokenAddress) => {
  const { Contract } = web3.eth
  const cToken = new Contract(ABI.cToken, tokenAddress)
  return cToken.methods.redeem(amount)
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

export const getCompUserInfo = async (web3, networkId, user, getTvl = false) => {
  const { Contract } = web3.eth
  const compUserInfoAddress = getAddress("compUserInfoAddress", networkId)
  const bComptrollerAddress = getAddress("bComptrollerAddress", networkId)
  const registryAddress = getAddress("registryAddress", networkId)
  const sugerDady = getAddress("sugerDady", networkId)
  const jarConnector = getAddress("jarConnector", networkId)
  const jar = getAddress("jar", networkId)
  const userInfoContract = new Contract(compUserInfoAbi, compUserInfoAddress)
  const comptroller = getAddress("Comptroller", networkId)
  const userInfoTx = userInfoContract.methods.getUserInfo(user, comptroller, bComptrollerAddress, registryAddress, sugerDady, jarConnector, jar, getTvl)
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

export const importCollateral = (web3, networkId, cTokens) => {
  const { Contract } = web3.eth
  const compoundImportAddress = getAddress("compoundImportAddress", networkId)
  const registryAddress = getAddress("registryAddress", networkId)
  const importContract = new Contract(compoundImportAbi, compoundImportAddress)
  const importData = importContract.methods.importCollateral(cTokens).encodeABI()
  const registryContract = new Contract(registryAbi, registryAddress)
  return registryContract.methods.delegateAndExecuteOnce(compoundImportAddress, compoundImportAddress, importData)
}

export const importDebt = (web3, networkId, supplyCTokens, supplyUnderlying, borrowCTokens, borrowUnderlying, flashLoanMax) => {
  const { Contract } = web3.eth
  const compoundImportAddress = getAddress("compoundImportAddress", networkId)
  const flashImportAddress = getAddress("flashImportAddress", networkId)
  const sugerDady = getAddress("sugerDady", networkId)
  const registryAddress = getAddress("registryAddress", networkId)
  const importContract = new Contract(compoundImportAbi, compoundImportAddress)
  const flashImportContract = new Contract(flashImportAbi, flashImportAddress)
  const flashImportData = flashImportContract.methods.flashImport(supplyCTokens, supplyUnderlying, borrowCTokens, borrowUnderlying, compoundImportAddress, flashLoanMax, sugerDady).encodeABI()
  const registryContract = new Contract(registryAbi, registryAddress)
  return registryContract.methods.delegateAndExecuteOnce(compoundImportAddress, flashImportAddress, flashImportData)
}

export const claimComp = (web3, networkId, user) => {
  const { Contract } = web3.eth
  const bComptrollerAddress = getAddress("bComptrollerAddress", networkId)
  const bComptrollerContract = new Contract(ABI.Comptroller, bComptrollerAddress)
  return bComptrollerContract.methods.claimComp(user)
}