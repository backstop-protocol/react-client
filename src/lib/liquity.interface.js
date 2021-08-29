/**
 * @format
 */
import { ABI } from "./liquityConfig/abi"
import { addresses as mainnetAddresses } from "./liquityConfig/mainnetAddress"
import Web3 from "web3"

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