import { ABI } from "./instaConfig/abi"
import { addresses as mainnetAddresses } from "./instaConfig/mainnetAddress"
import Web3 from "web3"
const {toBN, fromWei, toWei} = Web3.utils

export const getAccounts = async (web3, networkId, user) => {
  if(networkId != 1){
    return []
  }
  const { Contract } = web3.eth
  const dsaResolver = new Contract(ABI.dsaResolver, mainnetAddresses.dsaResolver)
  return dsaResolver.methods.getAuthorityAccounts(user).call({gasLimit:10e6})
}