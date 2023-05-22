/// <reference types="cypress" />
describe('Testing claims', () => {
    beforeEach(() => {
      cy.on('uncaught:exception', (err, runnable) => {
        return false;
      })
      cy.visit('http://digipay.cc/login');
    })
      
    it('Checks if claim button exists', () => {
      cy.get('[type="text"]').type('abrulic1@etf.unsa.ba');
      cy.get('[type="password"]').type('String1!');
      cy.get('.login-btn').click();
      cy.wait(3000);
      cy.reload();
      cy.contains('Transactions').click();
      cy.contains('Claims').should('exist');
    })
    it('Click on claim button', () => {
      cy.get('[type="text"]').type('abrulic1@etf.unsa.ba');
      cy.get('[type="password"]').type('String1!');
      cy.get('.login-btn').click();
      cy.wait(3000);
      cy.reload();
      cy.contains('Transactions').click();
      cy.contains('Claims').click();
    })
    it('Click to solve claim', () => {
      cy.get('[type="text"]').type('abrulic1@etf.unsa.ba');
      cy.get('[type="password"]').type('String1!');
      cy.get('.login-btn').click();
      cy.wait(3000);
      cy.reload();
      cy.contains('Transactions').click();
      cy.contains('Claims').click();
      cy.get('.css-1ujsas3').eq(6).click();
      cy.reload();
    })
    it('Open messages', () => {
      cy.get('[type="text"]').type('abrulic1@etf.unsa.ba');
      cy.get('[type="password"]').type('String1!');
      cy.get('.login-btn').click();
      cy.wait(3000);
      cy.reload();
      cy.contains('Transactions').click();
      cy.contains('Claims').click();
      cy.get('.css-1ujsas3').eq(1).click();
    })
    it('Add message to a claim', () => {
      cy.get('[type="text"]').type('abrulic1@etf.unsa.ba');
      cy.get('[type="password"]').type('String1!');
      cy.get('.login-btn').click();
      cy.wait(3000);
      cy.reload();
      cy.contains('Transactions').click();
      cy.contains('Claims').click();
      cy.get('.css-1ujsas3').eq(1).click();
      cy.get('[type="text"]').type('Nova poruka');
      cy.get('.css-1hw9j7s').click();
      cy.contains('Cancel').click();
    })
    it('Click to see unassigned claims', () => {
      cy.get('[type="text"]').type('abrulic1@etf.unsa.ba');
      cy.get('[type="password"]').type('String1!');
      cy.get('.login-btn').click();
      cy.wait(3000);
      cy.reload();
      cy.contains('Transactions').click();
      cy.contains('Claims').click();
      cy.contains('Unassigned Claims').click();
    })
    /*it('Click to assigne claim', () => {
      cy.get('[type="text"]').type('abrulic1@etf.unsa.ba');
      cy.get('[type="password"]').type('String1!');
      cy.get('.login-btn').click();
      cy.wait(3000);
      cy.reload();
      cy.contains('Transactions').click();
      cy.contains('Claims').click();
      cy.contains('Unassigned Claims').click();
      cy.get('.css-vubbuv"').eq(0).click();
      cy.reload();
    })*/
  });