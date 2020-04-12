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
    cy.get('input[id="username"]').type('minnie');
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
    cy.get('input[id="username"]').type('Minnie');
    cy.get('input[id="password"]').type('Minnie');
    cy.get('button[type="submit"]').click();
    cy.get('div [id="notifications"]')
      .invoke('text')
      .then(text => {
        const divTxt = text;
        expect(divTxt).to.contain('Password is incorrect!');
      });
  });

    it('should login with valid credentials', () => {
      cy.visit('http://localhost:3000/login');
      cy.get('input[id="username"]').type('Minnie');
      cy.get('input[id="password"]').type('minnie');
      cy.get('button[type="submit"]').click();
    })

    it('redirects to landing page on log out', () => {
        cy.contains('Profile').click().then(() => {
            cy.get('a').contains('Logout').click()
            cy.window().its('store').invoke('getState').should('deep.equal',{
                auth:{
                    token:null,
                    isAuthenticated:false,
                    loading:false,
                    users:[],
                    user:null,
                    error:{}
                },
                profile:{
                    profile:null,
                    profiles:[],
                    loading:false,
                    error:null
                },
                alert:[],
                product:{
                  productId: null,
                  products: [],
                  product: null,
                  loading: false,
                  error: {}
                },
                category:{
                    category:null,
                    categories:[],
                    loading:false,
                    updated:false,
                    error:{}
                },
                categorylist:{
                  categoryList:[],
                  loading:false,
                  error:{}
                },
                subcategory:{
                  subcategory:null,
                  subcategories:[],
                  loading:false,
                  error:{}
                }
            })
            cy.url({timeout:5000}).should('includes','http://localhost:3000')
            cy.get('a').contains('Login')
        })
        
    })

  it('redirects to admin dashboard on admin login', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[id="username"]').type('admin');
    cy.get('input[id="password"]').type('admin');
    cy.get('button[type = "submit"]').click();
    cy.url({ timeout: 5000 }).should('includes', '/admin-Dashboard');
  });
});
