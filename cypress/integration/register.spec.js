/// <reference types="cypress" />

describe('sign up user', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/register')
    })
    it('should stay on the same page with empty fullname field', () => {
        cy.get('input[id="username"]').type('testuser1')
        cy.get('input[id = "email"]').type('testuser@gmail.com')
        cy.get('input[id="password"]').type('test')
        cy.get('input[id="password2"]').type('test')
        cy.get('button[type="submit"]').click()
        cy.url({timeout:5000}).should('includes','/register')
    })
    it('should stay on the same page with empty username field', () => {
        cy.get('input[id="name"]').type('TestUser')
        cy.get('input[id = "email"]').type('testuser@gmail.com')
        cy.get('input[id="password"]').type('test')
        cy.get('input[id="password2"]').type('test')
        cy.get('button[type="submit"]').click()
        cy.url({timeout:5000}).should('includes','/register')
    })
    it('should stay on the same page with empty email field', () => {
        cy.get('input[id="username"]').type('testuser1')
        cy.get('input[id="name"]').type('TestUser')
        cy.get('input[id="password"]').type('test')
        cy.get('input[id="password2"]').type('test')
        cy.get('button[type="submit"]').click()
        cy.url({timeout:5000}).should('includes','/register')
    })

    it('should stay on the same page with empty password field', () => {
        cy.get('input[id="name"]').type('TestUser')
        cy.get('input[id="username"]').type('testuser1')
        cy.get('input[id = "email"]').type('testuser@gmail.com')
        cy.get('input[id="password2"]').type('test')
        cy.get('button[type="submit"]').click()
        cy.url({timeout:5000}).should('includes','/register')
    })
    it('should stay on the same page with empty password2 field', () => {
        cy.get('input[id="name"]').type('TestUser')
        cy.get('input[id="username"]').type('testuser1')
        cy.get('input[id = "email"]').type('testuser@gmail.com')
        cy.get('input[id="password"]').type('test')
        cy.get('button[type="submit"]').click()
        cy.url({timeout:5000}).should('includes','/register')
    })

    it('should sign up user with valid details', () => {
        cy.get('input[id="name"]').type('TestUser')
        cy.get('input[id="username"]').type('testuser1')
        cy.get('input[id = "email"]').type('testuser@gmail.com')
        cy.get('input[id="password"]').type('test')
        cy.get('input[id="password2"]').type('test')
        cy.get('button[type="submit"]').click()
        cy.url({timeout:5000}).should('includes','/emailVerifyPage')
    })

    it('should not sign up user with valid details', () => {
        cy.get('input[id="name"]').type('TestUser')
        cy.get('input[id="username"]').type('testuser1')
        cy.get('input[id = "email"]').type('testuser@gmail.com')
        cy.get('input[id="password"]').type('test')
        cy.get('input[id="password2"]').type('test')
        cy.get('button[type="submit"]').click()
        cy.url({timeout:5000}).should('includes','/register')
    })

    it('should stay in the same login page after deleting the user', () => {
        cy.visit('http://localhost:3000/login')
        cy.get('input[id="username"]').type('testuser1')
        cy.get('input[id="password"]').type('test')
        cy.get('button[type = "submit"]').click()
        cy.url({timeout:5000}).should('includes','/dashboard')

    })

    it('deletes the account and user on clicking ok', () => {
        cy.get('button[type="submit"]').click()
        const stub = cy.stub()
        cy.on('window:confirm',(str,stub) => {
            expect(str).to.equal('Are you sure to delete your account?')
            cy.get('button').contains('ok').click().
                then(() => {
                    cy.url({timeout:5000}).should('includes','/login')
                })
        })
    })
})
