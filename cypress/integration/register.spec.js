/// <reference types="cypress" />

describe('sign up user', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/register')
    })
    it('should stay on the same page with empty fullname field', () => {
        cy.get('input[id="username"]').type('aishu')
        cy.get('input[id = "email"]').type('aishu@gmail.com')
        cy.get('input[id="password"]').type('aishu')
        cy.get('input[id="password2"]').type('aishu')
        cy.get('button[type="submit"]').click()
        cy.url({timeout:5000}).should('includes','/register')
    })
    it('should stay on the same page with empty username field', () => {
        cy.get('input[id="name"]').type('Aishu')
        cy.get('input[id = "email"]').type('aishu@gmail.com')
        cy.get('input[id="password"]').type('aishu')
        cy.get('input[id="password2"]').type('aishu')
        cy.get('button[type="submit"]').click()
        cy.url({timeout:5000}).should('includes','/register')
    })
    it('should stay on the same page with empty email field', () => {
        cy.get('input[id="username"]').type('aishu')
        cy.get('input[id="name"]').type('Aishu')
        cy.get('input[id="password"]').type('aishu')
        cy.get('input[id="password2"]').type('aishu')
        cy.get('button[type="submit"]').click()
        cy.url({timeout:5000}).should('includes','/register')
    })

    it('should stay on the same page with empty password field', () => {
        cy.get('input[id="name"]').type('Aishu')
        cy.get('input[id="username"]').type('aishu')
        cy.get('input[id = "email"]').type('aishu@gmail.com')
        cy.get('input[id="password2"]').type('aishu')
        cy.get('button[type="submit"]').click()
        cy.url({timeout:5000}).should('includes','/register')
    })
    it('should stay on the same page with empty password2 field', () => {
        cy.get('input[id="name"]').type('Aishu')
        cy.get('input[id="username"]').type('aishu')
        cy.get('input[id = "email"]').type('aishu@gmail.com')
        cy.get('input[id="password"]').type('aishu')
        cy.get('button[type="submit"]').click()
        cy.url({timeout:5000}).should('includes','/register')
    })

    it('should sign up user with valid details', () => {
        cy.get('input[id="name"]').type('Aishu')
        cy.get('input[id="username"]').type('aishu')
        cy.get('input[id = "email"]').type('aishu@gmail.com')
        cy.get('input[id="password"]').type('aishu')
        cy.get('input[id="password2"]').type('aishu')
        cy.get('button[type="submit"]').click()
        cy.url({timeout:5000}).should('includes','/emailVerifyPage')
    })
})
