/// <reference types="cypress" />

import Register from '../../client/src/components/auth/Register';

describe("Register Test", ()) => {
    it('can get the form', () => {
        cy.visit('http://localhost:3000');
    })
}