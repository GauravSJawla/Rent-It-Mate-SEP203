/// <reference types="cypress" />
describe('product pages', () => {
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
        cy.url({ timeout: 5000 }).should('includes', '/dashboard/user');
      });
  });

  it('should be able to create-product', () => {
    cy.contains('Add Product').click();
    cy.get('input[id="name"]').clear().type('Test Product');
    cy.get('input[id="description"]').clear().type('Test product description');
    cy.get('input[id="price"]').clear().type(2);
    cy.get('input[id="quantity"]').clear().type(2);
    cy.get('input[id="shipping"]').clear().type('true');
    cy.get('input[id="category"]').clear().type('5e6a7a324ed00f15930538e7');
    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 5000 }).should('includes', '/dashboard');
  });

  it('should be able to view test product', () => {
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
