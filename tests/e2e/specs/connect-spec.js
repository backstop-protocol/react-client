
describe('Wallet tests', () => {

    before('',() => {
      cy.visit("/maker")
    })

    it('Does not do much!', () => {
      expect(true).to.equal(true)
    })

    it('checks TVL', () => {
      cy.contains("Total value locked")
    })

    it('connects to wallet', () => {
      cy.contains('Connect').click()
      cy.contains('Meta Mask').click()
      cy.acceptMetamaskAccess()
      cy.contains('Borrow Limit')
    })

})