describe('Wallet tests', () => {
  before('connect', () => {
    cy.visit('/')
    cy.contains('Connect').click()
    cy.contains('Meta Mask').click()
  })

  it('validates address', () => {
    cy.getMetamaskWalletAddress().then(address => {
      expect(address).to.equal("0xF994Eba5f3F33EbC5a03d9B5e195765eeb29a923")
    })
  })

  it('deposit 14.444 ether', () => {
    cy.wait(4 * 1000)
    cy.get('button').contains("Deposit").click()
    cy.wait(4 * 1000)
    cy.get('[placeholder="Amount in ETH"]').type('14.444')
    cy.get('button').contains("Deposit").click()
    cy.wait(4 * 1000)
    cy.confirmMetamaskTransaction()
    cy.wait(4 * 1000)
    // cy.get('.currency-value').get('p').should('have.value', '3.00 ETH')
  })

  it('validates deposited amount', () => {
    cy.contains("14.4440 ETH")
  })

  it('borrows 10555.55 DAI', () => {
    cy.wait(4 * 1000)
    cy.get('button').contains("Borrow").click()
    cy.wait(4 * 1000)
    cy.get('[placeholder="Amount in DAI"]').type('10555.55')
    cy.get('button').contains("Borrow").click()
    cy.wait(4 * 1000)
    cy.confirmMetamaskTransaction()
    cy.wait(4 * 1000)
  })

  it('validates borrowd amount', () => {
    cy.contains("10555.55 DAI")
  })

  it('validates set max', () => {
    cy.wait(4 * 1000)
    cy.get('button').contains("Repay").click()
    cy.wait(4 * 1000)
    cy.contains("Set Max").click()
    cy.get('[placeholder="Amount in DAI"]').should('have.value', '10555.55')
  })

  it('unlock DAI', () => {
    cy.get('button').contains("Repay").should('have.class', 'disabled')
    cy.get('.tickbox').click()
    cy.wait(4 * 1000)
    cy.confirmMetamaskPermissionToSpend()
    cy.wait(10 * 1000)
    cy.get('button').contains("Repay").should('not.have.class', 'disabled')
  })

  it('validates borrow limit', () => {
    cy.get('.limit-bar-track').contains("33.54%")
  })

  it('repays', () => {
    cy.get('button').contains("Repay").click()
    cy.wait(4 * 1000)
    cy.confirmMetamaskTransaction()
    cy.wait(4 * 1000)
  })

  it('validates repay', () => {
    cy.get('.limit-bar-track').contains("0.00%")
  })

  it('withdraw one ether', () => {
    cy.get('button').contains("Withdraw").click()
    cy.wait(4 * 1000)
    cy.get('[placeholder="Amount in ETH"]').type('1')
    cy.get('button').contains("Withdraw").click()
    cy.wait(4 * 1000)
    cy.confirmMetamaskTransaction()
    cy.wait(4 * 1000)
    // cy.get('.currency-value').get('p').should('have.value', '3.00 ETH')
  })

  it('validates withdraw amount', () => {
    cy.contains("13.4440 ETH")
  })

  it('withdraw all ether', () => {
    cy.get('button').contains("Withdraw").click()
    cy.wait(4 * 1000)
    cy.contains("Set Max").click()
    cy.get('[placeholder="Amount in ETH"]').should('have.value', '13.444')
    cy.get('button').contains("Withdraw").click()
    cy.wait(4 * 1000)
    cy.confirmMetamaskTransaction()
    cy.wait(4 * 1000)
    // cy.get('.currency-value').get('p').should('have.value', '3.00 ETH')
  })
})