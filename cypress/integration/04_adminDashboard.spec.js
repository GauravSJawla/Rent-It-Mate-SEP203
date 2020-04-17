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
        cy.get('h3').contains('List of Users')
        cy.get('tbody tr').should('have.length.greaterThan', 0)
        cy.get('tbody tr').should('not.have.text','No users found.....')
    })

    it('should display the particular user profile when selected', () => {
        cy.get('tbody tr').eq(4).as('userRow')
        cy.get('@userRow').get('td').eq(8).get('button[type="submit"]').first().click()
        cy.contains("User's current Address:") 
        cy.get('@userRow').get('td').eq(8).get('button[type="submit"]').first().click()
        cy.get('tbody tr').should('not.have.text',"User's current Address:")      
    })

    it('should display list of categories on selecting categories from the page', () => {
        cy.contains('Categories').click()
        cy.get('h3').contains('Available Categories')
        cy.get('tbody th').should('have.length.greaterThan', 0)
        cy.get('tbody tr').should('not.have.text', 'No categories found....')
    })

    it('should display all the available products on selecting products from the page', () => {
        cy.contains('Products').click()
        cy.get('h3').contains('Available Products')
        cy.get('div[class="product-img"]').should('have.length.greaterThan', 0).should('be.visible');
        //cy.get('div[class="product-img"]').first().get('a').second().click()
    })

    it('should display all available subcategories on selecting categories', () => {
        cy.contains('Subcategories').click()
        cy.get('h4').contains('Please select a category to view list of Sub categories')
        cy.get('div[id="categoryId"]').click().contains('Books').click()
        cy.get('h3').contains('Available Sub-Categories')
        cy.get('tbody').should('have.length.greaterThan', 0)
    })

    it('should redirect to add category page on selecting create category', () => {
        cy.contains('Categories').click()
        cy.contains('Create Category').click()
        cy.url({timeout : 5000}).should('includes', '/add-category')
    })

})