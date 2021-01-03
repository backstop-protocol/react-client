/**
 * @format
 */
import { ABI } from "./compoundConfig/abi"
import { compUserInfoAbi } from "./compoundConfig/compUserInfoAbi"
import { addresses as kovanAddresses } from "./compoundConfig/kovanAddress"

const { Contract } = web3.eth
const compUserInfoAddress = "0x48c380b79F3Ac7B7DA43e76A742d2AC5235439D4"
const maximum = "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"

export const getAddress = (name, networkId) => {
  const networkAddresses = networkId == 42 ? kovanAddresses : {}
  const { Contracts } = networkAddresses
  const address = Contracts[name]
  return address
}

export const depositEth = (web3, networkId) => {
  const cEthAddress = getAddress("cETH", networkId)
  const cETH = new Contract(ABI.cETH, cEthAddress)
  return cETH.methods.mint()
}

export const depositToken = (web3, networkId, tokenAddress, amount) => {
  const cToken = new Contract(ABI.cToken, tokenAddress)
  return cToken.methods.mint(amount)
}

export const enterMarket = (web3, networkId, tokenAddresses) => {
  const comptrollerAddress = getAddress("Comptroller", networkId)
  const comptroller = new Contract(ABI.Comptroller, comptrollerAddress)
  return comptroller.methods.enterMarkets(tokenAddresses)
}

export const getOpenMarkets = (web3, networkId, user) => {
  const comptrollerAddress = getAddress("Comptroller", networkId)
  const comptroller = new Contract(ABI.Comptroller, comptrollerAddress)
  return comptroller.methods.getAssetsIn(user).call()
}

export const borrowEth = (web3, networkId, amount) => {
  const cEthAddress = getAddress("cETH", networkId)
  const cEth = new Contract(ABI.cETH, cEthAddress)
  return cEth.methods.borrow(amount)
}

export const borrowToken = (web3, networkId, amount, tokenAddress) => {
  const cToken = new Contract(ABI.cToken, tokenAddress)
  return cToken.methods.borrow(amount)
}

export const repayEth = (web3, networkId) => {
  const cEthAddress = getAddress("cETH", networkId)
  const cETH = new Contract(ABI.cETH, cEthAddress)
  return cETH.methods.repayBorrow()
}

export const repayToken = (web3, networkId, amount, tokenAddress) => {
  const cToken = new Contract(ABI.cToken, tokenAddress)
  return cToken.methods.repayBorrow(amount)
}

export const withdrawEth = (web3, networkId, amount) => {
  const cEthAddress = getAddress("cETH", networkId)
  const cETH = new Contract(ABI.cETH, cEthAddress)
  return cETH.methods.redeemUnderlying(amount)
}

export const withdraw = (web3, networkId, amount, tokenAddress) => {
  const cToken = new Contract(ABI.cToken, tokenAddress)
  return cToken.methods.redeemUnderlying(amount)
}

export const grantAllowance = (web3, networkId, cTokenAddress, uderlying, allowance = maximum) => {
  const erc20Token = new Contract(ABI.erc20, uderlying)
  return erc20Token.methods.approve(cTokenAddress, allowance)
}

export const normlizeCompUserInfo = (userInfo, networkId) => {
  const normalized = {
    tokenInfo: {},
    cUser: {},
    bUser: {}
  }
  const tokens = userInfo.tokenInfo.btoken
  for (let i = 0; i < tokens.length; i++) {
    const address = tokens[i]

    Object.keys(normalized).forEach((prop) => {
      normalized[prop][address] = {}
      Object.keys(userInfo[prop])
        .filter((k) => isNaN(k)) // removing numerical strings
        .forEach((key) => {
          normalized[prop][address][key] = userInfo[prop][key][i]
        })
    })
  }
  return normalized
}

export const getCompUserInfo = async (web3, networkId, user) => {
  const userInfoContract = new Contract(compUserInfoAbi, compUserInfoAddress)
  debugger
  const comptroller = getAddress("Comptroller", networkId)
  const userInfoTx = userInfoContract.methods.getUserInfo(user, comptroller)
  const gasLimit = await gasCalc(networkId, userInfoTx, {})
  const userInfo = await userInfoTx.call({ gasLimit })
  return normlizeCompUserInfo(userInfo)
}

export const increaseABit = (number) => {
  return parseInt(1.2 * Number(number))
}

export const gasCalc = async (networkId, transaction, transactionArgs) => {
  // if (networkId == 42) {
  // 	return "4000000"
  // }
  return increaseABit(await transaction.estimateGas(transactionArgs))
}
