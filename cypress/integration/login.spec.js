/// <reference types="cypress" />
describe('login page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login')
    })
    it('redirect to dashboard on valid credentials', () => {
        cy.get('input[id="username"]').type('mercy')
        cy.get('input[id="password"]').type('gentle')
        cy.get('button[type = "submit"]').click()
        cy.url({timeout : 5000}).should('includes','/dashboard')
    })

    it('stays on the same page if username is empty', () => {
        cy.get('input[id="username"]').type('mercy')
        cy.get('button[type = "submit"]').click()
        cy.url({timeout : 5000}).should('includes', '/login')
    })

    it('stays on the same page if password is empty', () => {
        cy.get('input[id="password"]').type('gentle')
        cy.get('button[type = "submit"]').click()
        cy.url({timeout : 5000}).should('includes', '/login')
    })

    it('stays at same page on invalid credentials', () => {
        cy.get('input[id="username"]').type('mercy')
        cy.get('input[id="password"]').type('mercy')
        cy.get('button[type = "submit"]').click()
        cy.url({timeout : 5000}).should('includes', '/login')
    })
})