/**
 * @format
 */
import { abis as kovanABIs } from "./compoundConfig/kovanAbi"
import { addresses as kovanAddresses } from "./compoundConfig/kovanAddress"
import { compUserInfoAbi } from "./compoundConfig/compUserInfoAbi"

const compUserInfoAddress = "0x48c380b79F3Ac7B7DA43e76A742d2AC5235439D4"
const maximum = "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"

const getTokenByAddress = (address, networkId) => {
	const networkAddresses = networkId == 42 ? kovanAddresses : {}
	const { Contracts } = networkAddresses
	for (const [contractName, contractAddress] of Object.entries(Contracts)) {
		if (contractAddress == address) {
			debugger
			return {
				name: contractName,
				ABI: getAbi(contractName, networkId),
				address
			}
		}
	}
}

const getAbi = (name, networkId) => {
	const networkAbis = networkId == 42 ? kovanABIs : {}
	const abi = networkAbis[name]
	return abi
}

const getAbiAndAddress = (name, networkId) => {
	return {
		abi: getAbi(name, networkId),
		address: getAddress(name, networkId)
	}
}

const getContract = (web3, networkId, address) => {
	const token = getTokenByAddress(address, networkId)
	return new web3.eth.Contract(token.ABI, address)
}

export const getAddress = (name, networkId) => {
	const networkAddresses = networkId == 42 ? kovanAddresses : {}
	const { Contracts } = networkAddresses
	const address = Contracts[name]
	return address
}

export const depositEth = (web3, networkId) => {
	const cEthAddress = getAddress("cETH", networkId)
	const cETH = getContract(web3, networkId, cEthAddress)
	return cETH.methods.mint()
}

export const depositToken = (web3, networkId, tokenAddress, amount) => {
	const cToken = getContract(web3, networkId, tokenAddress)
	return cToken.methods.mint(amount)
}

export const enterMarket = (web3, networkId, tokenAddresses) => {
	const comptrollerAddress = getAddress("Comptroller", networkId)
	const comptroller = getContract(web3, networkId, comptrollerAddress)
	return comptroller.methods.enterMarkets(tokenAddresses)
}

export const getOpenMarkets = (web3, networkId, user) => {
	const comptrollerAddress = getAddress("Comptroller", networkId)
	const comptroller = getContract(web3, networkId, comptrollerAddress)
	return comptroller.methods.getAssetsIn(user).call()
}

export const borrowToken = (web3, networkId, amount, tokenAddress) => {
	const cToken = getContract(web3, networkId, tokenAddress)
	return cToken.methods.borrow(amount)
}

export const repayEth = (web3, networkId) => {
	const cEthAddress = getAddress("cETH", networkId)
	const cETH = getContract(web3, networkId, cEthAddress)
	return cETH.methods.repayBorrow()
}

export const repayToken = (web3, networkId, amount, tokenAddress) => {
	const cToken = getContract(web3, networkId, tokenAddress)
	return cToken.methods.repayBorrow(amount)
}

export const withdraw = (web3, networkId, amount, tokenAddress) => {
	const cToken = getContract(web3, networkId, tokenAddress)
	return cToken.methods.redeemUnderlying(amount)
}

export const grantAllowance = (web3, networkId, cTokenAddress, uderlying, allowance = maximum) => {
	const erc20Token = getContract(web3, networkId, uderlying)
	return erc20Token.methods.approve(cTokenAddress, allowance)
}

export const normlizeCompUserInfo = (userInfo, networkId) => {
	const mapped = {
		tokenInfo: {},
		cUser: {},
		bUser: {}
	}
	const tokens = userInfo.tokenInfo.btoken
	for (let i = 0; i < tokens.length; i++) {
		const address = tokens[i]

		Object.keys(mapped).forEach((prop) => {
			mapped[prop][address] = {}
			Object.keys(userInfo[prop])
				.filter((k) => isNaN(k)) // removing numerical strings
				.forEach((key) => {
					mapped[prop][address][key] = userInfo[prop][key][i]
				})
		})
	}
	return mapped
}

export const getCompUserInfo = async (web3, networkId, user) => {
	const userInfoContract = new web3.eth.Contract(compUserInfoAbi, compUserInfoAddress)
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
