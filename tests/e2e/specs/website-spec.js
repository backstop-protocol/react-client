
describe('checks website is up & pages exist', () => {

    before('',() => {
      cy.visit("/")
    })

    it('/', () => {
      cy.visit("/")
      cy.contains("Total value locked")
    })
    it('/maker', () => {
      cy.visit("/maker")
      cy.contains("Total value locked")
    })
    it('/app', () => {
      cy.visit("/app")
      cy.contains("Total value locked")
    })
    it('/compound', () => {
      cy.visit("/compound")
      cy.contains("Total value locked")
    })
    it('/faq', () => {
      cy.visit("/faq")
      cy.contains("FAQ")
    })
    it('/risk', () => {
      cy.visit("/risk")
      cy.contains("Risk")
    })
    it("/terms", () => {
      cy.visit("/terms")
      cy.contains("terms of use")
    })

})