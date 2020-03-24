/// <reference types="cypress" />
describe('login page', () => {
    // beforeEach(() => {
    //     cy.visit('http://localhost:3000/login')
    // })
    it('dashboard has create profile link if there is no profile for the user', () => {
        cy.visit('http://localhost:3000/login')
        cy.get('input[id="username"]').type('Minnie')
        cy.get('input[id="password"]').type('minnie')
        cy.get('button[type = "submit"]').click()
        cy.url({timeout : 5000}).should('includes','/dashboard')
        cy.contains('Create Profile').click()
        cy.url({timeout:5000}).should('includes','/create-profile')
    })

    it('creates-profile for a new user', () => {
        cy.get('input[id="address1"]').type('688,Collins road')
        cy.get('input[id="city"]').type('Iowa City')
        cy.get('input[id="state"]').type('Iowa')
        cy.get('input[id="country"]').type('USA')
        cy.get('input[id="zipcode"]').type(87675)
        cy.get('input[id="homePhone"]').type(1234567890)
        cy.get('button[type="submit').click()
        cy.url({timeout : 5000}).should('includes','/dashboard')
        cy.contains('has')
    })

    it('stays on same page if address field is not filled', () => {
        cy.get('input[id="address1"]').type('')
        cy.get('input[id="city"]').type('Iowa City')
        cy.get('input[id="state"]').type('Iowa')
        cy.get('input[id="country"]').type('USA')
        cy.get('input[id="zipcode"]').type(87675)
        cy.get('input[id="homePhone"]').type(1234567890)
        cy.get('button[type="submit').click()
        cy.url({timeout : 5000}).should('includes','/create-profile')
    })

    it('stays on same page if city field is not filled', () => {
        cy.get('input[id="address1"]').type('688,Collins road')
        cy.get('input[id="city"]').type('')
        cy.get('input[id="state"]').type('Iowa')
        cy.get('input[id="country"]').type('USA')
        cy.get('input[id="zipcode"]').type(87675)
        cy.get('input[id="homePhone"]').type(1234567890)
        cy.get('button[type="submit').click()
        cy.url({timeout : 5000}).should('includes','/create-profile')
    })

    it('stays on same page if state field is not filled', () => {
        cy.get('input[id="address1"]').type('688,Collins road')
        cy.get('input[id="city"]').type('Iowa City')
        cy.get('input[id="state"]').type('')
        cy.get('input[id="country"]').type('USA')
        cy.get('input[id="zipcode"]').type(87675)
        cy.get('input[id="homePhone"]').type(1234567890)
        cy.get('button[type="submit').click()
        cy.url({timeout : 5000}).should('includes','/create-profile')
    })

    it('stays on same page if country field is not filled', () => {
        cy.get('input[id="address1"]').type('688,Collins road')
        cy.get('input[id="city"]').type('Iowa City')
        cy.get('input[id="state"]').type('Iowa')
        cy.get('input[id="country"]').type('')
        cy.get('input[id="zipcode"]').type(87675)
        cy.get('input[id="homePhone"]').type(1234567890)
        cy.get('button[type="submit').click()
        cy.url({timeout : 5000}).should('includes','/create-profile')
    })

    it('stays on same page if zipcode field is not filled', () => {
        cy.get('input[id="address1"]').type('688,Collins road')
        cy.get('input[id="city"]').type('Iowa City')
        cy.get('input[id="state"]').type('Iowa')
        cy.get('input[id="country"]').type('USA')
        cy.get('input[id="zipcode"]').type()
        cy.get('input[id="homePhone"]').type(1234567890)
        cy.get('button[type="submit').click()
        cy.url({timeout : 5000}).should('includes','/create-profile')
    })
    

    
})