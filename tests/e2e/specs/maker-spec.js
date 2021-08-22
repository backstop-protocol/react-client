
describe('Wallet tests', () => {
    before('', () => {
      cy.visit('/')
      cy.contains('Connect').click()
      cy.contains('Meta Mask').click()
    })

    it('validates address', () => {
      cy.getMetamaskWalletAddress().then(address => {
        expect(address).to.equal("0xF994Eba5f3F33EbC5a03d9B5e195765eeb29a923")
      })
    })

    it('deposit one ether', () => {
      cy.wait(30*1000)
      cy.get('button').contains("Deposit").click()
      cy.wait(30*1000)
      cy.get('[placeholder="Amount in ETH"]').type('1')
      cy.get('button').contains("Deposit").click()
      cy.confirmMetamaskTransaction()
      cy.wait(30*1000)
      // cy.get('.currency-value').get('p').should('have.value', '3.00 ETH')
    })

    it('withdraw one ether', () => {
      cy.get('button').contains("Withdraw").click()
      cy.get('[placeholder="Amount in ETH"]').type('1')
      cy.get('button').contains("Withdraw").click()
      cy.confirmMetamaskTransaction()
      cy.wait(30*1000)
      // cy.get('.currency-value').get('p').should('have.value', '3.00 ETH')
    })
})