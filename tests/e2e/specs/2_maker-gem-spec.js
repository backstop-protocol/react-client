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