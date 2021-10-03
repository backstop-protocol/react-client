describe('import CDP from maker into b.protocol', () => {

  it('establish a connection on faker', ()=> {
    const faker = "https://faker.b-protocol.workers.dev/compound"
    cy.visit('/')
    cy.window().then(win => win.location.href = faker);
    cy.wait(4 * 1000)
    cy.contains('Connect').click()
    cy.contains('Meta Mask').click()
    cy.acceptMetamaskAccess()
  })
  
  it('Deposit 1.1 ETH', ()=> {
    cy.wait(4 * 1000)
    cy.wait(4 * 1000)
    cy.get('#deposit-ETH').click({force: true})
    cy.wait(1 * 1000)
    cy.get('#deposit-ETH-action-box').find('input').clear().type('1.1')
    cy.get('#deposit-ETH-action-box').find('.currency-input-button').click()
    cy.wait(4 * 1000)
    cy.confirmMetamaskTransaction()
    cy.wait(4 * 1000)
  })

  it('shows an import button if a Maker CDP exists', () => {
    cy.visit('/compound')
    cy.contains('Connect').click()
    cy.contains('Meta Mask').click()
    cy.get('.migrate-btn').contains('Import')
    cy.wait(20 * 1000)
  })



  // it('dispaly the CDP values', () => {
  //   cy.get('.cdp-convert').contains('4.4440 ETH')
  //   cy.get('.cdp-convert').contains('0.00 DAI')
  // })

  // it('shows the import modal', () => {
  //   cy.get('.migrate-btn').click()
  //   cy.get('.migrate').find('h2').should('have.text', 'Import your Vault')
  // })

  // it('starts the import TX ', () => {
  //   cy.get('.migrate').find('.migration-btn').click()
  //   cy.wait(4 * 1000)
  //   cy.wait(4 * 1000)
  //   cy.confirmMetamaskTransaction()
  //   cy.wait(4 * 1000)
  // })

  // it('validates import success', () => {
  //   cy.get('#ETH-box').find('.currency-value').find('p').should('have.text', '4.4440 ETH')
  // })

})