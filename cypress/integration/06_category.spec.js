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
        cy.get('input[id="name"]').clear().type('Furniture')
        cy.get('button[type="submit"]').click();
        cy.get('div [id="notifications"]')
          .invoke('text')
          .then(text => {
                    const divTxt = text;
                    expect(divTxt).to.contain('Category already exists, Update it!');
        });
        cy.url({timeout:5000}).should('include', '/add-category')
    })
    

    it('should add a new category', () => {
        cy.get('input[id="name"]').clear().type('TestCategory')
        cy.get('button[type="submit"]').click()
    })

    it('should not have subcategories listed under newly created one', () => {
        cy.contains('Subcategories').click()
        cy.get('div[id="categoryId"]').click().contains('TestCategory').click()
    })

    it('should have newly added category in the table along with update and delete icons', () => {
        cy.get('h4').contains('No subcategories found.. Please add')
        cy.contains('Categories').click()
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

    it('should not delete the category', () => {
        cy.url({timeout:5000}).should('include','/all-categories')
        cy.get('tbody[id="Furniture"] > td').eq(0).as('testdelete')
        cy.get('@testdelete').find('button[type="submit"]').click()
        const stub = cy.stub()
        cy.on('window:confirm',(str,stub)=> {
            expect(str).to.equal('Are you sure to delete this category?')
            cy.get('button').contains('ok').click().
                then(() => {
                    cy.get('div [id="notifications"]')
                      .invoke('text')
                      .then(text => {
                            const divTxt = text;
                            expect(divTxt).to.contain('Category has one or more sub categories available and hence cannot be deleted!');
                        });
                })
        })
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
            // cy.on('window:confirm',() => true).then(() => {
            //     cy.url({timeout:5000}).should('includes','/all-categories')
            //})
        })
       //cy.get('tbody').should('have.length.lessThan','@count1')
       // console.log('count2', count2)
        //expect('@count2').to.lessThan('@count1')        

    })
})