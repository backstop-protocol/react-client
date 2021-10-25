import { wait } from '../test-utils'

describe('resets hardhat', () => {
  before('resets', () => {
    //read snapshot
    cy.readFile('./tests/snapshot-id.txt')
      .then(snapshotId => {
        // revert to snapshot
        return cy.request("POST", "http://localhost:8545", {
          "jsonrpc": "2.0",
          "method": "evm_revert",
          "params": [snapshotId],
          "id": 1
        })
      })
      .then(({ body }) => {
        cy.log("revert success: " + body.result)
      })

    cy.wait(wait.short)
    // take new snapshot
    cy.request("POST", "http://localhost:8545", {
      "jsonrpc": "2.0",
      "method": "eth_blockNumber",
      "params": [],
      "id": 1
    })
      .then(({ body }) => {
        cy.log("eth_blockNumber: " + body.result)
        return cy.request("POST", "http://localhost:8545", {
          "jsonrpc": "2.0",
          "method": "evm_snapshot",
          "params": [body.result],
          "id": 1
        })
      })
      .then(({ body }) => {
        cy.log("snapshot-id.txt: " + body.result)
        // write snapshot to disk
        return cy.writeFile('./tests/snapshot-id.txt', body.result)
      })

    cy.log("snapshot done! ")

    cy.request("POST", "http://localhost:8545", {
      "jsonrpc": "2.0",
      "method": "mine_block",
      "params": [],
      "id": 1
    })

    cy.request("POST", "http://localhost:8545", {
      "jsonrpc": "2.0",
      "method": "mine_block",
      "params": [],
      "id": 1
    })

    cy.request("POST", "http://localhost:8545", {
      "jsonrpc": "2.0",
      "method": "mine_block",
      "params": [],
      "id": 1
    })

    cy.request("POST", "http://localhost:8545", {
      "jsonrpc": "2.0",
      "method": "mine_block",
      "params": [],
      "id": 1
    })

    cy.request("POST", "http://localhost:8545", {
      "jsonrpc": "2.0",
      "method": "mine_block",
      "params": [],
      "id": 1
    })
    cy.log("mined 5 blocks")
  })

  it('validates address', () => {
    cy.getMetamaskWalletAddress().then(address => {
      expect(address).to.equal("0xF994Eba5f3F33EbC5a03d9B5e195765eeb29a923")
    })
  })

  it('accept metamask access', {retries: 10}, () => {
    cy.resetMetamaskAccount() // fix 
    cy.visit('/')
    cy.contains('Connect').click()
    cy.contains('Meta Mask').click()
    cy.wait(wait.short)
    // cy.acceptMetamaskAccess()
  })

  it('validates balance', () => {
    cy.wait(wait.short)
    cy.contains("Deposit").click()
    cy.wait(wait.short)
    cy.contains("1111 ETH")
  })
})
// TODO: reapy some DAI before repay all
describe('Wallet tests', () => {

  before('connect', () => {
    cy.visit('/')
    cy.contains('Connect').click()
    cy.contains('Meta Mask').click()
  })

  it('deposit 14.444 ether', () => {
    
    cy.get('#Deposit-ETH').click()
    cy.wait(wait.short)
    cy.get('#ETH-box').find('input').type('14.444')
    cy.get('#ETH-box').find('.currency-input').find('button').click()

  })
  it('confirm deposit 14.444 ether', {retries: 10}, () => {
    cy.wait(wait.short)
    cy.confirmMetamaskTransaction()
  })

  it('validates deposited amount', () => {
    cy.wait(wait.short)
    cy.get('#ETH-box').find('.currency-value').find('p').should('have.text', '14.4440 ETH')
  })

  it('borrows 10555.55 DAI', () => {
    cy.wait(wait.short)
    cy.get('#Borrow-DAI').click()
    cy.wait(wait.short)
    cy.get('#DAI-box').find('input').clear().type('10555.55')
    cy.get('#DAI-box').find('.currency-input').find('button').click({force: true })
  })

  it('confirm borrow TX', {retries: 10}, () => {
    cy.wait(wait.short)
    cy.confirmMetamaskTransaction()
  })

  it('validates borrowd amount', {retries: 10}, () => {
    cy.wait(wait.short)
    cy.get('#DAI-box').find('.currency-value').find('p').should('have.text', '10555.55 DAI')
  })

  it('validates set max', () => {
    cy.wait(wait.short)
    cy.get('#Repay-DAI').click()
    cy.wait(wait.short)
    cy.get('#DAI-box').contains("Set Max").click()
    cy.get('#DAI-box').find('input').should('have.value', '10555.55')
  })

  it('unlock DAI', () => {
    cy.get('#DAI-box').find('.currency-input').find('button').should('have.class', 'disabled')
    cy.get('#DAI-box').find('.tickbox').click()
    cy.wait(wait.short)
    cy.confirmMetamaskPermissionToSpend()
    cy.wait(wait.short)
    cy.get('#DAI-box').find('.currency-input').find('button').should('not.have.class', 'disabled')
  })

  it('validates borrow limit', () => {
    cy.get('.limit-bar-track').contains("33.54%")
  })

  it('repays all DAI', () => {
    cy.get('#DAI-box').find('.currency-input').find('button').click()
  })

  it('confrims repay all DAI TX', {retries: 10}, () => {
    cy.wait(wait.short)
    cy.confirmMetamaskTransaction()
  })

  it('validates repay all', {retries: 10}, () => {
    cy.wait(wait.short)
    cy.get('.limit-bar-track').contains("0.00%")
    cy.get('#DAI-box').find('.currency-value').find('p').should('have.text', '0.00 DAI')
  })

  it('withdraw one ether', () => {
    cy.get('#Withdraw-ETH').click()
    cy.wait(wait.short)
    cy.get('#ETH-box').find('input').type('1')
    cy.get('#ETH-box').find('.currency-input').find('button').click()
    cy.contains('Withdrawing 1 ETH')
  })

  it('confirm withdraw one ether', {retries: 10}, () => {
    cy.wait(wait.short)
    cy.confirmMetamaskTransaction()
  })

  it('validates withdraw amount', () => {
    cy.wait(wait.short)
    cy.get('#ETH-box').find('.currency-value').find('p').should('have.text', '13.4440 ETH')
  })

  it('withdraw all ether', () => {
    cy.get('#Withdraw-ETH').click()
    cy.wait(wait.short)
    cy.get('#ETH-box').contains("Set Max").click()
    cy.get('#ETH-box').find('input').should('have.value', '13.444')
    cy.get('#ETH-box').find('.currency-input').find('button').click({force: true})
    cy.contains('Withdrawing 13.444 ETH')
  })

  it('confirm withdraw all ether TX', {retries: 10}, () => {
    cy.wait(wait.short)
    cy.confirmMetamaskTransaction()
  })

  it('validates withdraw amount', () => {
    cy.wait(wait.short)
    cy.get('#ETH-box').find('.currency-value').find('p').should('have.text', '0.0000 ETH')
  })
})

describe('repay some dai', () => {

  it('deposit 14.444 ether', () => {
    
    cy.get('#Deposit-ETH').click()
    cy.wait(wait.short)
    cy.get('#ETH-box').find('input').type('14.444')
    cy.get('#ETH-box').find('.currency-input').find('button').click()

  })
  it('confirm deposit 14.444 ether', {retries: 10}, () => {
    cy.wait(wait.short)
    cy.confirmMetamaskTransaction()
  })

  it('validates deposited amount', () => {
    cy.wait(wait.short)
    cy.get('#ETH-box').find('.currency-value').find('p').should('have.text', '14.4440 ETH')
  })

  it('borrows 25000.00 DAI', () => {
    cy.wait(wait.short)
    cy.get('#Borrow-DAI').click()
    cy.wait(wait.short)
    cy.get('#DAI-box').find('input').clear().type('25000.00 DAI')
    cy.get('#DAI-box').find('.currency-input').find('button').click({force: true })
  })

  it('confirm borrow TX', {retries: 10}, () => {
    cy.wait(wait.short)
    cy.confirmMetamaskTransaction()
  })

  it('validates borrowd amount', {retries: 10}, () => {
    cy.wait(wait.short)
    cy.get('#DAI-box').find('.currency-value').find('p').should('have.text', '25000.00 DAI')
  })

  it('repays some DAI', () => {
    cy.wait(wait.short)
    cy.get('#Repay-DAI').click()
    cy.wait(wait.short)
    cy.get('#DAI-box').find('input').clear().type('10000')
    cy.get('#DAI-box').find('.currency-input').find('button').click()
  })

  it('confrims repay some DAI TX', {retries: 10}, () => {
    cy.wait(wait.short)
    cy.confirmMetamaskTransaction()
  })

  it('validates repay some', {retries: 10}, () => {
    cy.wait(wait.short)
    cy.get('#DAI-box').find('.currency-value').find('p').should('have.text', '15000.00 DAI')
  })
})