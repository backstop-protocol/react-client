import Web3 from "web3"
import { abi } from "./abi"
const {toBN, BN} = Web3.utils

export const normlize = (n, decimals) => {
  let wei = toBN(n); // eslint-disable-line
  const negative = wei.lt(toBN("0")); // eslint-disable-line
  const base = toBN("1" + ("0".repeat(decimals)))
  const options = {};

  if (negative) {
    wei = wei.mul(new BN(-1));
  }

  let fraction = wei.mod(base).toString(10); // eslint-disable-line

  while (fraction.length < decimals) {
    fraction = `0${fraction}`;
  }

  if (!options.pad) {
    fraction = fraction.match(/^([0-9]*[1-9]|0)(0*)/)[1];
  }

  let whole = wei.div(base).toString(10); // eslint-disable-line

  if (options.commify) {
    whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  let value = `${whole}${fraction == '0' ? '' : `.${fraction}`}`; // eslint-disable-line

  if (negative) {
    value = `-${value}`;
  }

  return value;
}

export const denormlize = (n, decimals) => {
  const base = toBN("1" + ("0".repeat(decimals)))

  // Is it negative?
  const negative = (n.substring(0, 1) === '-') 
  if (negative) {
    n = n.substring(1)
  }

  if (n === '.') { throw new Error(`while converting number ${n} to wei, invalid value`) }

  // Split it into a whole and fractional part
  const comps = n.split('.') 
  if (comps.length > 2) { throw new Error(`[ethjs-unit] while converting number ${n} to wei,  too many decimal points`) }

  let whole = comps[0], fraction = comps[1] 

  if (!whole) { whole = '0' }
  if (!fraction) { fraction = '0' }
  if (fraction.length > decimals) { throw new Error(`[ethjs-unit] while converting number ${n} to wei, too many decimal places`) }

  while (fraction.length < decimals) {
    fraction += '0'
  }
  whole = new BN(whole)
  fraction = new BN(fraction)
  let wei = (whole.mul(base)).add(fraction)

  if (negative) {
    wei = wei.mul(new BN(-1))
  }

  return new BN(wei.toString(10), 10)
}

const GAS_LIMIT = { gasLimit: "1000000" }

export const getDecimals = ({web3, tokenAddress}) => {
  const { Contract } = web3.eth
  const erc20 = new Contract(abi.erc20, tokenAddress)
  return erc20.methods.decimals().call()
}

export const getAllowance = async ({web3, user, tokenAddress, poolAddress}) => {
  const { Contract } = web3.eth
  const erc20 = new Contract(abi.erc20, tokenAddress)
  return await erc20.methods.allowance(user, poolAddress).call()
}

export const grantAllowance = ({web3, tokenAddress, poolAddress}) => {
  const { Contract } = web3.eth
  const erc20 = new Contract(abi.erc20, tokenAddress)
  const maxAllowance = new  BN("ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff", 16)
  return erc20.methods.approve(poolAddress, maxAllowance)
}

export const getWalletBallance = async ({web3, user, tokenAddress, decimals}) => {
  const { Contract } = web3.eth
  const erc20 = new Contract(abi.erc20, tokenAddress)
  const balance = await erc20.methods.balanceOf(user).call()
  return balance
}

export const getPoolBallance = async ({web3, tokenAddress, poolAddress}) => {
  const { Contract } = web3.eth
  const erc20 = new Contract(abi.erc20, tokenAddress)
  const [token, eth] = await Promise.all([
    erc20.methods.balanceOf(poolAddress).call(GAS_LIMIT), 
    web3.eth.getBalance(tokenAddress)
  ])
  return {
    token, 
    eth
  }
}

export const deposit = ({web3, poolAddress, decimals}, amount) => {
  const { Contract } = web3.eth
  const bamm = new Contract(abi.bamm, poolAddress)
  const depositAmount = denormlize(amount, decimals)
  return bamm.methods.deposit(depositAmount)
}



const getLensUserInfo = async ({web3, user, lensAddress, rewardAddress, poolAddress}) => {
  const { Contract } = web3.eth
  const lens = new Contract(abi.lens, lensAddress)
  return lens.methods.getUserInfo(user, poolAddress, rewardAddress).call(GAS_LIMIT)
}

export const getTvl = async(context) => {
  const { web3, poolAddress, tokenAddress, decimals, lensAddress } = context
  const { Contract } = web3.eth
  const bamm = new Contract(abi.bamm, poolAddress)
  const erc20 = new Contract(abi.erc20, tokenAddress)
  let tokenValuePromise;
  if(true){
    tokenValuePromise = getLensUserInfo(context)
    .then(({lusdTotal})=> {
      return lusdTotal
    })
    .catch(err => {
      console.error(err)
    })
  } else {
    tokenValuePromise = erc20.methods.balanceOf(poolAddress).call()
  }
  const [tokenValue, {succ: success, value: collateralValue}] = await Promise.all([
    tokenValuePromise,
    bamm.methods.getCollateralValue().call()
  ])

  if(!success){
    throw new Error("getTvl: failed to fetch collateral value")
  }
    const tvl = toBN(tokenValue).add(toBN(collateralValue)).toString()
    let usdRatio, collRatio;
    if (tvl == "0"){
      usdRatio = "0"
      collRatio = "0"
    }else{
      usdRatio = normlize((toBN(tokenValue).mul(toBN(1e18))).div(toBN(tvl)).toString(), 18)
      collRatio = normlize((toBN(collateralValue).mul(toBN(1e18))).div(toBN(tvl)).toString(), 18)
    }

    return {
      tvl,
      usdRatio,
      collRatio
    }
}

const getUserShareAndTotalSupply = async(web3, userAddress, poolAddress) => {
  const { Contract } = web3.eth
  const bamm = new Contract(abi.bamm, poolAddress)
  const userSharePromise = bamm.methods.balanceOf(userAddress).call()
  const totalSupplyPromise = bamm.methods.totalSupply().call()

  const [userShare, totalSupply] = await Promise.all([
    userSharePromise,
    totalSupplyPromise
  ])
  return {userShare, totalSupply}
}

export const usdToShare = async (context, amount) => {
  const {web3, poolAddress, tokenAddress, decimals} = context
  // amount * totalSupply / TVL
  const { Contract } = web3.eth
  const bamm = new Contract(abi.bamm, poolAddress)
  const totalSupplyPromise = bamm.methods.totalSupply().call()
  const tvlPromise = getTvl(context)
  const [{tvl}, totalSupply] = await Promise.all([tvlPromise, totalSupplyPromise])
  const share = (toBN(denormlize(amount, decimals)).mul(toBN(totalSupply))).div(toBN(tvl))
  return share.toString()
}

export const withdraw = ({web3, poolAddress, tokenAddress, decimals}, amountInShares) => {
  const { Contract } = web3.eth
  const bamm = new Contract(abi.bamm, poolAddress)
  return bamm.methods.withdraw(amountInShares)
}

export const getUserShareInUsd = async(context) => {
  const {web3, user, poolAddress, tokenAddress, decimals} = context
  // tvl * userShare / totalSupply
  const tvlPromise = getTvl(context)
  const sharePromise = getUserShareAndTotalSupply(web3, user, poolAddress)
  const [{tvl}, {userShare, totalSupply}] = await Promise.all([tvlPromise, sharePromise])
  
  let usdVal;
  if(totalSupply == "0"){
    usdVal = "0"
  } else {
    usdVal = (toBN(tvl).mul(toBN(userShare))).div(toBN(totalSupply)).toString()
  }
  
  return usdVal
}

export const getSymbol = (web3, tokenAddress) => {
  if (tokenAddress == "0x0000000000000000000000000000000000000000"){ // handel ETH
    return "ETH"
  }
  const { Contract } = web3.eth
  const erc20 = new Contract(abi.erc20, tokenAddress)
  return erc20.methods.symbol().call()
} 

export const getAssetDistrobution = async({web3, poolAddress, user}, assetAddress ) => {
  let balancePromise;
  if (assetAddress == "0x0000000000000000000000000000000000000000"){ // handel ETH
    balancePromise = web3.eth.getBalance(poolAddress)
  } else {
    const { Contract } = web3.eth
    const erc20 = new Contract(abi.erc20, assetAddress)
    balancePromise = erc20.methods.balanceOf(user).call()
  }

  const [poolBalance, symbol] = await Promise.all([
    balancePromise,
    getSymbol(web3, assetAddress)
  ])

  return {
    assetAddress,
    poolBalance,
    symbol
  }
}

export const getCollaterals = async(context) => {
  const { web3, poolAddress } = context
  const { Contract } = web3.eth
  const bamm = new Contract(abi.bamm, poolAddress)
  const promises = []
  for (let i = 0; i < 10; i++) {
    const promise = bamm.methods.collaterals(i).call()
    .then(address => getAssetDistrobution(context, address))
    .catch(err => null)
    promises.push(promise)
  }
  const collaterals = (await Promise.all(promises))
  .filter(x=> x)
  return collaterals
}

export const getReward = async({web3, user, lensAddress, poolAddress, rewardAddress}) => {
  // todo fetch unclaimed reward
  if(!lensAddress){ 
    return null
  }
  const { Contract } = web3.eth
  const lens = new Contract(abi.lens, lensAddress)
  const erc20 = new Contract(abi.erc20, rewardAddress)
  const [reward, symbol, decimal, balance] = await Promise.all([
    lens.methods.getUnclaimedLqty(user, poolAddress, rewardAddress).call(),
    getSymbol(web3, rewardAddress),
    getDecimals({web3, tokenAddress: rewardAddress}),
    erc20.methods.balanceOf(user).call()
  ])

  return {
    unclaimed: normlize(reward, decimal), 
    symbol,
    balance: normlize(balance, decimal), 
  }

}