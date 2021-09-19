// TODO: test the top borrow limit bar
describe('compound basic user fllow', () => {
  before('connect', () => {
    cy.visit('/compound')
    cy.contains('Connect').click()
    cy.contains('Meta Mask').click()
    cy.wait(4 * 1000)
  })

  context('when user deposit ETH', () => {
    
    it('should show correct balance', () => {
      cy.get('#deposit-ETH').click({force: true})
      cy.wait(4 * 1000)
      cy.get('#deposit-ETH-action-box').find('.wallet-balance').should('have.text', '1111 ETH')
      cy.wait(4 * 1000)
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
      cy.get('#deposit-ETH-action-box').find('.currency-input-button').click()
      cy.wait(4 * 1000)
      cy.confirmMetamaskTransaction()
      cy.wait(4 * 1000)
      cy.get('#total-supply-balance').should('have.text', '$325478.06')
    })

  })

  context('when user borrow BAT', () => {

    it('should show correct balance', () => {
      cy.get('#borrow-BAT').click({force: true})
      cy.wait(4 * 1000)
      cy.get('#borrow-BAT-action-box').find('.wallet-balance').should('have.text', '0 BAT')
      cy.wait(4 * 1000)
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
      cy.get('#borrow-BAT-action-box').find('.currency-input-button').click()
      cy.wait(4 * 1000)
      cy.confirmMetamaskTransaction()
      cy.wait(4 * 1000)
      cy.get('#total-borrowed-balance').should('have.text', '$82.90')
    })
  })

  context('when user repay all BAT', () => {

    it('should show correct balance', () => {
      cy.get('#repay-BAT').click({force: true})
      cy.wait(4 * 1000)
      cy.get('#repay-BAT-action-box').find('.wallet-balance').should('have.text', '100 BAT')
      cy.wait(4 * 1000)
    })

    it('should show a warrning when trying to repay without allowance', () => {
      cy.get('#repay-BAT-action-box').find('input').type('10')
      cy.get('.tooltip.warning').contains('Amount exceeds allowance, unlock the token to grant allowance')
    })

    it('unlock BAT', () => {
      cy.wait(4 * 1000)
      cy.get('#repay-BAT-action-box').find('.tickbox').click({force: true})
      cy.get('#repay-BAT-action-box').find('.tickbox').should('have.class', 'loading')
      cy.wait(4 * 1000)
      cy.confirmMetamaskPermissionToSpend()
      cy.wait(4 * 1000)
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

    it('should repay all BAT', () => {
      cy.get('#repay-BAT-action-box').find('.currency-input-button').click({force: true})
      cy.wait(4 * 1000)
      cy.wait(4 * 1000)
      cy.confirmMetamaskTransaction()
      cy.wait(4 * 1000)
      cy.get('#total-borrowed-balance').should('have.text', '$0.00')
    })

  })

  context('when user borrow WBTC', () => {

    it('should show correct balance', () => {
      cy.get('#borrow-WBTC').click({force: true})
      cy.wait(1 * 1000)
      cy.get('#borrow-WBTC-action-box').find('.wallet-balance').should('have.text', '0 WBTC')
      cy.wait(1 * 1000)
    })


    it('should calculate and display the borrowed amount in USD', () => {
      cy.get('#borrow-WBTC-action-box').find('input').clear().type('2')
      cy.get('#borrow-WBTC-action-box').find('.calculated-borrowed').should('have.text', '$98,244.40')
    })

    it('should borrow WBTC', () => {
      cy.get('#total-borrowed-balance').should('have.text', '$0.00')
      cy.get('#borrow-WBTC-action-box').find('.currency-input-button').click()
      cy.wait(4 * 1000)
      cy.wait(4 * 1000)
      cy.confirmMetamaskTransaction()
      cy.wait(4 * 1000)
      cy.get('#total-borrowed-balance').should('have.text', '$98244.40')
    })
  })

  context('when user repay some WBTC', () => {

    it('should show correct balance', () => {
      cy.get('#repay-WBTC').click({force: true})
      cy.wait(4 * 1000)
      cy.get('#repay-WBTC-action-box').find('.wallet-balance').should('have.text', '2 WBTC')
      cy.wait(4 * 1000)
    })

    it('should show a warrning when trying to repay without allowance', () => {
      cy.get('#repay-WBTC-action-box').find('input').type('1')
      cy.get('.tooltip.warning').contains('Amount exceeds allowance, unlock the token to grant allowance')
    })

    it('unlock WBTC', () => {
      cy.wait(4 * 1000)
      cy.get('#repay-WBTC-action-box').find('.tickbox').click({force: true})
      cy.get('#repay-WBTC-action-box').find('.tickbox').should('have.class', 'loading')
      cy.wait(4 * 1000)
      cy.confirmMetamaskPermissionToSpend()
      cy.wait(4 * 1000)
      cy.get('#repay-WBTC-action-box').find('.tickbox').should('have.class', 'active')
    })

    it('should repay a part WBTC debt', () => {
      cy.get('#repay-WBTC-action-box').find('input').clear().type('0.5')
      cy.get('#repay-WBTC-action-box').find('.currency-input-button').click({force: true})
      cy.wait(4 * 1000)
      cy.wait(4 * 1000)
      cy.confirmMetamaskTransaction()
      cy.wait(4 * 1000)
      cy.get('#total-borrowed-balance').should('have.text', '$73683.30')
    })

  })

  context('when user deposits some WBTC', () => {
    
    it('should show correct balance', () => {
      cy.get('#deposit-WBTC').click({force: true})
      cy.wait(4 * 1000)
      cy.get('#deposit-WBTC-action-box').find('.wallet-balance').should('have.text', '1.5 WBTC')
      cy.wait(4 * 1000)
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

    it('should deposit WBTC and display the amount correctly', () => {
      cy.get('#WBTC-deposited-usd').should('have.text', '0 USD')
      cy.get('#WBTC-deposited').should('have.text', '0 WBTC')
      cy.get('#deposit-WBTC-action-box').find('.currency-input-button').click()
      cy.wait(4 * 1000)
      cy.wait(4 * 1000)
      cy.confirmMetamaskTransaction()
      cy.wait(4 * 1000)
      cy.get('#WBTC-deposited-usd').should('have.text', '54034.4195 USD')
      cy.get('#WBTC-deposited').should('have.text', '1.0999 WBTC')    
    })

  })

  context('when user withdraws 1 WBTC', () => {

    it('should witdraw 1 WBTC', () => {
      cy.get('#withdraw-WBTC').click({force: true})
      cy.get('#withdraw-WBTC-action-box').find('input').type('1')
      cy.get('#withdraw-WBTC-action-box').find('.currency-input-button').click({force: true})
      cy.wait(4 * 1000)
      cy.wait(4 * 1000)
      cy.confirmMetamaskTransaction()
      cy.wait(4 * 1000)
      cy.get('#WBTC-deposited').should('have.text', '0.1 WBTC')    
    })
  })

})