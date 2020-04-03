/// <reference types="cypress" />
describe('login page', () => {
  // beforeEach(() => {
  //     cy.visit('http://localhost:3000/login')
  // })

  it('stays on the same page if username is empty', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[id="username"]').type('mercy');
    cy.get('button[type = "submit"]').click();
    cy.url({ timeout: 5000 }).should('includes', '/login');
  });

  it('stays on the same page if password is empty', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[id="password"]').type('gentle');
    cy.get('button[type = "submit"]').click();
    cy.url({ timeout: 5000 }).should('includes', '/login');
  });

  it('should alert if username invalid', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[id="username"]').type('TestUser123');
    cy.get('input[id="password"]').type('testuser123');
    cy.get('button[type="submit"]').click();
    cy.get('div [id="notifications"]')
      .invoke('text')
      .then(text => {
        const divTxt = text;
        expect(divTxt).to.contain('Username is incorrect!');
      });
  });

  it('should alert if password invalid', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[id="username"]').type('TestUser1');
    cy.get('input[id="password"]').type('testuser1');
    cy.get('button[type="submit"]').click();
    cy.get('div [id="notifications"]')
      .invoke('text')
      .then(text => {
        const divTxt = text;
        expect(divTxt).to.contain('Password in incorrect!');
      });
  });

  it('redirect to dashboard on valid credentials', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[id="username"]').type('mercy');
    cy.get('input[id="password"]').type('gentle');
    cy.get('button[type = "submit"]').click();
    cy.url({ timeout: 5000 }).should('includes', 'http://localhost:3000');
  });

  // it('redirects to landing page after logout', () => {
  //     cy.contains('Profile').click().then(() => {
  //         cy.get('a[text="Logout"]').click()
  //         cy.url({timeout:5000}).should('includes','localhost:3000')
  //     })
  // })

  it('redirects to landing page on log out', () => {
    cy.contains('Profile')
      .click()
      .then(() => {
        cy.get('a')
          .contains('Logout')
          .click();
        cy.window()
          .its('store')
          .invoke('getState')
          .should('deep.equal', {
            auth: {
              token: null,
              isAuthenticated: false,
              loading: false,
              user: null
            },
            profile: {
              profile: null,
              profiles: [],
              loading: false,
              error: null
            },
            alert: []
          });
        cy.url({ timeout: 5000 }).should('includes', 'http://localhost:3000');
      });
  });
});
