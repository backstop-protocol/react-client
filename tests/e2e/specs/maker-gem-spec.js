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
    //cy.acceptMetamaskAccess()
  })

  it('validates balance', () => {
    cy.wait(wait.short)
    cy.contains("Deposit").click()
    cy.wait(wait.short)
    cy.contains("1111 ETH")
  })
})

describe('generate WBTC', () => {

  it('connect', () => {
    cy.visit('/compound')
    cy.contains('Connect').click()
    cy.contains('Meta Mask').click()
    cy.wait(wait.short)
  })

  it('should show correct balance', () => {
    cy.wait(wait.short)
    cy.get('#deposit-ETH').click({force: true})
    cy.wait(wait.short)
    cy.get('#deposit-ETH-action-box').find('.wallet-balance').should('have.text', '1111 ETH')
  })

  it('should deposit ETH', () => {
    cy.get('#total-supply-balance').should('have.text', '$0')
    cy.get('#deposit-ETH-action-box').find('input').clear().type('100')
    cy.get('#deposit-ETH-action-box').find('.currency-input-button').click({force: true})
    cy.get('#deposit-ETH-action-box .loader-text').contains('Depositing 100 ETH ')
  })

  it('should confirm deposit ETH TX', {retries: 10}, () => {
    cy.wait(wait.short)
    cy.confirmMetamaskTransaction()
  })

  it('should validate deposit ETH ', {retries: 10}, () => {
    cy.wait(wait.short)
    cy.get('#total-supply-balance').should('have.text', '$325478.06')
  })

  it('should show correct balance', () => {
    cy.get('#borrow-WBTC').click({force: true})
    cy.wait(wait.short)
    cy.get('#borrow-WBTC-action-box').find('.wallet-balance').should('have.text', '0 WBTC')
    cy.wait(wait.short)
  })

  it('should click borrow WBTC', {retries: 10}, () => {
    cy.get('#borrow-WBTC-action-box').find('input').clear().type('2')
    cy.get('#borrow-WBTC-action-box').find('.currency-input-button').click({force: true})
    cy.get('#borrow-WBTC-action-box .loader-text').should('be.visible').contains('Borrowing 2 WBTC ')
  })

  it('should confirm borrow WBTC', {retries: 10}, () => {
    cy.wait(wait.short)
    cy.confirmMetamaskTransaction()
  })
})

describe('Wallet tests', () => {

  before('connect', () => {
    cy.visit('/')
    cy.contains('Connect').click()
    cy.contains('Meta Mask').click()
    cy.wait(4 * 1000)
  })

  context('testing maker gem user flow depositing WBTC', () =>{

    it('should switch tab', () => {
      cy.contains('WBTC-A').click()
      cy.wait(1 * 1000)
      cy.contains('WBTC Locked')
    })

    it('deposits 1 wbtc', () => {
      cy.get('#Deposit-WBTC').click({force: true})
      cy.get('#WBTC-box').find('input').type('1', {force: true})
      cy.get('#WBTC-box').find('.currency-input').find('button').click({force: true})
      cy.contains('Follow Steps')
    })

    it('Create a proxy account', () => {
      cy.get('#step-1').find('.tickbox').click()
      cy.wait(4 * 1000)
      cy.wait(4 * 1000)
      cy.confirmMetamaskTransaction()
      cy.wait(4 * 1000)
      cy.wait(4 * 1000)
      cy.get('#step-1').contains('Done')
    })

    it('Create a proxy account done', () => {
      cy.wait(4 * 1000)
      cy.wait(4 * 1000)
      cy.get('#step-1').contains('Done')
    })

    it('Unlocks gem', () => {
      cy.get('#step-2').find('.tickbox').click()
      cy.wait(4 * 1000)
      cy.wait(4 * 1000)
      cy.confirmMetamaskPermissionToSpend()
      cy.wait(4 * 1000)
      cy.wait(4 * 1000)
      cy.get('#step-2').contains('Done')
    })

    it('Unlocks gem done', () => {
      cy.wait(4 * 1000)
      cy.wait(4 * 1000)
      cy.get('#step-2').contains('Done')
    })

    it('makes the gem deposit', ()=>{
      cy.get('#modal-btn').click()
      cy.wait(4 * 1000)
      cy.wait(4 * 1000)
      cy.confirmMetamaskTransaction()
      cy.wait(4 * 1000)
      cy.wait(4 * 1000)
      cy.get('#WBTC-box').find('.currency-value').find('p').should('have.text', '1.00000 WBTC')
      cy.get('#WBTC-box').find('.currency-value').find('small').should('have.text', '49284.04 USD')
    })
    it('validats the gem deposit', ()=>{
      cy.wait(4 * 1000)
      cy.wait(4 * 1000)
      cy.get('#WBTC-box').find('.currency-value').find('p').should('have.text', '1.00000 WBTC')
      cy.get('#WBTC-box').find('.currency-value').find('small').should('have.text', '49284.04 USD')
    })
  
  })

})