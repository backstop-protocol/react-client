/**
 * @format
 */
require = require("esm")(module /*, options*/)
const B = require("../../src/lib/compound.interface")
const { increaseABit } = B
let networkId
const Web3 = require("web3")
const { toWei, toBN, toChecksumAddress } = web3.utils

contract("compound interface", function (accounts) {
	before("initing", async () => {
		networkId = await web3.eth.net.getId()
		console.log({ networkId })
		// Vodo
		console.log("voodoo!")
		const user = accounts[9]
		const depositVal = toWei("1") // 2 ETH
		const txObject = B.depositEth(web3, networkId)
		await txObject.send({ value: depositVal, from: user, gasLimit: "1000000" })
	})

	afterEach(async () => {})

	it("deposits ETH and get cETH", async function () {
		const user = accounts[1]
		const cEthAddress = B.getAddress("cETH", networkId)
		const value = toWei("50") // 2 ETH
		const txObject = B.depositEth(web3, networkId)
		const userInfoBefore = await B.getCompUserInfo(web3, networkId, user)
		const balanceBefore = userInfoBefore.bUser[cEthAddress].ctokenBalance

		const gasLimit = await B.gasCalc(networkId, txObject, {
			value,
			from: user
		})

		await txObject.send({
			value,
			from: user,
			gasLimit
		})
		const userInfoAfter = await B.getCompUserInfo(web3, networkId, user)
		const balanceAfter = userInfoAfter.bUser[cEthAddress].ctokenBalance

		assert(
			toBN(balanceBefore).lt(toBN(balanceAfter)),
			"expected cETH balanceBefore the deposit to be lower than cETH balanceAfter teh deposit"
		)
	})

	it("borrows ETH", async function () {
		const user = accounts[1]
		const cEthAddress = B.getAddress("cETH", networkId)
		const amount = toWei("2") // 2 ETH
		const userInfoBefore = await B.getCompUserInfo(web3, networkId, user)

		// console.log("userInfoBefore.bUser[cEthAddress]", userInfoBefore.bUser[cEthAddress])
		const { ctokenBorrowBalance: BorrowBalanceBefore } = userInfoBefore.bUser[cEthAddress]
		const txObject = B.borrowToken(web3, networkId, amount, "cETH")
		const gasLimit = await B.gasCalc(networkId, txObject, { from: user })
		await txObject.send({ from: user, gasLimit })
		const userInfoAfter = await B.getCompUserInfo(web3, networkId, user)
		const { ctokenBorrowBalance: BorrowBalanceAfter } = userInfoAfter.bUser[cEthAddress]
		// console.log(toWei("2"))
		// console.log( toBN(BorrowBalanceAfter).toString())
		assert.equal(
			toBN(BorrowBalanceAfter),
			toWei("2"),
			"expected ETH BorrowBalanceAfter the borrow to be equal to the borrowed amount"
		)
	})

	it("repays ETH reducing the users borrow balance", async function () {
		const user = accounts[1]
		const cEthAddress = B.getAddress("cETH", networkId)
		const value = toWei("2") // 2 ETH
		const userInfoBefore = await B.getCompUserInfo(web3, networkId, user)
		const { ctokenBorrowBalance: BorrowBalanceBefore } = userInfoBefore.bUser[cEthAddress]
		const txObject = B.repayEth(web3, networkId, value)
		const gasLimit = await B.gasCalc(networkId, txObject, { from: user })

		await txObject.send({
			from: user,
			gasLimit,
			value
		})
		const userInfoAfter = await B.getCompUserInfo(web3, networkId, user)
		const { ctokenBorrowBalance: BorrowBalanceAfter } = userInfoAfter.bUser[cEthAddress]
		// console.log("BorrowBalanceBefore", BorrowBalanceBefore)
		// console.log("BorrowBalanceAfter", BorrowBalanceAfter)
		assert(
			toBN(BorrowBalanceBefore).gt(toBN(BorrowBalanceAfter)),
			"expected borrow balanceBefore the reapy to be grater than balanceAfter borrow"
		)
	})

	it("witdraw ETH", async function () {
		const user = accounts[1]
		const cEthAddress = B.getAddress("cETH", networkId)
		const userInfoBefore = await B.getCompUserInfo(web3, networkId, user)
		const { underlyingWalletBalance: ethBalanceBefore } = userInfoBefore.bUser[cEthAddress]

		const value = toWei("2") // 2 ETH
		const txObject = B.withdraw(web3, networkId, value, "cETH")
		const gasLimit = await B.gasCalc(networkId, txObject, { from: user })
		await txObject.send({ from: user, gasLimit })
		const userInfoAfter = await B.getCompUserInfo(web3, networkId, user)
		// console.log("userInfoAfter", userInfoAfter)
		const { underlyingWalletBalance: ethBalanceAfter } = userInfoAfter.bUser[cEthAddress]

		// console.log("ethBalanceBefore", ethBalanceBefore)
		// console.log("ethBalanceAfter", ethBalanceAfter)
		assert(
			toBN(ethBalanceAfter).gt(toBN(ethBalanceBefore)),
			"expected ethBalanceAfter the withdraw to be greater than ethBalanceBefore"
		)
	})

	/* DAI test sequence 
  ============================== */
	it("enters in to cETH and cDAI  markets", async function () {
		const user = accounts[1]
		const cEthAddress = B.getAddress("cETH", networkId)
		const cDaiAddress = B.getAddress("cDAI", networkId)
		const value = toWei("0") // 2 ETH
		const txObject = B.enterMarket(web3, networkId, ["cETH", "cDAI"])
		const gasLimit = await B.gasCalc(networkId, txObject, {
			value,
			from: user
		})

		await txObject.send({ gasLimit, value, from: user })
		await mineBlock()
		// console.log("mine block");
		const res = await B.getOpenMarkets(web3, networkId, user)
		assert.equal(res[0], toChecksumAddress(cEthAddress), "not equel")
		assert.equal(res[1], toChecksumAddress(cDaiAddress), "not equel")
	})

	it("borrows DAI", async function () {
		const user = accounts[1]
		const value = toWei("3") // 2 ETH
		const cDaiAddress = B.getAddress("cDAI", networkId)
		const userInfoBefore = await B.getCompUserInfo(web3, networkId, user)
		const { underlyingWalletBalance: daiBalanceBefore } = userInfoBefore.bUser[cDaiAddress]

		const txObject = B.borrowToken(web3, networkId, value, "cDAI")
		const gasLimit = await B.gasCalc(networkId, txObject, { from: user })
		await txObject.send({ from: user, gasLimit })
		const userInfoAfter = await B.getCompUserInfo(web3, networkId, user, gasLimit)
		const { underlyingWalletBalance: daiBalanceAfter } = userInfoAfter.bUser[cDaiAddress]

		// console.log("daiBalanceBefore", daiBalanceBefore)
		// console.log("daiBalanceAfter", daiBalanceAfter)
		assert(
			toBN(daiBalanceAfter).gt(toBN(daiBalanceBefore)),
			"expected daiBalanceAfter the borrow to be graeter than daiBalanceBefore"
		)
		assert.equal(toBN(daiBalanceAfter), toWei("3"), "expected daiBalanceAfter to equal 3 ETH")
	})

	it("deposits DAI and get cDAI", async function () {
		const user = accounts[1]
		const cDaiAddress = B.getAddress("cDAI", networkId)
		const userInfoBefore = await B.getCompUserInfo(web3, networkId, user)
		const {
			underlyingWalletBalance: daiBalanceBefore,
			ctokenBalance: cDaiBefore
		} = userInfoBefore.bUser[cDaiAddress]
		const value = toWei("1") // 2 ETH
		const txObject = B.depositToken(web3, networkId, "cDAI", value)

		const allowance = await B.grantAllowance(web3, networkId, "DAI").send({
			from: user
		})
		const gasLimit = await B.gasCalc(networkId, txObject, { from: user })
		await txObject.send({ from: user, gasLimit })
		const userInfoAfter = await B.getCompUserInfo(web3, networkId, user)
		const {
			underlyingWalletBalance: daiBalanceAfter,
			ctokenBalance: cDaiAfter
		} = userInfoAfter.bUser[cDaiAddress]

		// console.log("userInfoBefore.bUser[cDaiAddress]", userInfoBefore.bUser[cDaiAddress])
		// console.log("userInfoAfter.bUser[cDaiAddress]", userInfoAfter.bUser[cDaiAddress])

		assert(
			toBN(daiBalanceBefore).gt(toBN(daiBalanceAfter)),
			"expected DAI balanceBefore the deposit to be greater than DAI balanceAfter"
		)
		assert(
			toBN(cDaiAfter).gt(toBN(cDaiBefore)),
			"expected cDaiAfter the deposit to be greater than cDaiBefore"
		)
	})

	it("repays DAI reducing the users borrow balance", async function () {
		const user = accounts[1]
		const cDaiAddress = B.getAddress("cDAI", networkId)
		const userInfoBefore = await B.getCompUserInfo(web3, networkId, user)
		const { ctokenBorrowBalance: borrowBefore } = userInfoBefore.bUser[cDaiAddress]

		const value = toWei("1") // 2 ETH
		const txObject = B.repayToken(web3, networkId, value, "cDAI")
		// console.log("balanceBefore:", balanceBefore)
		const allowance = await B.grantAllowance(web3, networkId, "DAI").send({
			from: user
		})
		const gasLimit = await B.gasCalc(networkId, txObject, { from: user })
		await txObject.send({ from: user, gasLimit })
		const userInfoAfter = await B.getCompUserInfo(web3, networkId, user)
		const { ctokenBorrowBalance: borrowAfter } = userInfoAfter.bUser[cDaiAddress]

		// console.log("balanceAfter:", balanceAfter)
		assert(
			toBN(borrowBefore).gt(toBN(borrowAfter)),
			"expected borrow balanceBefore the reapy to be grater than balanceAfter borrow"
		)
	})

	it("witdraw DAI", async function () {
		const user = accounts[1]
		const cDaiAddress = B.getAddress("cDAI", networkId)
		const userInfoBefore = await B.getCompUserInfo(web3, networkId, user)
		const {
			underlyingWalletBalance: daiBalanceBefore,
			ctokenBalance: cDaiBefore
		} = userInfoBefore.bUser[cDaiAddress]

		const amount = toWei("1") // 2 ETH
		const txObject = B.withdraw(web3, networkId, amount, "cDAI")
		const gasLimit = await B.gasCalc(networkId, txObject, { from: user })
		await txObject.send({ from: user, gasLimit })

		const userInfoAfter = await B.getCompUserInfo(web3, networkId, user)
		const {
			underlyingWalletBalance: daiBalanceAfter,
			ctokenBalance: cDaiAfter
		} = userInfoAfter.bUser[cDaiAddress]
		// console.log("cDaiBefore", cDaiBefore);
		// console.log("cDaiAfter", cDaiAfter);
		assert(
			toBN(daiBalanceAfter).gt(toBN(daiBalanceBefore)),
			"expected DAI balanceAfter the DAI witdraw to be greater than DAI balanceBefore"
		)
		assert(
			toBN(cDaiAfter).lt(toBN(cDaiBefore)),
			"expected cDaiAfter the DAI witdraw to be lower than cDaiBefore"
		)
	})
})

function closeEnough(a, b) {
	if (Number(a) > Number(b)) return closeEnough(b, a)
	if (Number(a) / Number(b) < 0.9999) return false

	return true
}

function getTestProvider() {
	return new Web3.providers.WebsocketProvider("ws://localhost:8545")
}

async function mineBlock() {
	const util = require("util")
	const providerSendAsync = util.promisify(getTestProvider().send).bind(getTestProvider())
	await providerSendAsync({
		jsonrpc: "2.0",
		method: "evm_mine",
		params: [],
		id: 1
	})
}
