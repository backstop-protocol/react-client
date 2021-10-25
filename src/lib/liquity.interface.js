/**
 * @format
 */
import { ABI } from "./liquityConfig/abi"
import { addresses as mainnetAddresses } from "./liquityConfig/mainnetAddress"
import Web3 from "web3"
const {toBN, fromWei, toWei} = Web3.utils

// todo balancOf(userAddress).div(totalSuply)

export const getBamms = async (web3, networkId) => {
  const { Contract } = web3.eth
  const bammKeeper = new Contract(ABI.bammKeeper, mainnetAddresses.bammKeeper)
  let res = []
  let exception
  let i = 0
  while (!exception){
    try{
      const address = await bammKeeper.methods.bamms(i).call({gasLimit:10e6})
      res.push(address)
      i++
    } catch (e){
      exception = e
    }
  }
  return res
}

export const getBammLusd = (web3, networkId, bammAddress) => {
  const { Contract } = web3.eth
  const sp = new Contract(ABI.stabilityPool, mainnetAddresses.stabilityPool)
  return sp.methods.getCompoundedLUSDDeposit(bammAddress).call({gasLimit:10e6})
}

export const getUserLiquityTvl = async (web3, networkId, userAddress) => {
  const { Contract } = web3.eth
  const bamms = await getBamms(web3, networkId)
  let userLiquityTvl = toBN('0')
  for (const bammAddress of bamms){
    const bamm = new Contract(ABI.bamm, bammAddress)
    const userBalance = await bamm.methods.balanceOf(userAddress).call({gasLimit:10e6})
    const totalSupply = await bamm.methods.totalSupply().call({gasLimit:10e6})
    const totalLusd = await getBammLusd(web3, networkId, bammAddress)
    const userAddaitionalLusd = toBN(totalLusd).mul(toBN(userBalance)).div(toBN(totalSupply))
    userLiquityTvl = userLiquityTvl.add(userAddaitionalLusd)
  }
  return userLiquityTvl
}