describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://car-care-360-jl9d.onrender.com/#/login')

    cy.get('[data-testid="cypress-title"]').should("exist")


  })
})