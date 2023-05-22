/// <reference types="cypress" />

describe('Testing claims form', () => {
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
  
    it('claims', () => {
        cy.get(':nth-child(3) > .MuiInputBase-input').type("evlahovlja1@etf.unsa.ba");
        cy.get(':nth-child(4) > .MuiInputBase-input').type("Sifra!23");
        cy.get('.login-btn').click();
        cy.get(':nth-child(6) > .MuiButtonBase-root').click();
        cy.get('.MuiList-root > [tabindex="0"]').click();
        cy.wait(4000);
        cy.get('.MuiTypography-h2 > .MuiButtonBase-root').click();
        cy.wait(4000);
        cy.get('.css-j0q1ur').should('exist');
        cy.get(':nth-child(5) > :nth-child(8) > .MuiButtonBase-root').click();
        cy.wait(4000);
        cy.get('.css-11sx3g7').should('exist');
        cy.get('.MuiInputBase-input').eq(8).type('I am not in danger');
        cy.get('.MuiInputBase-input').eq(9).type('I am the danger');
        cy.get('.MuiDropzoneArea-textContainer').attachFile('walterwhite.pdf', { subjectType: 'drag-n-drop' });
        cy.wait(6000);
        cy.get('.MuiButtonBase-root').contains('File claim').click();
        cy.get('.MuiTypography-h2 > .MuiButtonBase-root').click();
        cy.get('.css-j0q1ur').should('exist');
        cy.visit('http://digipay.cc/transaction/claims');
        cy.get('.MuiTableCell-root').contains('I am not in danger').should('exist');


        
    })
    
});