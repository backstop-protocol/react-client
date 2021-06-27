'use strict'
// const Web3 = require('web3');
// const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
require = require("esm")(module/*, options*/)
const B = require('../../src/lib/bInterface')
let networkId
let wbtcWhale

const WBTC_A_ILK = "0x574254432d410000000000000000000000000000000000000000000000000000"

const ilk = WBTC_A_ILK

contract('B Interface', function (accounts) {
  beforeEach('initing', async () => {
    networkId = await web3.eth.net.getId()
    if(networkId === 42) wbtcWhale = "0xd921Ecdc928FA3aA6C1de5856D392C0279F6704B"
    else wbtcWhale = "0x6555e1CC97d3cbA6eAddebBCD7Ca51d75771e0B8"

    console.log({networkId})
  })
  afterEach(async () => {
  })

  it('open proxy', async function () {
    const user = accounts[0]
    console.log("query user info")
    let userInfo = await B.getUserInfo(web3,networkId,user, ilk)
    assert(! userInfo.bCdpInfo.hasCdp, "user is not expected to have a cdp")
    assert(! userInfo.proxyInfo.hasProxy, "user is not expected to have a proxy")

    // open new proxy
    await doTx(B.openProxy(web3, networkId, user), user)

    console.log("query user info again")
    userInfo = await B.getUserInfo(web3,networkId,user, ilk)
    assert(! userInfo.bCdpInfo.hasCdp, "user is not expected to have a cdp")
    assert(userInfo.proxyInfo.hasProxy, "user is expected to have a proxy")
  })

  it('first deposit', async function () {
    const user = wbtcWhale
    console.log("query user info")
    let userInfo = await B.getUserInfo(web3,networkId,user, ilk)
    assert(! userInfo.bCdpInfo.hasCdp, "user is not expected to have a cdp")
    assert(userInfo.proxyInfo.hasProxy, "user is expected to have a proxy")

    // open new proxy
    //await doTx(B.openProxy(web3, networkId, user), user)

    console.log("query user info again")
    userInfo = await B.getUserInfo(web3,networkId,user, ilk)
    assert(! userInfo.bCdpInfo.hasCdp, "user is not expected to have a cdp")
    assert(userInfo.proxyInfo.hasProxy, "user is expected to have a proxy")

    // give WBTC allowance
    await doTx(B.unlockGem(web3, networkId, userInfo.proxyInfo.userProxy, ilk), user)

    // deposit first
    const amt = toWbtcWei("2") // 0.2 WBTC
    console.log(amt.toString(10), userInfo.proxyInfo.userProxy)
    await doTx(B.firstDepositGem(web3, networkId, userInfo.proxyInfo.userProxy, amt.toString(10), ilk), user)

    console.log("query user info again")
    userInfo = await B.getUserInfo(web3,networkId,user, ilk)
    //console.log({userInfo})
    assert(userInfo.bCdpInfo.hasCdp, "user is expected to have a cdp")
    assert(userInfo.proxyInfo.hasProxy, "user is expected to have a proxy")
    assert.equal(userInfo.bCdpInfo.ethDeposit.toString(10), toWbtcWei("2"), "unexpected ink")
  })

  it('repay gem', async function () {
    const user = wbtcWhale
    console.log("query user info")
    let userInfo = await B.getUserInfo(web3,networkId,user, ilk)

    console.log("withdraw gem")
    const amt = toWbtcWei("0.1") // 0.1 WBTC    
    await doTx(B.withdrawGem(web3, networkId, userInfo.proxyInfo.userProxy, userInfo.bCdpInfo.cdp, amt.toString(10), ilk), user)

    console.log("query user info again")
    userInfo = await B.getUserInfo(web3,networkId,user, ilk)
    //console.log({userInfo})
    assert(userInfo.bCdpInfo.hasCdp, "user is expected to have a cdp")
    assert(userInfo.proxyInfo.hasProxy, "user is expected to have a proxy")
    assert.equal(userInfo.bCdpInfo.ethDeposit.toString(10), toWbtcWei("1.9"), "unexpected ink")
  })

  it('second deposit', async function () {
    const user = wbtcWhale
    console.log("query user info")
    let userInfo = await B.getUserInfo(web3,networkId,user, ilk)

    console.log("depositing again")
    const amt = toWbtcWei("0.1") // 0.1 WBTC
    await doTx(B.depositGem(web3, networkId, userInfo.proxyInfo.userProxy, userInfo.bCdpInfo.cdp, amt.toString(10), ilk), user)

    console.log("query user info again")
    userInfo = await B.getUserInfo(web3,networkId,user, ilk)
    //console.log({userInfo})
    assert(userInfo.bCdpInfo.hasCdp, "user is expected to have a cdp")
    assert(userInfo.proxyInfo.hasProxy, "user is expected to have a proxy")
    assert.equal(userInfo.bCdpInfo.ethDeposit.toString(10), toWbtcWei("2"), "unexpected ink")
  })

  it('generate dai', async function () {
    const user = wbtcWhale

    console.log("query user info")
    const userInfo = await B.getUserInfo(web3,networkId,user,ilk)
    //console.log(userInfo);
    const cdp = userInfo.bCdpInfo.cdp
    console.log({cdp})

    const withrawVal = web3.utils.toWei("6000") // 6000 dai
    console.log("proxy",userInfo.proxyInfo.userProxy)

    await doTx(B.generateDai(web3,networkId,userInfo.proxyInfo.userProxy,cdp,withrawVal), user)

    console.log("query user info again")
    const userInfoAfter = await B.getUserInfo(web3,networkId,user, ilk)
    assert(userInfoAfter.bCdpInfo.hasCdp,"user is expected to have a cdp")
    assert(closeEnough(web3.utils.fromWei(userInfoAfter.bCdpInfo.daiDebt.toString(10)),web3.utils.fromWei(web3.utils.toWei("6000").toString(10))),"user eth balance is expected to be 2")
    assert(userInfoAfter.proxyInfo.hasProxy, "user is expected to have a proxy")
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

function toWbtcWei(n) {
  const bigN = new web3.utils.toBN(web3.utils.toWei(n))
  const _1e10 = new web3.utils.toBN(10**10)

  return bigN.div(_1e10)
}

async function doTx(txObject, from) {
  const gasConsumption = increaseABit(await txObject.estimateGas({value:0,from:from}))
  console.log({gasConsumption})
  await txObject.send({gas:gasConsumption,value:0,from:from})
  await mineBlock()  
}