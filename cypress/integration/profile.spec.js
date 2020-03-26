/// <reference types="cypress" />
describe('create-profile page', () => {
   //const getStore = () => cy.window().its('app.$store')
    it('should sign up user with valid details', () => {
        cy.visit('http://localhost:3000/register')
        cy.get('input[id="name"]').type('Minnie')
        cy.get('input[id="username"]').type('Minnie')
        cy.get('input[id = "email"]').type('minnie@gmail.com')
        cy.get('input[id="password"]').type('minnie')
        cy.get('input[id="password2"]').type('minnie')
        cy.get('button[type="submit"]').click()
        cy.url({timeout:5000}).should('includes','/emailVerifyPage')
    })

    it('dashboard has create profile link if there is no profile for the user', () => {
        cy.visit('http://localhost:3000/login')
        cy.get('input[id="username"]').type('Minnie')
        cy.get('input[id="password"]').type('minnie')
        cy.get('button[type = "submit"]').click()
        cy.url({timeout : 5000}).should('includes','/dashboard')
        cy.get('button[type="submit"]').click()
        const stub = cy.stub()
        cy.on('window:confirm',(str,stub) => {
            expect(str).to.equal('Are you sure to delete your account?')
            cy.get('button').contains('cancel').click().
                then(() => {
                    cy.url({timeout:5000}).should('includes','/dashboard')
                })
        })
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
        cy.get('input[id="address2"]').clear().type('Apt72')
        cy.get('input[id="city"]').clear().type('Iowa City')
        cy.get('input[id="state"]').clear().type('Iowa')
        cy.get('input[id="country"]').clear().type('USA')
        cy.get('input[id="zipcode"]').clear().type(87675)
        cy.get('input[id="homePhone"]').clear().type(1234567890)
        cy.get('input[id="mobilePhone"]').clear().type(569806342)
        cy.get('input[id="alternateEmail"]').clear().type('xxx@trial.com')
        cy.get('button[type="submit').click()
        cy.url({timeout : 5000}).should('includes','/dashboard')
        cy.get('span').contains('Delete My Account')
    })

    it('redirects to update-profile page', () => {
        cy.contains('Profile').click().then(() => {
            cy.get('a[href="/edit-profile"]').click()
            cy.url({timeout:5000}).should('includes','/edit-profile')
        })
        
    })

    it('details should be populated initially in the edit profile page', () => {
        cy.get('input[id="address1"]').should('have.value','688,Collins road')
        cy.get('input[id="address2"]').should('have.value','Apt72')
        cy.get('input[id="city"]').should('have.value','Iowa City')
        cy.get('input[id="state"]').should('have.value','Iowa')
        cy.get('input[id="country"]').should('have.value','USA')
        cy.get('input[id="zipcode"]').should('have.value','87675')
        cy.get('input[id="homePhone"]').should('have.value','1234567890')
        cy.get('input[id="mobilePhone"]').should('have.value','569806342')
        cy.get('input[id="alternateEmail"]').should('have.value','xxx@trial.com')
    })

    it('updates the user profile with new information after editing the details in the form', () => {
        cy.get('input[id="address1"]').clear().type('700,Collins road')
        cy.get('input[id="address2"]').clear().type('Apt73')
        cy.get('input[id="city"]').clear().type('Iowa City')
        cy.get('input[id="state"]').clear().type('Iowa')
        cy.get('input[id="country"]').clear().type('USA')
        cy.get('input[id="zipcode"]').clear().type(87674)
        cy.get('input[id="homePhone"]').clear().type(1234567890)
        cy.get('input[id="mobilePhone"]').clear().type(5698063429)
        cy.get('input[id="alternateEmail"]').clear().type('xxx@trial.com')
        cy.get('button[type="submit').click()
        cy.url({timeout:5000}).should('includes','/edit-profile')
        cy.get('input[id="address1"]').should('have.value','700,Collins road')
        cy.get('input[id="address2"]').should('have.value','Apt73')
        cy.get('input[id="city"]').should('have.value','Iowa City')
        cy.get('input[id="state"]').should('have.value','Iowa')
        cy.get('input[id="country"]').should('have.value','USA')
        cy.get('input[id="zipcode"]').should('have.value','87674')
        cy.get('input[id="homePhone"]').should('have.value','1234567890')
        cy.get('input[id="mobilePhone"]').should('have.value','5698063429')
    }) 

    it('redirects to dashboard and contains delete profile button', () => {
        cy.get('a[href="/dashboard"]').click()
        cy.url({timeout:5000}).should('includes','/dashboard')
        cy.get('span').contains('Delete My Account')
    })

    it('provides a confirmation window before deleting the account', () => {
        cy.get('button[type="submit"]').click()
        const stub = cy.stub()
        cy.on('window:confirm',(str,stub) => {
            expect(str).to.equal('Are you sure to delete your account?')
        })
    })

    it('provides a confirmation window before deleting the account', () => {
        cy.get('button[type="submit"]').click()
        const stub = cy.stub()
        cy.on('window:confirm',(str,stub) => {
            expect(str).to.equal('Are you sure to delete your account?')
            cy.get('button').contains('cancel').click().
                then(() => {
                    cy.url({timeout:5000}).should('includes','/dashboard')
                })
        })
    })

    it('deletes the account and user on clicking ok', () => {
        cy.get('button[type="submit"]').click()
        const stub = cy.stub()
        cy.on('window:confirm',(str,stub) => {
            expect(str).to.equal('Are you sure to delete your account?')
            cy.get('button').contains('ok').click().
                then(() => {
                    cy.url({timeout:5000}).should('includes','/login')
                })
        })
    })

    it('should stay in the same login page after deleting the user', () => {
        cy.visit('http://localhost:3000/login')
        cy.get('input[id="username"]').type('Minnie')
        cy.get('input[id="password"]').type('minnie')
        cy.get('button[type = "submit"]').click()
        cy.url({timeout:5000}).should('includes','/login')

    })
    
})