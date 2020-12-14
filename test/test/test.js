'use strict'
// const Web3 = require('web3');
// const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
require = require("esm")(module/*, options*/)
const B = require('../../src/lib/bInterface')
let networkId

contract('B Interface', function (accounts) {
  beforeEach('initing', async () => {
    networkId = await web3.eth.net.getId()
    console.log({networkId})
  })
  afterEach(async () => {
  })

  it('first deposit', async function () {
    const user = accounts[0]
    console.log("query user info")
    const userInfo = await B.getUserInfo(web3,networkId,user)
    assert(! userInfo.bCdpInfo.hasCdp, "user is not expected to have a cdp")
    assert(! userInfo.proxyInfo.hasProxy, "user is not expected to have a proxy")

    const depositVal = web3.utils.toWei("2") // 2 ETH
    const txObject = B.firstDeposit(web3,networkId,user)
    //console.log({txObject})
    const gasConsumption = increaseABit(await txObject.estimateGas({value:depositVal,from:user}))
    console.log({gasConsumption})
    await txObject.send({gas:gasConsumption,value:depositVal,from:user})
    await mineBlock()
    // .on('confirmation', function(confirmationNumber, receipt)

    console.log("query user info again")
    const userInfoAfter = await B.getUserInfo(web3,networkId,user)
    //console.log({userInfoAfter})
    //console.log({userInfoAfter})
    assert(userInfoAfter.bCdpInfo.hasCdp,"user is expected to have a cdp")
    assert.equal(userInfoAfter.bCdpInfo.ethDeposit.toString(10),depositVal.toString(10),"user eth balance is expected to be 2")
    assert.equal(userInfoAfter.bCdpInfo.daiDebt.toString(10),"0","user debt balance is expected to be 0")
    assert(userInfoAfter.proxyInfo.hasProxy, "user is expected to have a proxy")
  })

  it('second deposit', async function () {
    const user = accounts[0]

    console.log("query user info")
    const userInfo = await B.getUserInfo(web3,networkId,user)
    const cdp = userInfo.bCdpInfo.cdp
    //console.log({cdp})

    const depositVal = web3.utils.toWei("5") // 5 ETH
    console.log("proxy",userInfo.proxyInfo.userProxy)
    const txObject = B.depositETH(web3,networkId,userInfo.proxyInfo.userProxy,cdp)
    //console.log({txObject})
    const gasConsumption = increaseABit(await txObject.estimateGas({value:depositVal,from:user}))
    console.log({gasConsumption})
    await txObject.send({gas:gasConsumption,value:depositVal,from:user})
    await mineBlock()
    // .on('confirmation', function(confirmationNumber, receipt)

    console.log("query user info again")
    const userInfoAfter = await B.getUserInfo(web3,networkId,user)
    //console.log({userInfoAfter})
    assert(userInfoAfter.bCdpInfo.hasCdp,"user is expected to have a cdp")
    assert.equal(userInfoAfter.bCdpInfo.ethDeposit.toString(10),web3.utils.toWei("7").toString(10),"user eth balance is expected to be 2")
    assert.equal(userInfoAfter.bCdpInfo.daiDebt.toString(10),"0","user debt balance is expected to be 0")
    assert(userInfoAfter.proxyInfo.hasProxy, "user is expected to have a proxy")
  })

  it('ETH withdraw', async function () {
    const user = accounts[0]

    console.log("query user info")
    const userInfo = await B.getUserInfo(web3,networkId,user)
    const cdp = userInfo.bCdpInfo.cdp
    console.log({cdp})

    const withrawVal = web3.utils.toWei("3") // 3 ETH
    console.log("proxy",userInfo.proxyInfo.userProxy)

    const txObject = B.withdrawETH(web3,networkId,userInfo.proxyInfo.userProxy,cdp,withrawVal)
    //console.log({txObject})
    const gasConsumption = increaseABit(await txObject.estimateGas({value:0,from:user}))
    console.log({gasConsumption})
    await txObject.send({gas:gasConsumption,value:0,from:user})
    await mineBlock()
    // .on('confirmation', function(confirmationNumber, receipt)

    console.log("query user info again")
    const userInfoAfter = await B.getUserInfo(web3,networkId,user)
    //console.log({userInfoAfter})
    assert(userInfoAfter.bCdpInfo.hasCdp,"user is expected to have a cdp")
    assert.equal(userInfoAfter.bCdpInfo.ethDeposit.toString(10),web3.utils.toWei("4").toString(10),"user eth balance is expected to be 2")
    assert.equal(userInfoAfter.bCdpInfo.daiDebt.toString(10),"0","user debt balance is expected to be 0")
    assert(userInfoAfter.proxyInfo.hasProxy, "user is expected to have a proxy")
  })

  it('generate dai', async function () {
    const user = accounts[0]

    console.log("query user info")
    const userInfo = await B.getUserInfo(web3,networkId,user)
    //console.log(userInfo);
    const cdp = userInfo.bCdpInfo.cdp
    console.log({cdp})

    const withrawVal = web3.utils.toWei("600") // 600 dai
    console.log("proxy",userInfo.proxyInfo.userProxy)

    const txObject = B.generateDai(web3,networkId,userInfo.proxyInfo.userProxy,cdp,withrawVal)
    //console.log({txObject})
    const gasConsumption = increaseABit(await txObject.estimateGas({value:0,from:user}))
    console.log({gasConsumption})
    await txObject.send({gas:gasConsumption,value:0,from:user})
    await mineBlock()
    // .on('confirmation', function(confirmationNumber, receipt)

    console.log("query user info again")
    const userInfoAfter = await B.getUserInfo(web3,networkId,user)
    //console.log({userInfoAfter})
    assert(userInfoAfter.bCdpInfo.hasCdp,"user is expected to have a cdp")
    //assert.equal(userInfoAfter.bCdpInfo.ethDeposit.toString(10),web3.utils.toWei("4").toString(10),"user eth balance is expected to be 2")
    assert(closeEnough(web3.utils.fromWei(userInfoAfter.bCdpInfo.daiDebt.toString(10)),web3.utils.fromWei(web3.utils.toWei("600").toString(10))),"user eth balance is expected to be 2")
    assert(userInfoAfter.proxyInfo.hasProxy, "user is expected to have a proxy")
  })

  it('repay dai', async function () {
    const user = accounts[0]

    console.log("query user info")
    const userInfo = await B.getUserInfo(web3,networkId,user)
    //console.log(userInfo);
    const cdp = userInfo.bCdpInfo.cdp
    console.log({cdp})

    // first unlock dai
    console.log("proxy",userInfo.proxyInfo.userProxy)
    const txObject1 = B.unlockDai(web3,networkId,userInfo.proxyInfo.userProxy)
    let gasConsumption = increaseABit(await txObject1.estimateGas({value:0,from:user}))
    await txObject1.send({gas:gasConsumption,value:0,from:user})
    await mineBlock()

    const withrawVal = web3.utils.toWei("50") // 50 dai
    const txObject2 = B.repayDai(web3,networkId,userInfo.proxyInfo.userProxy,cdp,withrawVal)
    //console.log({txObject})
    gasConsumption = increaseABit(await txObject2.estimateGas({value:0,from:user}))
    console.log({gasConsumption})
    await txObject2.send({gas:gasConsumption,value:0,from:user})
    await mineBlock()
    // .on('confirmation', function(confirmationNumber, receipt)

    console.log("query user info again")
    const userInfoAfter = await B.getUserInfo(web3,networkId,user)
    //console.log({userInfoAfter})
    assert(userInfoAfter.bCdpInfo.hasCdp,"user is expected to have a cdp")
    //assert.equal(userInfoAfter.bCdpInfo.ethDeposit.toString(10),web3.utils.toWei("4").toString(10),"user eth balance is expected to be 2")
    assert.equal(userInfoAfter.bCdpInfo.daiDebt.toString(10),web3.utils.toWei("550").toString(10),"user debt")
    assert(userInfoAfter.proxyInfo.hasProxy, "user is expected to have a proxy")

    // repay again, without unlockDai
    await txObject2.send({gas:gasConsumption,value:0,from:user})
    await mineBlock()

    const userInfoAfterAfter = await B.getUserInfo(web3,networkId,user)
    //console.log({userInfoAfter})
    assert(userInfoAfterAfter.bCdpInfo.hasCdp,"user is expected to have a cdp")
    //assert.equal(userInfoAfter.bCdpInfo.ethDeposit.toString(10),web3.utils.toWei("4").toString(10),"user eth balance is expected to be 2")
    assert.equal(userInfoAfterAfter.bCdpInfo.daiDebt.toString(10),web3.utils.toWei("500").toString(10),"user debt")
  })

  it('migrate fresh', async function () {
    const user = accounts[1] // new user
    const txMakerDao = B.openMakerDaoCdp(web3,networkId,user)
    const cdpVal = web3.utils.toWei("10")
    const makerDaoGasConsmption = increaseABit(await txMakerDao.estimateGas({value:cdpVal, from:user}))
    await txMakerDao.send({gas:makerDaoGasConsmption,value:cdpVal,from:user})

    await mineBlock()

    console.log("query user info again")
    const userInfoAfter = await B.getUserInfo(web3,networkId,user)

    assert(! userInfoAfter.bCdpInfo.hasCdp, "not expected to have B cdp")
    assert(userInfoAfter.makerdaoCdpInfo.hasCdp, "expected to have a maker cdp")
    assert.equal(userInfoAfter.makerdaoCdpInfo.ethDeposit.toString(10),web3.utils.toWei("10").toString(10),"user deposit is not as expected")

    const makerDaoCdp = userInfoAfter.makerdaoCdpInfo.cdp
    const proxy = userInfoAfter.proxyInfo.userProxy

    console.log({makerDaoCdp},{proxy})
    // do the migration
    const txMigrateFresh = B.migrateFresh(web3,networkId,proxy,makerDaoCdp)
    const migrateFreshGasConsmption = increaseABit(await txMigrateFresh.estimateGas({value:0,from:user}))
    await txMigrateFresh.send({gas:migrateFreshGasConsmption,value:0,from:user})

    await mineBlock()

    const userInfoAfterAfter = await B.getUserInfo(web3,networkId,user)

    assert.equal(userInfoAfterAfter.makerdaoCdpInfo.ethDeposit.toString(10),web3.utils.toWei("0").toString(10),"user deposit is not as expected")
    assert.equal(userInfoAfterAfter.bCdpInfo.ethDeposit.toString(10),web3.utils.toWei("10").toString(10),"user deposit is not as expected")
  })

  it('migrate existing', async function () {
    const user = accounts[0] // new user
    const txMakerDao = B.openMakerDaoCdp(web3,networkId,user)
    const cdpVal = web3.utils.toWei("10")
    const makerDaoGasConsmption = increaseABit(await txMakerDao.estimateGas({value:cdpVal, from:user}))
    await txMakerDao.send({gas:makerDaoGasConsmption,value:cdpVal,from:user})

    await mineBlock()

    console.log("query user info again")
    const userInfoAfter = await B.getUserInfo(web3,networkId,user)

    assert(userInfoAfter.bCdpInfo.hasCdp, "not expected to have B cdp")
    assert(userInfoAfter.makerdaoCdpInfo.hasCdp, "expected to have a maker cdp")
    assert.equal(userInfoAfter.bCdpInfo.ethDeposit.toString(10),web3.utils.toWei("4").toString(10),"user deposit is not as expected")
    assert.equal(userInfoAfter.makerdaoCdpInfo.ethDeposit.toString(10),web3.utils.toWei("10").toString(10),"user deposit is not as expected")

    const makerDaoCdp = userInfoAfter.makerdaoCdpInfo.cdp
    const proxy = userInfoAfter.proxyInfo.userProxy

    console.log({makerDaoCdp},{proxy})
    // do the migration
    const txMigrateFresh = B.migrateToExisting(web3,networkId,proxy,makerDaoCdp,userInfoAfter.bCdpInfo.cdp)
    const migrateFreshGasConsmption = increaseABit(await txMigrateFresh.estimateGas({value:0,from:user}))
    await txMigrateFresh.send({gas:migrateFreshGasConsmption,value:0,from:user})

    await mineBlock()

    const userInfoAfterAfter = await B.getUserInfo(web3,networkId,user)

    assert.equal(userInfoAfterAfter.makerdaoCdpInfo.ethDeposit.toString(10),web3.utils.toWei("0").toString(10),"user deposit is not as expected")
    assert.equal(userInfoAfterAfter.bCdpInfo.ethDeposit.toString(10),web3.utils.toWei("14").toString(10),"user deposit is not as expected")
  })

  it('calcNewBorrowLimitAndLiquidationPrice', async function () {
    const user = accounts[2]

    let userInfo = await B.getUserInfo(web3,networkId,user)

    const [maxDebt0,newLiqPrice0] = B.calcNewBorrowLimitAndLiquidationPrice(userInfo,web3.utils.toWei("0"),web3.utils.toWei("1"),web3)
    assert.equal(maxDebt0.toString(10),"0")
    assert.equal(newLiqPrice0.toString(10),"0")

    userInfo.miscInfo.spotPrice = web3.utils.toWei("100")
    const [maxDebt10,newLiqPrice10] = B.calcNewBorrowLimitAndLiquidationPrice(userInfo,web3.utils.toWei("1.5"),web3.utils.toWei("1"),web3)
    assert.equal(maxDebt10.toString(10),web3.utils.toWei((150/1.5).toString(10)).toString(10))
    assert.equal(newLiqPrice10.toString(10),"0")

    const depositVal = web3.utils.toWei("5") // 5 ETH
    const txObject = B.firstDeposit(web3,networkId,user)
    //console.log({txObject})
    const gasConsumption = increaseABit(await txObject.estimateGas({value:depositVal,from:user}))
    console.log({gasConsumption})
    await txObject.send({gas:gasConsumption,value:depositVal,from:user})
    await mineBlock()

    userInfo = await B.getUserInfo(web3,networkId,user)
    const cdp = userInfo.bCdpInfo.cdp
    console.log({cdp})

    console.log("proxy",userInfo.proxyInfo.userProxy)

    const withdrawalVal = web3.utils.toWei("550")
    const txObject2 = B.generateDai(web3,networkId,userInfo.proxyInfo.userProxy,cdp,withdrawalVal)
    const gasConsumption2 = increaseABit(await txObject2.estimateGas({from:user}))
    console.log({gasConsumption2})
    await txObject2.send({gas:gasConsumption2,from:user})
    await mineBlock()


    console.log("query user info again")
    userInfo = await B.getUserInfo(web3,networkId,user)

    const [maxDebt,newLiqPrice] = B.calcNewBorrowLimitAndLiquidationPrice(userInfo,web3.utils.toWei("0"),web3.utils.toWei("0"),web3)
    assert(closeEnough(web3.utils.fromWei(newLiqPrice),(550 * 1.5/5).toString()))

    const [maxDebt2,newLiqPrice2] = B.calcNewBorrowLimitAndLiquidationPrice(userInfo,web3.utils.toWei("4"),web3.utils.toWei("0"),web3)
    assert(closeEnough(web3.utils.fromWei(newLiqPrice2),(550 * 1.5/9).toString()))

    const [maxDebt3,newLiqPrice3] = B.calcNewBorrowLimitAndLiquidationPrice(userInfo,web3.utils.toWei("-1"),web3.utils.toWei("0"),web3)
    assert(closeEnough(web3.utils.fromWei(newLiqPrice3),(550 * 1.5/4).toString()))

    const [maxDebt4,newLiqPrice4] = B.calcNewBorrowLimitAndLiquidationPrice(userInfo,web3.utils.toWei("0"),web3.utils.toWei("150"),web3)
    assert(closeEnough(web3.utils.fromWei(newLiqPrice4),(700 * 1.5/5).toString()))

    const [maxDebt5,newLiqPrice5] = B.calcNewBorrowLimitAndLiquidationPrice(userInfo,web3.utils.toWei("0"),web3.utils.toWei("-50"),web3)
    assert(closeEnough(web3.utils.fromWei(newLiqPrice5),(500 * 1.5/5).toString()))

    const [maxDebt6,newLiqPrice6] = B.calcNewBorrowLimitAndLiquidationPrice(userInfo,web3.utils.toWei("1.5"),web3.utils.toWei("-50"),web3)
    assert(closeEnough(web3.utils.fromWei(newLiqPrice6),(500 * 1.5/6.5).toString()))

    userInfo.miscInfo.spotPrice = web3.utils.toWei("100.5")
    userInfo.bCdpInfo.maxDaiDebt = web3.utils.toWei("335")

    const [maxDebt7,newLiqPrice7] = B.calcNewBorrowLimitAndLiquidationPrice(userInfo,web3.utils.toWei("1"),web3.utils.toWei("-1"),web3)

    assert.equal(web3.utils.fromWei(maxDebt7),(6*335 / 5).toString())
    const [maxDebt8,newLiqPrice8] = B.calcNewBorrowLimitAndLiquidationPrice(userInfo,web3.utils.toWei("-1"),web3.utils.toWei("-1"),web3)
    assert.equal(web3.utils.fromWei(maxDebt8),(4*335 / 5).toString())

    const [maxDebt9,newLiqPrice9] = B.calcNewBorrowLimitAndLiquidationPrice(userInfo,web3.utils.toWei("-5"),web3.utils.toWei("0"),web3)
    assert.equal(web3.utils.fromWei(maxDebt9),(0).toString())
    assert.equal(web3.utils.fromWei(newLiqPrice9),(0).toString())
  })

  it('input verification', async function () {
    const user = accounts[3]

    const depositVal = web3.utils.toWei("5") // 5 ETH
    const txObject = B.firstDeposit(web3,networkId,user)
    //console.log({txObject})
    const gasConsumption = increaseABit(await txObject.estimateGas({value:depositVal,from:user}))
    console.log({gasConsumption})
    await txObject.send({gas:gasConsumption,value:depositVal,from:user})
    await mineBlock()

    let userInfo = await B.getUserInfo(web3,networkId,user)
    const cdp = userInfo.bCdpInfo.cdp
    console.log({cdp})

    const [succ91,msg91] = B.verifyBorrowInput(userInfo, web3.utils.toWei("50"),web3)
    assert(! succ91, "verifyBorrowInput should fail")
    const dust = networkId === 42 ? "100" : "500"
    assert.equal(msg91,"A Vault requires a minimum of " + dust.toString() + " Dai to be generated")

    console.log("proxy",userInfo.proxyInfo.userProxy)

    const withdrawalVal = web3.utils.toWei("550")
    const txObject2 = B.generateDai(web3,networkId,userInfo.proxyInfo.userProxy,cdp,withdrawalVal)
    const gasConsumption2 = increaseABit(await txObject2.estimateGas({from:user}))
    console.log({gasConsumption2})
    await txObject2.send({gas:gasConsumption2,from:user})
    await mineBlock()


    console.log("query user info again")
    userInfo = await B.getUserInfo(web3,networkId,user)

    // verify deposit
    const [succ1,msg1] = B.verifyDepositInput(userInfo, web3.utils.toWei("-1"),web3)
    assert(! succ1, "verifyDepositInput should fail")
    assert.equal(msg1,"Deposit amount must be positive")

    const balancePlusOne = web3.utils.toBN(userInfo.userWalletInfo.ethBalance).add(web3.utils.toBN(1e10))
    const [succ2,msg2] = B.verifyDepositInput(userInfo, balancePlusOne.toString(10),web3)
    assert(! succ2, "verifyDepositInput should fail")
    assert.equal(msg2,"Amount exceeds wallet balance")

    const balanceMinusOne = web3.utils.toBN(userInfo.userWalletInfo.ethBalance).sub(web3.utils.toBN(1e10))
    const [succ3,msg3] = B.verifyDepositInput(userInfo, balanceMinusOne.toString(10),web3)
    assert(succ3, "verifyDepositInput should pass")
    assert.equal(msg3,"")

    // verify withdraw ETH
    const [succ4,msg4] = B.verifyWithdrawInput(userInfo,web3.utils.toWei("-1"),web3)
    assert(! succ4, "verifyWithdrawInput should failed")
    assert.equal(msg4,"Withdraw amount must be positive")

    const [succ5,msg5] = B.verifyWithdrawInput(userInfo,web3.utils.toWei("5.001"),web3)
    assert(! succ5, "verifyWithdrawInput should failed")
    assert.equal(msg5,"Amount exceeds CDP deposit")

    const [succ6,msg6] = B.verifyWithdrawInput(userInfo,web3.utils.toWei("4.9"),web3)
    assert(! succ6, "verifyWithdrawInput should failed")
    assert.equal(msg6,"Amount exceeds allowed withdrawal")

    const [succ7,msg7] = B.verifyWithdrawInput(userInfo,web3.utils.toWei("0.1"),web3)
    assert(succ7, "verifyWithdrawInput should pass")

    // verify borrow dai
    const [succ8,msg8] = B.verifyBorrowInput(userInfo, web3.utils.toWei("-1"),web3)
    assert(! succ8, "verifyBorrowInput should fail")
    assert.equal(msg8,"Borrow amount must be positive")

    const [succ9,msg9] = B.verifyBorrowInput(userInfo, web3.utils.toWei("5000"),web3)
    assert(! succ9, "verifyBorrowInput should fail")
    assert.equal(msg9,"Amount exceeds allowed borrowed")

    const [succ10,msg10] = B.verifyBorrowInput(userInfo, web3.utils.toWei("100"),web3)
    assert(succ10, "verifyBorrowInput should pass")

    // verify repay dai
    const [succ11,msg11] = B.verifyRepayInput(userInfo,web3.utils.toWei("-1"),web3)
    assert(! succ11, "verifyRepayInput should failed")
    assert.equal(msg11,"Repay amount must be positive")

    userInfo.userWalletInfo.daiAllowance = web3.utils.toWei("190")
    userInfo.userWalletInfo.daiBalance = web3.utils.toWei("50")
    const [succ12,msg12] = B.verifyRepayInput(userInfo,web3.utils.toWei("50.0001"),web3)
    assert(! succ12, "verifyRepayInput should failed")
    assert.equal(msg12,"Amount exceeds dai balance")

    userInfo.userWalletInfo.daiAllowance = web3.utils.toWei("100")
    userInfo.userWalletInfo.daiBalance = web3.utils.toWei("200")
    const [succ13,msg13] = B.verifyRepayInput(userInfo,web3.utils.toWei("100.0001"),web3)
    assert(! succ13, "verifyRepayInput should failed")
    assert.equal(msg13,"Must unlock DAI")

    userInfo.userWalletInfo.daiAllowance = web3.utils.toWei("600")
    userInfo.userWalletInfo.daiBalance = web3.utils.toWei("600")
    const [succ14,msg14] = B.verifyRepayInput(userInfo,web3.utils.toWei("550.0001"),web3)
    assert(! succ14, "verifyRepayInput should failed")
    assert.equal(msg14,"Amount exceeds dai debt")

    userInfo.userWalletInfo.daiAllowance = web3.utils.toWei("600")
    userInfo.userWalletInfo.daiBalance = web3.utils.toWei("600")
    const [succ141,msg141] = B.verifyRepayInput(userInfo,web3.utils.toWei("500"),web3)
    assert(! succ141, "verifyRepayInput should failed")
    const distFromDust = networkId === 42 ? "450" : "50"
    assert.equal(msg141,"You can repay all your outstanding debt or a maximum of " + distFromDust.toString() + " Dai")

    userInfo.userWalletInfo.daiAllowance = web3.utils.toWei("600")
    userInfo.userWalletInfo.daiBalance = web3.utils.toWei("549.99999")
    const [succ142,msg142] = B.verifyRepayInput(userInfo,web3.utils.toWei("549.5"),web3)
    assert(! succ142, "verifyRepayInput should failed")
    assert.equal(msg142,"Dai balance is not enough to repay your entire debt")

    userInfo.userWalletInfo.daiAllowance = web3.utils.toWei("549.99999")
    userInfo.userWalletInfo.daiBalance = web3.utils.toWei("550")
    const [succ143,msg143] = B.verifyRepayInput(userInfo,web3.utils.toWei("549.8"),web3)
    assert(! succ143, "verifyRepayInput should failed")
    assert.equal(msg143,"Dai allowance is not enough to repay your entire debt")


    const [succ15,msg15] = B.verifyRepayInput(userInfo,web3.utils.toWei("40.0031"),web3)
    assert(succ15, "verifyRepayInput should pass")

    // leave under 1 dai - should pass
    userInfo.userWalletInfo.daiAllowance = web3.utils.toWei("50.99999")
    userInfo.userWalletInfo.daiBalance = web3.utils.toWei("100")
    const [succ16,msg16] = B.verifyRepayInput(userInfo,web3.utils.toWei("49.0031"),web3)

    assert(succ16, "verifyRepayInput should pass", msg16)
  })

  it.only('input verification liqudation process', async function () {
    const user = accounts[8]

    const depositVal = web3.utils.toWei("5") // 5 ETH
    const txObject = B.firstDeposit(web3,networkId,user)
    //console.log({txObject})
    const gasConsumption = increaseABit(await txObject.estimateGas({value:depositVal,from:user}))
    console.log({gasConsumption})
    await txObject.send({gas:gasConsumption,value:depositVal,from:user})
    await mineBlock()

    let userInfo = await B.getUserInfo(web3,networkId,user)
    const cdp = userInfo.bCdpInfo.cdp
    console.log({cdp})

    // creating a userInfo mock to mock acount liqudation flag
    const userInfoLiqudationMock = Object.assign({}, userInfo)
    userInfoLiqudationMock.bCdpInfo.bitten = true

    // deny all operations during vault liqudation all verifications should fail

    // deposit
    console.log('deposit')
    const balanceMinusOne = web3.utils.toBN(userInfo.userWalletInfo.ethBalance).sub(web3.utils.toBN(1e10))
    const [succ,msg] = B.verifyDepositInput(userInfoLiqudationMock, balanceMinusOne.toString(10),web3)
    assert(! succ, "verifyDepositInput should fail")
    assert.equal(msg,"vault is being liqudated")

    // witdraw
    console.log('witdraw')
    const [succ1,msg1] = B.verifyWithdrawInput(userInfoLiqudationMock,web3.utils.toWei("0.1"),web3)
    assert(! succ1, "verifyDepositInput should fail")
    assert.equal(msg1,"vault is being liqudated")

    // borrow
    console.log('borrow')
    const [succ2,msg2] = B.verifyBorrowInput(userInfoLiqudationMock, web3.utils.toWei("100"),web3)
    assert(! succ2, "verifyDepositInput should fail")
    assert.equal(msg2,"vault is being liqudated")

    // repay
    console.log('repay')
    const [succ3,msg3] = B.verifyRepayInput(userInfoLiqudationMock,web3.utils.toWei("40.0031"),web3)
    assert(! succ3, "verifyDepositInput should fail")
    assert.equal(msg3,"vault is being liqudated")
  })

  it('repayAllDai', async function () {
    const user = accounts[4]

    const depositVal = web3.utils.toWei("3") // 2 ETH
    const txObject = B.firstDeposit(web3,networkId,user)
    //console.log({txObject})
    let gasConsumption = increaseABit(await txObject.estimateGas({value:depositVal,from:user}))
    console.log({gasConsumption})
    await txObject.send({gas:gasConsumption,value:depositVal,from:user})
    await mineBlock()

    let userInfo = await B.getUserInfo(web3,networkId,user)
    const cdp = userInfo.bCdpInfo.cdp
    console.log({cdp})

    const withdrawalVal = web3.utils.toWei("550")
    const txObject2 = B.generateDai(web3,networkId,userInfo.proxyInfo.userProxy,cdp,withdrawalVal)
    const gasConsumption2 = increaseABit(await txObject2.estimateGas({from:user}))
    console.log({gasConsumption2})
    await txObject2.send({gas:gasConsumption2,from:user})
    await mineBlock()


    console.log("query user info again")
    userInfo = await B.getUserInfo(web3,networkId,user)
    assert.equal(userInfo.bCdpInfo.daiDebt.toString(10),web3.utils.toWei("550").toString(10),"user debt should be 150")

    // first unlock dai
    console.log("proxy",userInfo.proxyInfo.userProxy)
    const txObject3 = B.unlockDai(web3,networkId,userInfo.proxyInfo.userProxy)
    gasConsumption = increaseABit(await txObject3.estimateGas({value:0,from:user}))
    await txObject3.send({gas:gasConsumption,value:0,from:user})
    await mineBlock()

    const txObject4 = B.repayAllDai(web3,networkId,userInfo.proxyInfo.userProxy,cdp)
    //console.log({txObject})
    gasConsumption = increaseABit(await txObject4.estimateGas({value:0,from:user}))
    console.log({gasConsumption})
    await txObject4.send({gas:gasConsumption,value:0,from:user})
    await mineBlock()

    const userInfoAfterAll = await B.getUserInfo(web3,networkId,user)
    //console.log({userInfoAfter})
    assert(userInfoAfterAll.bCdpInfo.hasCdp,"user is expected to have a cdp")
    //assert.equal(userInfoAfter.bCdpInfo.ethDeposit.toString(10),web3.utils.toWei("4").toString(10),"user eth balance is expected to be 2")
    assert.equal(userInfoAfterAll.bCdpInfo.daiDebt.toString(10),web3.utils.toWei("0").toString(10),"user debt should be 0 after repayAll")
  })

  it('export to makerdao', async function () {
    const user = accounts[5]

    const depositVal = web3.utils.toWei("3") // 2 ETH
    const txObject = B.firstDeposit(web3,networkId,user)
    //console.log({txObject})
    let gasConsumption = increaseABit(await txObject.estimateGas({value:depositVal,from:user}))
    console.log({gasConsumption})
    await txObject.send({gas:gasConsumption,value:depositVal,from:user})
    await mineBlock()

    let userInfo = await B.getUserInfo(web3,networkId,user)
    const cdp = userInfo.bCdpInfo.cdp
    console.log({cdp})

    const withdrawalVal = web3.utils.toWei("550")
    const txObject2 = B.generateDai(web3,networkId,userInfo.proxyInfo.userProxy,cdp,withdrawalVal)
    const gasConsumption2 = increaseABit(await txObject2.estimateGas({from:user}))
    console.log({gasConsumption2})
    await txObject2.send({gas:gasConsumption2,from:user})
    await mineBlock()

    console.log("query user info again")
    userInfo = await B.getUserInfo(web3,networkId,user)
    assert.equal(userInfo.bCdpInfo.daiDebt.toString(10),web3.utils.toWei("550").toString(10),"user debt should be 550")
    assert.equal(userInfo.bCdpInfo.ethDeposit.toString(10),web3.utils.toWei("3").toString(10),"user depost should be 3")
    assert(userInfo.bCdpInfo.hasCdp, "user should have a B cdp")
    assert(! userInfo.makerdaoCdpInfo.hasCdp, "user should not have a makerdao cdp")

    console.log("export to makerdao")
    const proxy = userInfo.proxyInfo.userProxy
    const txObject3 = B.exportFresh(web3,networkId,proxy,cdp)
    const gasConsumption3 = increaseABit(await txObject3.estimateGas({from:user}))
    console.log({gasConsumption2})
    await txObject3.send({gas:gasConsumption3,from:user})
    await mineBlock()

    console.log("query user info again")
    userInfo = await B.getUserInfo(web3,networkId,user)

    assert.equal(userInfo.makerdaoCdpInfo.daiDebt.toString(10),web3.utils.toWei("550").toString(10),"user debt should be 550")
    assert.equal(userInfo.makerdaoCdpInfo.ethDeposit.toString(10),web3.utils.toWei("3").toString(10),"user depost should be 3")
    assert(userInfo.makerdaoCdpInfo.hasCdp, "user should have a maker cdp")

    assert.equal(userInfo.bCdpInfo.daiDebt.toString(10),web3.utils.toWei("0").toString(10),"user debt should be 550")
    assert.equal(userInfo.bCdpInfo.ethDeposit.toString(10),web3.utils.toWei("0").toString(10),"user depost should be 3")
  })

  it('read getStats', async function () {
    // read current status returnd from get stats
    const statsBefore = await B.getStats(web3, networkId)
    // deposit eth creating a new CDP
    const user = accounts[6]
    console.log("query user info")
    let userInfo = await B.getUserInfo(web3,networkId,user)
    assert(! userInfo.bCdpInfo.hasCdp, "user is not expected to have a cdp")
    assert(! userInfo.proxyInfo.hasProxy, "user is not expected to have a proxy")

    const depositVal = web3.utils.toWei("6") // 6 ETH

    let txObject = B.firstDeposit(web3,networkId,user)
    //console.log({txObject})
    let gasConsumption = increaseABit(await txObject.estimateGas({value:depositVal,from:user}))
    console.log({gasConsumption})
    await txObject.send({gas:gasConsumption,value:depositVal,from:user})
    await mineBlock()
    // .on('confirmation', function(confirmationNumber, receipt)


    console.log("query user info")
    userInfo = await B.getUserInfo(web3,networkId,user)
    //console.log(userInfo);
    const cdp = userInfo.bCdpInfo.cdp
    console.log({cdp})

    const withrawVal = web3.utils.toWei("600") // 600 dai
    console.log("proxy",userInfo.proxyInfo.userProxy)

    txObject = B.generateDai(web3,networkId,userInfo.proxyInfo.userProxy,cdp,withrawVal)
    //console.log({txObject})
    gasConsumption = increaseABit(await txObject.estimateGas({value:0,from:user}))
    console.log({gasConsumption})
    await txObject.send({gas:gasConsumption,value:0,from:user})
    await mineBlock()

    const statsAfter = await B.getStats(web3, networkId)

    assert.equal(statsAfter.cdpi.toString(10), web3.utils.toBN(statsBefore.cdpi).add(web3.utils.toBN('1')).toString(10), 'expected cdpi to be increasd by 1')
    assert.equal(statsAfter.eth.toString(10), web3.utils.toBN(statsBefore.eth).add(web3.utils.toBN(depositVal)).toString(10), 'expected eth to be increasd by 2 eth')
    assert(web3.utils.toBN(statsAfter.dai).gt(web3.utils.toBN(statsBefore.dai)), 'expected daiAfter to be grater then  dai before')
  })

  it('claimUnlockedCollateral', async function () {
    // read current status returnd from get stats
    const statsBefore = await B.getStats(web3, networkId)
    // deposit eth creating a new CDP
    const user = accounts[7]
    console.log("query user info")
    let userInfo = await B.getUserInfo(web3,networkId,user)
    assert(! userInfo.bCdpInfo.hasCdp, "user is not expected to have a cdp")
    assert(! userInfo.proxyInfo.hasProxy, "user is not expected to have a proxy")

    const depositVal = web3.utils.toWei("6") // 6 ETH

    let txObject = B.firstDeposit(web3,networkId,user)
    //console.log({txObject})
    let gasConsumption = increaseABit(await txObject.estimateGas({value:depositVal,from:user}))
    console.log({gasConsumption})
    await txObject.send({gas:gasConsumption,value:depositVal,from:user})
    await mineBlock()

    userInfo = await B.getUserInfo(web3,networkId,user)
    assert.equal(userInfo.bCdpInfo.unlockedEth.toString(10),"0", "unlockedEth should be 0")

    console.log("taking 1 wei from locked urn to unlocked urn")
    //console.log({userInfo})
    const minusOne = web3.utils.toTwosComplement('-1')
    txObject = B.claimUnlockedCollateral(web3, networkId, userInfo.proxyInfo.userProxy, userInfo.bCdpInfo.cdp, minusOne)
    gasConsumption = increaseABit(await txObject.estimateGas({value:0,from:user}))
    console.log({gasConsumption})
    await txObject.send({gas:gasConsumption,value:0,from:user})
    await mineBlock()

    userInfo = await B.getUserInfo(web3,networkId,user)
    assert.equal(userInfo.bCdpInfo.unlockedEth.toString(10),"1", "unlockedEth should be 1")

    console.log("taking 1 wei from unlocked urn to locked urn")
    txObject = B.claimUnlockedCollateral(web3, networkId, userInfo.proxyInfo.userProxy, userInfo.bCdpInfo.cdp, "1")
    gasConsumption = increaseABit(await txObject.estimateGas({value:0,from:user}))
    console.log({gasConsumption})
    await txObject.send({gas:gasConsumption,value:0,from:user})
    await mineBlock()

    userInfo = await B.getUserInfo(web3,networkId,user)
    assert.equal(userInfo.bCdpInfo.unlockedEth.toString(10),"0", "unlockedEth should be 0")
  })
})

function increaseABit(number) {
  return parseInt(1.2 * Number(number))
}

function sleep (ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

function closeEnough(a,b) {
  if(Number(a) > Number(b)) return closeEnough(b,a)
  if(Number(a)/Number(b) < 0.9999) return false

  return true;
}

async function sendEth (from, to, amountInWei) {
  await web3.eth.sendTransaction({ from: from, to: to, value: amountInWei })
}

async function increaseTime (addSeconds) {
  const util = require('util')
  const providerSendAsync = util.promisify((getTestProvider()).send).bind(
    getTestProvider()
  )

  /*
      getTestProvider().send({
              jsonrpc: "2.0",
              method: "evm_increaseTime",
              params: [addSeconds], id: 0
          }, console.log)
  */
  await providerSendAsync({
    jsonrpc: '2.0',
    method: 'evm_increaseTime',
    params: [addSeconds],
    id: 1
  })
}

const Web3 = require('web3')
function getTestProvider () {
  return new Web3.providers.WebsocketProvider('ws://localhost:8545')
}

async function mineBlock () {
  const util = require('util')
  const providerSendAsync = util.promisify((getTestProvider()).send).bind(
    getTestProvider()
  )
  await providerSendAsync({
    jsonrpc: '2.0',
    method: 'evm_mine',
    params: [],
    id: 1
  })
}

function isRevertErrorMessage (error) {
  if (error.message.search('invalid opcode') >= 0) return true
  if (error.message.search('revert') >= 0) return true
  if (error.message.search('out of gas') >= 0) return true
  return false
};
