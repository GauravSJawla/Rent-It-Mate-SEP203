/// <reference types="cypress" />
describe('product pages', () => {
  const todaysDate = new Date().getDate();
  // const futureDate = new Date(Cypress.moment().add('days',5));
  // var futureMonth = futureDate.getMonth();
  //const toDate = futureDate.getDate();

  it('should be able to redirect to dashboard after login', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[id="username"]').type('mercy');
    cy.get('input[id="password"]').type('gentle');
    cy.get('button[type = "submit"]').click();
    cy.url({ timeout: 5000 }).should('includes', 'http://localhost:3000');
    cy.contains('Profile')
      .click()
      .then(() => {
        cy.get('a').contains('Dashboard').click();
        cy.url({ timeout: 5000 }).should('includes', '/dashboard');
      });
  });

  it('should stay on the same page if fields are not filled out', () => {
    cy.contains('Add Product').click();
    cy.get('input[id="name"]').clear().type('Test Product');
    cy.get('input[id="description"]').clear().type('Test product description');
    cy.get('input[id="price"]').clear().type(2);
    cy.get('input[id="zipcode"]').clear().type(54678);
    cy.get('label[id="Shipping"]').click();
    cy.get('input[id="fromDate"]').click();
    cy.wait(500);
    cy.contains(todaysDate).click();
    cy.get('input[id="toDate"]').click()
    cy.wait(500);
    cy.contains(todaysDate).click();
    cy.get('button[type="submit"]').click()
    cy.url({ timeout: 5000 }).should('includes', '/create-product');
  })

  it('should provide alert if subcategory is not filled out', () => {
    cy.contains('Add Product').click();
    cy.get('input[id="name"]').clear().type('Test Product');
    cy.get('input[id="description"]').clear().type('Test product description');
    cy.get('input[id="price"]').clear().type(2);
    cy.get('input[id="quantity"]').clear().type(2);
    cy.get('input[id="zipcode"]').clear().type(54678);
    cy.get('label[id="Shipping"]').click();
    cy.get('input[id="fromDate"]').click();
    cy.wait(500);
    cy.contains(todaysDate).click();
    cy.get('input[id="toDate"]').click()
    cy.wait(500);
    cy.contains(todaysDate).click();
    cy.get('button[type="submit"]').click()
   cy.wait(400);
   cy.get('p[id="categoryError"]').contains('Please select a category');
  })

  it('should provide alert if end date is less than or equal to start date', () => {
    cy.contains('Add Product').click();
    cy.get('input[id="name"]').clear().type('Test Product');
    cy.get('input[id="description"]').clear().type('Test product description');
    cy.get('input[id="price"]').clear().type(2);
    cy.get('input[id="quantity"]').clear().type(2);
    cy.get('input[id="zipcode"]').clear().type(54678);
    cy.get('label[id="Shipping"]').click();
    cy.get('div[id="subCategory"]').click().contains('Bed').click();
    cy.get('input[id="fromDate"]').click();
    cy.wait(500);
    cy.contains(todaysDate).click();
    cy.get('input[id="toDate"]').click()
    cy.wait(500);
    cy.contains(todaysDate).click();
    cy.get('button[type="submit"]').click();
    cy.wait(400);
    cy.get('p[id="toDateError"]').contains('Please select an End date greater than start date');
  })

  it('should be able to create-product', () => {
   // console.log('future date',futureDate);
    cy.contains('Add Product').click();
    cy.get('input[id="name"]').clear().type('Test Product');
    cy.get('input[id="description"]').clear().type('Test product description');
    cy.get('input[id="price"]').clear().type(2);
    cy.get('input[id="quantity"]').clear().type(2);
    cy.get('label[id="Shipping"]').click();
    cy.get('input[id="zipcode"]').clear().type(54678);
    cy.get('input[id="fromDate"]').click();
    cy.wait(500);
    cy.contains(todaysDate).click();
    cy.get('input[id="toDate"]').click()
    cy.wait(500);
    cy.get('button[aria-label="Next Month"]').click()
    cy.wait(400);
    cy.contains('25').click();
    cy.get('button[type="submit"]').click();
    cy.wait(400);
    cy.url({ timeout: 5000 }).should('includes', '/dashboard');
  });

  it('should be able to view test product', () => {
    cy.wait(400);
    cy.contains('View My Products').click();
    cy.contains('Test Product');
  });

  it('should be able to delete test product', () => {
    cy.contains('View My Products').click();
    cy.contains('Test Product');
    cy.get('button[id="Test Product"]').click();
    cy.url({ timeout: 5000 }).should('includes', '/dashboard/products');
  });
});
