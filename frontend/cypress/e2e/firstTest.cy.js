describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/login')

    cy.get('[data-testid="cypress-title"]').should("exist")


  })
})