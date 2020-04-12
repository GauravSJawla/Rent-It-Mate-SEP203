/// <reference types="cypress" />

describe('sign up user', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/register');
  });
  it('should stay on the same page with empty fullname field', () => {
    cy.get('input[id="username"]').type('testuser1');
    cy.get('input[id = "email"]').type('testuser@gmail.com');
    cy.get('input[id="password"]').type('test');
    cy.get('input[id="password2"]').type('test');
    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 5000 }).should('includes', '/register');
  });
  it('should stay on the same page with empty username field', () => {
    cy.get('input[id="name"]').type('TestUser');
    cy.get('input[id = "email"]').type('testuser@gmail.com');
    cy.get('input[id="password"]').type('test');
    cy.get('input[id="password2"]').type('test');
    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 5000 }).should('includes', '/register');
  });
  it('should stay on the same page with empty email field', () => {
    cy.get('input[id="username"]').type('testuser1');
    cy.get('input[id="name"]').type('TestUser');
    cy.get('input[id="password"]').type('test');
    cy.get('input[id="password2"]').type('test');
    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 5000 }).should('includes', '/register');
  });

  it('should stay on the same page with empty password field', () => {
    cy.get('input[id="name"]').type('TestUser');
    cy.get('input[id="username"]').type('testuser1');
    cy.get('input[id = "email"]').type('testuser@gmail.com');
    cy.get('input[id="password2"]').type('test');
    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 5000 }).should('includes', '/register');
  });
  it('should stay on the same page with empty password2 field', () => {
    cy.get('input[id="name"]').type('TestUser');
    cy.get('input[id="username"]').type('testuser1');
    cy.get('input[id = "email"]').type('testuser@gmail.com');
    cy.get('input[id="password"]').type('test');
    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 5000 }).should('includes', '/register');
  });

  it('should alert if passwords do not match', () => {
    cy.get('input[id="name"]').type('TestUser');
    cy.get('input[id="username"]').type('testuser1');
    cy.get('input[id = "email"]').type('testuser@gmail.com');
    cy.get('input[id="password"]').type('test');
    cy.get('input[id="password2"]').type('test1');
    cy.get('button[type="submit"]').click();
    cy.get('div [id="notifications"]')
      .invoke('text')
      .then(text => {
        const divTxt = text;
        expect(divTxt).to.contain('Passwords do not match');
      });
  });

  it('should alert if username already exists', () => {
    cy.get('input[id="name"]').type('TestUser');
    cy.get('input[id="username"]').type('mercy');
    cy.get('input[id = "email"]').type('testuser1@gmail.com');
    cy.get('input[id="password"]').type('testuser123');
    cy.get('input[id="password2"]').type('testuser123');
    cy.get('button[type="submit"]').click();
    cy.get('div [id="notifications"]')
      .invoke('text')
      .then(text => {
        const divTxt = text;
        expect(divTxt).to.contain('Username already exists!');
      });
  });

  it('should alert if email already exists', () => {
    cy.get('input[id="name"]').type('TestUser');
    cy.get('input[id="username"]').type('TestUser2');
    cy.get('input[id = "email"]').type('adminuser@gmail.com');
    cy.get('input[id="password"]').type('testuser123');
    cy.get('input[id="password2"]').type('testuser123');
    cy.get('button[type="submit"]').click();
    cy.get('div [id="notifications"]')
      .invoke('text')
      .then(text => {
        const divTxt = text;
        expect(divTxt).to.contain('Email already exists!');
      });
  });

  it('should sign up user with valid details', () => {
    cy.visit('http://localhost:3000/register');
    cy.get('input[id="name"]').type('Minnie');
    cy.get('input[id="username"]').type('Minnie');
    cy.get('input[id = "email"]').type('minnie@gmail.com');
    cy.get('input[id="password"]').type('minnie');
    cy.get('input[id="password2"]').type('minnie');
    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 5000 }).should('includes', '/emailVerifyPage');
  });

  it('should not sign up user with valid details', () => {
    cy.visit('http://localhost:3000/register');
    cy.get('input[id="name"]').type('Minnie');
    cy.get('input[id="username"]').type('Minnie');
    cy.get('input[id = "email"]').type('minnie@gmail.com');
    cy.get('input[id="password"]').type('minnie');
    cy.get('input[id="password2"]').type('minnie');
    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 5000 }).should('includes', '/register');
  });

  it('user can login', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[id="username"]').type('minnie');
    cy.get('input[id="password"]').type('minnie');
    cy.get('button[type = "submit"]').click();
    cy.url({ timeout: 5000 }).should('includes', 'http://localhost:3000');
  });

  // it('deletes the account and user on clicking ok', () => {
  //     cy.get('button[type="submit"]').click()
  //     const stub = cy.stub()
  //     cy.on('window:confirm',(str,stub) => {
  //         expect(str).to.equal('Are you sure to delete your account?')
  //         cy.get('button').contains('ok').click().
  //             then(() => {
  //                 cy.url({timeout:5000}).should('includes','/login')
  //             })
  //     })
  // })
});
