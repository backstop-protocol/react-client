/**
 * @format
 */
import { ABI } from "./liquityConfig/abi"
import { addresses as mainnetAddresses } from "./liquityConfig/mainnetAddress"
import Web3 from "web3"

export const getBammLusd = (web3, networkId) => {
  debugger
  const { Contract } = web3.eth
  const sp = new Contract(ABI.stabilityPool, mainnetAddresses.stabilityPool)
  return sp.methods.getCompoundedLUSDDeposit(mainnetAddresses.bamm).call({gasLimit:10e6})
}