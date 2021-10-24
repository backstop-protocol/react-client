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
// TODO: test the top borrow limit bar
describe('compound basic user fllow', () => {
  
  it('connect', () => {
    cy.visit('/compound')
    cy.contains('Connect').click()
    cy.contains('Meta Mask').click()
  })

  context('when user deposit ETH', () => {
    
    it('should show correct balance', () => {
      cy.wait(wait.short)
      cy.get('#deposit-ETH').click({force: true})
      cy.wait(wait.short)
      cy.get('#deposit-ETH-action-box').find('.wallet-balance').should('have.text', '1111 ETH')
    })

    it('should show a warrning when trying to deposit more then the actual balance', () => {
      cy.get('#deposit-ETH-action-box').find('input').type('1112')
      cy.get('.tooltip.warning').contains('Amount exceeds wallet balance')
    })

    it('should calculate and display the deposited amount in USD', () => {
      cy.get('#deposit-ETH-action-box').find('input').clear().type('100')
      cy.get('#deposit-ETH-action-box').find('.calculated-total-deposit-in-usd').should('have.text', '$325478.0622')
    })

    it('should calculate and display the borrow limit amount in USD', () => {
      cy.get('#deposit-ETH-action-box').find('input').clear().type('100')
      cy.get('#deposit-ETH-action-box').find('.calculated-borrow-limit').should('have.text', '$244,108.54')
    })

    it('should deposit ETH', () => {
      cy.get('#total-supply-balance').should('have.text', '$0')
      cy.get('#deposit-ETH-action-box').find('.currency-input-button').click({force: true})
      cy.get('#deposit-ETH-action-box .loader-text').contains('Depositing 100 ETH ')
    })

    it('should confirm the deposit ETH TX', {retries: 10}, () => {
      cy.wait(wait.short)
      cy.confirmMetamaskTransaction()
    })

    it('should validate the ETH deposit ', () => {
      cy.wait(wait.short)
      cy.get('#total-supply-balance').should('have.text', '$325478.06')
    })
  })

  context('when user borrow BAT', () => {

    it('should show correct balance', () => {
      cy.get('#borrow-BAT').click({force: true})
      cy.wait(wait.short)
      cy.get('#borrow-BAT-action-box').find('.wallet-balance').should('have.text', '0 BAT')
    })

    it('should show a warrning when trying to borrow more then allowed', () => {
      cy.get('#borrow-BAT-action-box').find('input').type('100000000')
      cy.get('.tooltip.warning').contains('Amount exceeds allowed borrowed')
    })

    it('should calculate and display the borrowed amount in USD', () => {
      cy.get('#borrow-BAT-action-box').find('input').clear().type('100')
      cy.get('#borrow-BAT-action-box').find('.calculated-borrowed').should('have.text', '$82.90')
    })

    it('should borrow BAT', () => {
      cy.get('#total-borrowed-balance').should('have.text', '$0')
      cy.get('#borrow-BAT-action-box').find('.currency-input-button').click({force: true})
      cy.get('#borrow-BAT-action-box .loader-text').contains('Borrowing 100 BAT ')
    })

    it('should confirm borrow BAT TX', {retries: 10}, () => {
      cy.wait(wait.short)
      cy.confirmMetamaskTransaction()
    })

    it('should validate the borrowes BAT amount', {retries: 10}, () => {
      cy.wait(wait.short)
      cy.get('#total-borrowed-balance').should('have.text', '$82.90')
    })
  })

  context('when user repay all BAT', () => {

    it('should show correct balance', () => {
      cy.get('#repay-BAT').click({force: true})
      cy.wait(wait.short)
      cy.get('#repay-BAT-action-box').find('.wallet-balance').should('have.text', '100 BAT')
      cy.wait(wait.short)
    })

    it('should show a warrning when trying to repay without allowance', () => {
      cy.get('#repay-BAT-action-box').find('input').type('10')
      cy.get('.tooltip.warning').contains('Amount exceeds allowance, unlock the token to grant allowance')
    })

    it('unlock BAT toggle', () => {
      cy.wait(wait.short)
      cy.get('#repay-BAT-action-box').find('.tickbox').click({force: true})
      cy.get('#repay-BAT-action-box').find('.tickbox').should('have.class', 'loading')
    })

    it('unlock BAT confirm allowance', {retries: 10}, () => {
      cy.wait(wait.short)
      cy.confirmMetamaskPermissionToSpend()

    })

    it('validate BAT is unlocked', {retries: 10}, () => {
      cy.wait(wait.short)
      cy.get('#repay-BAT-action-box').find('.tickbox').should('have.class', 'active')
    })

    it('should show a warrning when trying to repay more then wallet balance', () => {
      cy.get('#repay-BAT-action-box').find('input').type('1000')
      cy.get('.tooltip.warning').contains('Amount exceeds wallet balance')
    })

    it('it sets max', () => {
      cy.get('#repay-BAT-action-box').contains('Set Max').click()
      cy.get('#repay-BAT-action-box').find('input').should('have.value', '100')
    })

    it('should click repay BAT', {retries: 10}, () => {
      cy.wait(wait.short)
      cy.get('#repay-BAT-action-box').find('.currency-input-button').click({force: true})
      cy.get('#repay-BAT-action-box .loader-text').should('be.visible').contains('Repaying 100 BAT ')
    })

    it('should confirm repay all BAT', {retries: 10}, () => {
      cy.wait(wait.short)
      cy.confirmMetamaskTransaction()
    })

    it('should validate repay all BAT', {retries: 10}, () => {
      cy.wait(wait.short)
      cy.get('#total-borrowed-balance').should('have.text', '$0.00')
    })
  })

  context('when user borrow WBTC', () => {

    it('should show correct balance', () => {
      cy.get('#borrow-WBTC').click({force: true})
      cy.wait(wait.short)
      cy.get('#borrow-WBTC-action-box').find('.wallet-balance').should('have.text', '0 WBTC')
      cy.wait(wait.short)
    })

    it('should calculate and display the borrowed amount in USD', () => {
      cy.get('#borrow-WBTC-action-box').find('input').clear().type('2')
      cy.get('#borrow-WBTC-action-box').find('.calculated-borrowed').should('have.text', '$98,244.40')
    })

    it('should click borrow WBTC', () => {
      cy.get('#total-borrowed-balance').should('have.text', '$0.00')
      cy.get('#borrow-WBTC-action-box').find('.currency-input-button').click({force: true})
      cy.get('#borrow-WBTC-action-box .loader-text').contains('Borrowing 2 WBTC ')
    })

    it('should confirm borrow WBTC', {retries: 10}, () => {
      cy.wait(wait.short)
      cy.confirmMetamaskTransaction()
    })

    it('should validate borrow WBTC', {retries: 10},  () => {
      cy.wait(wait.short)
      cy.get('#total-borrowed-balance').should('have.text', '$98244.40')
    })
  })

  context('when user repay some WBTC', () => {

    it('should show correct balance', () => {
      cy.get('#repay-WBTC').click({force: true})
      cy.wait(wait.short)
      cy.get('#repay-WBTC-action-box').find('.wallet-balance').should('have.text', '2 WBTC')
    })

    it('should show a warrning when trying to repay without allowance', () => {
      cy.get('#repay-WBTC-action-box').find('input').type('1')
      cy.get('.tooltip.warning').contains('Amount exceeds allowance, unlock the token to grant allowance')
    })

    it('unlock WBTC', () => {
      cy.wait(wait.short)
      cy.get('#repay-WBTC-action-box').find('.tickbox').click({force: true})
      cy.wait(wait.short)
      cy.get('#repay-WBTC-action-box').find('.tickbox').should('have.class', 'loading')
    })

    it('confirm unlock WBTC TX', {retries: 10}, () => {
      cy.wait(wait.short)
      cy.confirmMetamaskPermissionToSpend()
    })

    it('validates unlock WBTC TX', {retries: 10}, () => {
      cy.wait(wait.short)
      cy.get('#repay-WBTC-action-box').find('.tickbox').should('have.class', 'active')
    })

    it('validates unlock WBTC TX', {retries: 10}, () => {
      cy.wait(wait.short)
      cy.get('#repay-WBTC-action-box').find('.tickbox').should('have.class', 'active')
    })

    it('should click on repay a part WBTC debt', {retries: 10}, () => {
      cy.wait(wait.short)
      cy.get('#repay-WBTC-action-box').find('input').clear().type('0.5')
      cy.get('#repay-WBTC-action-box').find('.currency-input-button').click({force: true})
      cy.get('#repay-WBTC-action-box .loader-text').contains('Repaying 0.5 WBTC ')
    })

    it('should confirm repay a part WBTC debt', {retries: 10}, () => {
      cy.wait(wait.short)
      cy.confirmMetamaskTransaction()
    })

    it('should validate repay a part WBTC debt', {retries: 10}, () => {
      cy.wait(wait.short)
      cy.get('#total-borrowed-balance').should('have.text', '$73683.30')
    })

  })

  context('when user deposits some WBTC', () => {
    
    it('should show correct balance', () => {
      cy.get('#deposit-WBTC').click({force: true})
      cy.wait(wait.short)
      cy.get('#deposit-WBTC-action-box').find('.wallet-balance').should('have.text', '1.5 WBTC')
    })

    it('should show a warrning when trying to deposit more then the actual balance', () => {
      cy.get('#deposit-WBTC-action-box').find('input').type('2')
      cy.get('.tooltip.warning').contains('Amount exceeds wallet balance')
    })

    it('should calculate and display the deposited amount in USD', () => {
      cy.get('#deposit-WBTC-action-box').find('input').clear().type('1')
      cy.get('#deposit-WBTC-action-box').find('.calculated-total-deposit-in-usd').should('have.text', '$374600.2635')
    })

    it('should calculate and display the borrow limit amount in USD', () => {
      cy.get('#deposit-WBTC-action-box').find('input').clear().type('1.1')
      cy.get('#deposit-WBTC-action-box').find('.calculated-borrow-limit').should('have.text', '$279,230.92')
    })

    it('should click on deposit WBTC', () => {
      cy.get('#WBTC-deposited-usd').should('have.text', '0 USD')
      cy.get('#WBTC-deposited').should('have.text', '0 WBTC')
      cy.get('#deposit-WBTC-action-box').find('.currency-input-button').click({force: true})
      cy.get('#deposit-WBTC-action-box .loader-text').contains('Depositing 1.1 WBTC ')
    })

    it('should confirm deposit WBTC', {retries: 10}, () => {
      cy.wait(wait.short)
      cy.confirmMetamaskTransaction()
    })

    it('should display the deposited WBTC amount correctly', {retries: 10}, () => {
      cy.get('#WBTC-deposited-usd').should('have.text', '54034.4195 USD')
      cy.get('#WBTC-deposited').should('have.text', '1.0999 WBTC')    
    })

  })

  context('when user withdraws 1 WBTC', () => {

    it('should click withdraw 1 WBTC', () => {
      cy.get('#withdraw-WBTC').click({force: true})
      cy.get('#withdraw-WBTC-action-box').find('input').type('1')
      cy.get('#withdraw-WBTC-action-box').find('.currency-input-button').click({force: true})
      cy.get('#withdraw-WBTC-action-box').contains('Withdrawing 1 WBTC ')
    })

    it('should confirm withdraw 1 WBTC', {retries: 10}, () => {
      cy.wait(wait.short)
      cy.confirmMetamaskTransaction()
    })

    it('should validate withdraw 1 WBTC', {retries: 10}, () => {
      cy.wait(wait.short)
      cy.get('#WBTC-deposited').should('have.text', '0.1 WBTC')    
    })
  })

})