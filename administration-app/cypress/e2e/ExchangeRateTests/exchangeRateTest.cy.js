/// <reference types="cypress" />
describe('Testing claims', () => {
    beforeEach(() => {
        cy.on('uncaught:exception', (err, runnable) => {
            return false;
        })
        cy.visit('http://digipay.cc/login');
        cy.get('[type="text"]').type('evlahovlja1@etf.unsa.ba');
        cy.get('[type="password"]').type('Sifra!23');
        cy.get('.login-btn').click();
        cy.wait(3000);
    })

    it('Checks if currencies button exists', () => {
        cy.wait(500)
        cy.get('a').contains('Currencies').should('exist')
    })
    it('Checks if create new exchange rate button exists', () => {
        cy.wait(500)
        cy.get('a').contains('Currencies').click()
        cy.wait(1500)
        cy.get('button').contains('Add New Exchange Rate').should('exist')
    })
    it('Try to add already existing exchange rate', () => {
        cy.wait(500)
        cy.get('a').contains('Currencies').click()
        cy.wait(1500)
        cy.get('button').contains('Add New Exchange Rate').click()
        cy.wait(200)

        cy.get('div[aria-expanded="false"]').eq(1).click()
        cy.wait(100)
        cy.get('li[role="option"]').first().click()

        cy.get('div[aria-expanded="false"]').eq(2).click()
        cy.wait(100)
        cy.get('li[role="option"]').eq(2).click()
        
        cy.wait(100)
        cy.get('input[type="text"]').first().click().type(0.55)
        
        cy.get('.react-datepicker__close-icon').click()
        cy.wait(100)

        cy.get('button').contains(/^Add$/).click()
        cy.wait(2000)

        cy.get('div[role="row"]').its('length').should('eq', 3)
    })

    it('Add new exchange rate', () => {
        cy.wait(500)
        cy.get('a').contains('Currencies').click()
        cy.wait(1500)
        cy.get('button').contains('Add New Exchange Rate').click()
        cy.wait(200)

        cy.get('div[aria-expanded="false"]').eq(1).click()
        cy.wait(100)
        cy.get('li[role="option"]').first().click()

        cy.get('div[aria-expanded="false"]').eq(2).click()
        cy.wait(100)
        cy.get('li[role="option"]').eq(3).click()
        
        cy.wait(100)
        cy.get('input[type="text"]').first().click().type(0.5)
        
        cy.get('.react-datepicker__close-icon').click()
        cy.wait(100)

        cy.get('button').contains(/^Add$/).click()
        cy.wait(2000)

        cy.get('div[role="row"]').its('length').should('eq', 5)
    })
});