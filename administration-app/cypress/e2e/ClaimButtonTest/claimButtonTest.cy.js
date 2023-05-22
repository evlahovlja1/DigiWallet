/// <reference types="cypress" />

describe('Testing claims form', () => {
    beforeEach(() => {
      cy.on('uncaught:exception', (err, runnable) => {
        return false;
      })
      
      cy.visit('http://digipay.cc/login');
    })
  
    it('Testing if filing a claim works as expected', () => {
        cy.get(':nth-child(3) > .MuiInputBase-input').type("evlahovlja1@etf.unsa.ba");
        cy.get(':nth-child(4) > .MuiInputBase-input').type("Sifra!23");
        cy.get('.login-btn').click();
        cy.get(':nth-child(6) > .MuiButtonBase-root').click();
        cy.get('.MuiList-root > [tabindex="0"]').click();
        cy.get('.css-1a4b21o').eq(6).click();
        cy.get('.MuiInputBase-input').eq(8).type('I am not in danger Skyler');
        cy.get('.MuiInputBase-input').eq(9).type('I am the danger');
        cy.get('.MuiDropzoneArea-textContainer').attachFile('walterwhite.pdf', { subjectType: 'drag-n-drop' });
        cy.wait(5000);
        cy.get('.MuiButtonBase-root').contains('File claim').click();
        cy.visit('http://digipay.cc/transaction/claims');
        cy.get('.MuiTableCell-root').contains('I am not in danger Skyler').should('exist');
    })
    
});