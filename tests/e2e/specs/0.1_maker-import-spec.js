// describe('import CDP from maker into b.protocol', () => {
  
//   it('create maker CDP', ()=> {
//     cy.visit('https://faker.b-protocol.workers.dev/app')
//     cy.contains('Connect').click()
//     cy.contains('Meta Mask').click()
//     cy.wait(4 * 1000)
//     cy.get('button').contains("Deposit").click()
//     cy.wait(4 * 1000)
//     cy.get('[placeholder="Amount in ETH"]').type('4.444')
//     cy.get('button').contains("Deposit").click()
//     cy.wait(4 * 1000)
//     cy.confirmMetamaskTransaction()
//     cy.wait(4 * 1000)
//   })

//   it('shows an import button if a Maker CDP exists', () => {
//     cy.visit('/')
//     cy.contains('Connect').click()
//     cy.contains('Meta Mask').click()
//     cy.contains('Import your Vault from MakerDAO system to B.Protocol')
//     cy.get('.migrate-btn').contains('Import')
//   })

//   it('dispaly the CDP values', () => {
//     cy.get('.cdp-convert').contains('ETH Locked')
//     cy.get('.cdp-convert').contains('4.4440 ETH')
//     cy.get('.cdp-convert').contains('DAI Debt')
//     cy.get('.cdp-convert').contains('0.00 DAI')
//   })

//   it('shows the import modal', () => {
//     cy.get('.migrate-btn').click()
//     cy.get('.migrate').find('h2').should('have.text', 'Import your Vault')
//   })

//   it('starts the import TX ', () => {
//     cy.get('.migrate').find('.migration-btn').click()
//     cy.wait(4 * 1000)
//     cy.wait(4 * 1000)
//     cy.confirmMetamaskTransaction()
//     cy.wait(4 * 1000)
//   })

//   it('validates import success', () => {
//     cy.get('#ETH-box').find('.currency-value').find('p').should('have.text', '4.4440 ETH')
//   })

// })