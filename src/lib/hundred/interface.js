import Web3 from "web3"
import { abi } from "./abi"

const GAS_LIMIT = {gasLimit: 10e6}

export const getWalletBallance = (web3, userAddress, tokenAddress) => {
  const { Contract } = web3.eth
  const erc20 = new Contract(abi.erc20, tokenAddress)
  return erc20.methods.balanceOf(userAddress).call(GAS_LIMIT)
} 

export const getPoolBallance = async (web3, tokenAddress, poolAddresses) => {

  const { Contract } = web3.eth
  const erc20 = new Contract(abi.erc20, tokenAddress)
  const [token, eth] = await Promise.all([
    erc20.methods.balanceOf(poolAddresses).call(GAS_LIMIT), 
    web3.eth.getBalance(tokenAddress).call(GAS_LIMIT)
  ])
  return {
    token, 
    eth
  }
} 
