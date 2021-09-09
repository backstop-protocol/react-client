describe('Wallet tests', () => {
  before('connect', () => {
    cy.visit('/')
    cy.contains('Connect').click()
    cy.contains('Meta Mask').click()
    cy.wait(4 * 1000)
  })

  it('validates address', () => {
    cy.getMetamaskWalletAddress().then(address => {
      expect(address).to.equal("0xF994Eba5f3F33EbC5a03d9B5e195765eeb29a923")
    })
  })

  it('deposit 14.444 ether', () => {
    cy.get('#Deposit-ETH').click()
    cy.wait(4 * 1000)
    cy.get('#ETH-box').find('input').type('14.444')
    cy.get('#ETH-box').find('.currency-input').find('button').click()
    cy.wait(4 * 1000)
    cy.confirmMetamaskTransaction()
  })

  it('validates deposited amount', () => {
    cy.wait(4 * 1000)
    cy.get('#ETH-box').find('.currency-value').find('p').should('have.text', '14.4440 ETH')
  })

  it('borrows 10555.55 DAI', () => {
    cy.wait(4 * 1000)
    cy.get('#Borrow-DAI').click()
    cy.wait(4 * 1000)
    cy.get('#DAI-box').find('input').type('10555.55')
    cy.get('#DAI-box').find('.currency-input').find('button').click()
    cy.wait(4 * 1000)
    cy.confirmMetamaskTransaction()
  })

  it('validates borrowd amount', () => {
    cy.wait(4 * 1000)
    cy.get('#DAI-box').find('.currency-value').find('p').should('have.text', '10555.55 DAI')
  })

  it('validates set max', () => {
    cy.wait(4 * 1000)
    cy.get('#Repay-DAI').click()
    cy.wait(4 * 1000)
    cy.get('#DAI-box').contains("Set Max").click()
    cy.get('#DAI-box').find('input').should('have.value', '10555.55')
  })

  it('unlock DAI', () => {
    cy.get('#DAI-box').find('.currency-input').find('button').should('have.class', 'disabled')
    cy.get('#DAI-box').find('.tickbox').click()
    cy.wait(4 * 1000)
    cy.confirmMetamaskPermissionToSpend()
    cy.wait(10 * 1000)
    cy.get('#DAI-box').find('.currency-input').find('button').should('not.have.class', 'disabled')
  })

  it('validates borrow limit', () => {
    cy.get('.limit-bar-track').contains("33.54%")
  })

  it('repays', () => {
    cy.get('#DAI-box').find('.currency-input').find('button').click()
    cy.wait(4 * 1000)
    cy.confirmMetamaskTransaction()
    cy.wait(4 * 1000)
  })

  it('validates repay', () => {
    cy.wait(4 * 1000)
    cy.get('.limit-bar-track').contains("0.00%")
    cy.get('#DAI-box').find('.currency-value').find('p').should('have.text', '0.00 DAI')
  })

  it('withdraw one ether', () => {
    cy.get('#Withdraw-ETH').click()
    cy.wait(4 * 1000)
    cy.get('#ETH-box').find('input').type('1')
    cy.get('#ETH-box').find('.currency-input').find('button').click()
    cy.wait(4 * 1000)
    cy.confirmMetamaskTransaction()
  })

  it('validates withdraw amount', () => {
    cy.wait(4 * 1000)
    cy.get('#ETH-box').find('.currency-value').find('p').should('have.text', '13.4440 ETH')
  })

  it('withdraw all ether', () => {
    cy.get('#Withdraw-ETH').click()
    cy.wait(4 * 1000)
    cy.get('#ETH-box').contains("Set Max").click()
    cy.get('#ETH-box').find('input').should('have.value', '13.444')
    cy.get('#ETH-box').find('.currency-input').find('button').click()
    cy.wait(4 * 1000)
    cy.confirmMetamaskTransaction()
  })

  it('validates withdraw amount', () => {
    cy.wait(4 * 1000)
    cy.get('#ETH-box').find('.currency-value').find('p').should('have.text', '0.0000 ETH')
  })
})