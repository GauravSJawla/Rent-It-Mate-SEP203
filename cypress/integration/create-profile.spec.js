/// <reference types="cypress" />
describe('create-profile page', () => {
    // beforeEach(() => {
    //     cy.visit('http://localhost:3000/login')
    // })
    
    // before(() => {
    //     cy.request('POST','/api/auth', 
    //             {username : 'Minnie', password: 'minnie'}).
    //             then((response) => {
    //                 const token = response.body.token;
    //                 expect(response.body).to.have(token)
    //                 cy.request('DELETE', '/api/profile', {
    //                             'auth' : {
    //                                 'x-auth-token' : token
    //                              }
    //     })
    // })
    //     cy.request('POST','/api/users', {
    //         name : 'Minnie',
    //       username : 'Minnie',
    //       email : 'minnie@gmail.com',
    //       password : 'minnie'
    //     }).then((response) => {
    //         expect(response.status).to.be(200)
    //     })
    // })

    it('dashboard has create profile link if there is no profile for the user', () => {
        cy.visit('http://localhost:3000/login')
        cy.get('input[id="username"]').type('Minnie')
        cy.get('input[id="password"]').type('minnie')
        cy.get('button[type = "submit"]').click()
        cy.url({timeout : 5000}).should('includes','/dashboard')
        cy.contains('Create Profile').click()
        cy.url({timeout:5000}).should('includes','/create-profile')
    })

    it('stays on same page if address field is not filled', () => {
        cy.get('input[id="city"]').type('Iowa City')
        cy.get('input[id="state"]').type('Iowa')
        cy.get('input[id="country"]').type('USA')
        cy.get('input[id="zipcode"]').type(87675)
        cy.get('input[id="homePhone"]').type(1234567890)
        cy.get('button[type="submit').click()
        cy.url({timeout : 5000}).should('includes','/create-profile')
    })

    it('stays on same page if city field is not filled', () => {
        cy.get('input[id="address1"]').clear().type('688,Collins road')
        cy.get('input[id="city"]').clear()
        cy.get('input[id="state"]').clear().type('Iowa')
        cy.get('input[id="country"]').clear().type('USA')
        cy.get('input[id="zipcode"]').clear().type(87675)
        cy.get('input[id="homePhone"]').clear().type(1234567890)
        cy.get('button[type="submit').click()
        cy.url({timeout : 5000}).should('includes','/create-profile')
    })

    it('stays on same page if state field is not filled', () => {
        cy.get('input[id="address1"]').clear().type('688,Collins road')
        cy.get('input[id="city"]').clear().type('Iowa City')
        cy.get('input[id="state"]').clear()
        cy.get('input[id="country"]').clear().type('USA')
        cy.get('input[id="zipcode"]').clear().type(87675)
        cy.get('input[id="homePhone"]').clear().type(1234567890)
        cy.get('button[type="submit').click()
        cy.url({timeout : 5000}).should('includes','/create-profile')
    })

    it('stays on same page if country field is not filled', () => {
        cy.get('input[id="address1"]').clear().type('688,Collins road')
        cy.get('input[id="city"]').clear().type('Iowa City')
        cy.get('input[id="state"]').clear().type('Iowa')
        cy.get('input[id="country"]').clear()
        cy.get('input[id="zipcode"]').clear().type(87675)
        cy.get('input[id="homePhone"]').clear().type(1234567890)
        cy.get('button[type="submit').click()
        cy.url({timeout : 5000}).should('includes','/create-profile')
    })

    it('stays on same page if zipcode field is not filled', () => {
        cy.get('input[id="address1"]').clear().type('688,Collins road')
        cy.get('input[id="city"]').clear().type('Iowa City')
        cy.get('input[id="state"]').clear().type('Iowa')
        cy.get('input[id="country"]').clear().type('USA')
        cy.get('input[id="zipcode"]').clear()
        cy.get('input[id="homePhone"]').clear().type(1234567890)
        cy.get('button[type="submit').click()
        cy.url({timeout : 5000}).should('includes','/create-profile')
    })

    it('stays on same page if Homephone field is not filled', () => {
        cy.get('input[id="address1"]').clear().type('688,Collins road')
        cy.get('input[id="city"]').clear().type('Iowa City')
        cy.get('input[id="state"]').clear().type('Iowa')
        cy.get('input[id="country"]').clear().type('USA')
        cy.get('input[id="zipcode"]').clear().type(87675)
        cy.get('input[id="homePhone"]').clear()
        cy.get('button[type="submit').click()
        cy.url({timeout : 5000}).should('includes','/create-profile')
    })

    it('creates-profile for a new user', () => {
        cy.get('input[id="address1"]').clear().type('688,Collins road')
        cy.get('input[id="city"]').clear().type('Iowa City')
        cy.get('input[id="state"]').clear().type('Iowa')
        cy.get('input[id="country"]').clear().type('USA')
        cy.get('input[id="zipcode"]').clear().type(87675)
        cy.get('input[id="homePhone"]').clear().type(1234567890)
        cy.get('button[type="submit').click()
        cy.url({timeout : 5000}).should('includes','/dashboard')
        cy.contains('has')
    })

    it('should not have create-profile if profile is created for the user', () => {
        cy.visit('http://localhost:3000/login')
        cy.get('input[id="username"]').type('Minnie')
        cy.get('input[id="password"]').type('minnie')
        cy.get('button[type = "submit"]').click()
        cy.url({timeout : 5000}).should('includes','/dashboard')
        cy.contains('has')
    })

    it('redirects to update-profile page', () => {
        cy.contains('Profile').click().then(() => {
            cy.get('a[href="/edit-profile"]').click()
            cy.url({timeout:5000}).should('includes','/edit-profile')
        })
        
    })

    
    

    
})