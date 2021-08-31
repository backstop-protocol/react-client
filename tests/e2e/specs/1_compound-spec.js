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
      cy.get('#wallet-balance-ETH').should('have.text', '1111 ETH')
      cy.wait(4 * 1000)
    })

    it('should show a warrning when trying to deposit more then the actual balance', () => {
      cy.get('#deposit-ETH-input').type('1112')
      cy.get('.tooltip.warning').contains('Amount exceeds wallet balance')
    })


    it('should calculate and display the deposited amount in USD', () => {
      cy.get('#deposit-ETH-input').clear().type('100')
      cy.get('#deposit-ETH-calculated-total-deposit-in-usd').should('have.text', '$325478.0622')
    })

    it('should deposit ETH', () => {
      cy.get('#total-supply-balance').should('have.text', '$0')
      cy.get('#deposit-ETH-input-btn').click()
      cy.wait(4 * 1000)
      cy.confirmMetamaskTransaction()
      cy.wait(4 * 1000)
      cy.get('#total-supply-balance').should('have.text', '$325478.06')
    })

  })

  context('when user borrow BAT', () => {
    
  })

  context('when user repay BAT', () => {
    
  })

  context('when user withdraw ETH', () => {
    
  })

})