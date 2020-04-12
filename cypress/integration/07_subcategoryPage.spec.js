/// <reference types="cypress" />

describe("admin dashboard", () => {
  it("should redirect to admin dashboard on admin login", () => {
    cy.visit("http://localhost:3000/login");
    cy.get('input[id="username"]').type("admin");
    cy.get('input[id="password"]').type("admin");
    cy.get('button[type = "submit"]').click();
    cy.url({ timeout: 5000 }).should("includes", "/admin-Dashboard");
    cy.contains("Subcategories").click();
    cy.contains('Create Sub Category').click();
    cy.url({timeout:5000}).should('include','/add-sub-category')
  });

  it("should stay on the same page with empty drop down", () => {
    cy.get('input[id="name"]').type("TestSubcate");
    cy.get('button[type="submit"]').click();
    cy.url({timeout:5000}).should('include','/add-sub-category')
  });

  it("should stay on the same page with empty input name", () => {
    cy.get('input[id="name"]').clear();
    cy.get('div[id="categoryId"]').click().contains("Gardens").click();
    cy.get('button[type="submit"]').click();
    cy.url({timeout:5000}).should('include','/add-sub-category')
  });

  it("should create a new subcategory", () => {
    //cy.get('div[id="categoryId"]').click().contains("Gardens").click();
    cy.get('input[id="name"]').type("TestSubcate");
    cy.get('button[type="submit"]').click();
  });

  // it("should not create a duplicate subcategory", () => {
  //   cy.get('button[type="submit"]').click();
  // });

});
