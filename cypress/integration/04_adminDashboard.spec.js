/// <reference types="cypress" />

describe('admin dashboard', () => {
    it('should redirect to admin dashboard on admin login', () =>{
        cy.visit('http://localhost:3000/login')
        cy.get('input[id="username"]').type('admin')
        cy.get('input[id="password"]').type('admin')
        cy.get('button[type = "submit"]').click()
        cy.url({timeout : 5000}).should('includes', '/admin-Dashboard')
        cy.contains('Users')
        cy.contains('Categories')
        cy.contains('Subcategories')
        cy.contains('Products')
    })

    it('should display list of users on selecting users from the page', () =>{
        cy.contains('Users').click()
        cy.contains('List Of Users')
        cy.get('table').contains('td','Mercy')
        cy.get('table').contains('td','jayaramachandran20@gmail.com')
    })

    it('should display the particular user profile when selected', () =>{
        
    })

})