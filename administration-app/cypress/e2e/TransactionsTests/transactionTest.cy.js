/// <reference types="cypress" />

describe('Testing transactions form', () => {
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.on('uncaught:exception', (err, runnable) => {
        return false;
      })
      
      cy.visit('http://digipay.cc/login');
    })
  
    it('transactions', () => {
        cy.get(':nth-child(3) > .MuiInputBase-input').type("kfejzic1@etf.unsa.ba");
        cy.get(':nth-child(4) > .MuiInputBase-input').type("String1!");
        cy.get('.login-btn').click();
        cy.get(':nth-child(6) > .MuiButtonBase-root').click();
        cy.get('.MuiList-root > [tabindex="0"]').click();
        cy.wait(4000);
        cy.get('.MuiTypography-h2 > .MuiButtonBase-root').click();
        cy.wait(4000);
        cy.get('.css-j0q1ur').should('exist');
        cy.get(':nth-child(4) > :nth-child(7) > .MuiButtonBase-root').click();
        cy.wait(4000);
        cy.get('.css-1st4djj > :nth-child(1)').click();
    })
    
});