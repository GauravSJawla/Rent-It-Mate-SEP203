/// <reference types="cypress"/>

describe('category pages', () => {
    let count1,count2;
    it('should redirect to add category page', () => {
        cy.visit('http://localhost:3000/login')
        cy.get('input[id="username"]').type('admin')
        cy.get('input[id="password"]').type('admin')
        cy.get('button[type = "submit"]').click()
        cy.url({timeout : 5000}).should('includes', '/admin-Dashboard')
        cy.contains('Categories').click()
        cy.contains('Create Category').click()
        cy.url({timeout:5000}).should('include', '/add-category')
    })

    it('should stay on same page if tried to add already existing category', () => {
        cy.get('input[id="name"]').clear().type('Furnitures')
        cy.get('button[type="submit"]').click();
        cy.url({timeout:5000}).should('include', '/add-category')
    })

    it('should add a new category', () => {
        cy.get('input[id="name"]').clear().type('TestCategory')
        cy.get('button[type="submit"]').click()
    })
    
    it('should have newly added category in the table along with update and delete icons', () => {
        cy.get('tbody[id="TestCategory"] > td').eq(1).as('testrow')
        cy.get('@testrow').find('a').should('have.attr','href')
        cy.get('tbody[id="TestCategory"] > td').eq(0).as('testrow2')
        cy.get('@testrow2').find('button[type="submit"]')
    })

    it('should update category', () => {
        cy.get('tbody[id="TestCategory"] > td').eq(1).as('testrow')
        cy.get('@testrow').find('a').click();
        cy.url({timeout:5000}).should('include', '/update-category')
        cy.get('input[id="name"]').clear().type('TestCategory1')
        cy.get('button[type="submit"]').click()
    })

    it('should delete the category', () => {
        cy.url({timeout:5000}).should('include','/all-categories')
        cy.get('tbody').its('length').as('count1')
        //console.log('count 1', count1)
        cy.get('tbody[id="TestCategory1"] > td').eq(0).as('testrow2')
        cy.get('@testrow2').find('button[type="submit"]').click()
        const stub = cy.stub()
        cy.on('window:confirm',(str,stub) => {
            expect(str).to.equal('Are you sure to delete this category?')
            cy.on('window:confirm',() => true).then(() => {
                cy.url({timeout:5000}).should('includes','/all-categories')
            })
        })
       cy.get('tbody').should('have.length.lessThan','@count1')
       // console.log('count2', count2)
        //expect('@count2').to.lessThan('@count1')        

    })
})