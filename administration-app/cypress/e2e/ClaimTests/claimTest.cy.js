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
      cy.get('table').find('tr').eq(7).find('td').eq(4).click(50,40);
      cy.wait(1000);
      //cy.reload();
    })
    it('Open messages', () => {
      cy.get('[type="text"]').type('abrulic1@etf.unsa.ba');
      cy.get('[type="password"]').type('String1!');
      cy.get('.login-btn').click();
      cy.wait(3000);
      cy.reload();
      cy.contains('Transactions').click();
      cy.contains('Claims').click();
      cy.get('table').find('tr').eq(7).find('td').eq(4).click();
    })
    it('Add message to a claim', () => {
      cy.get('[type="text"]').type('abrulic1@etf.unsa.ba');
      cy.get('[type="password"]').type('String1!');
      cy.get('.login-btn').click();
      cy.wait(3000);
      cy.reload();
      cy.contains('Transactions').click();
      cy.contains('Claims').click();
      cy.get('table').find('tr').eq(1).find('td').eq(4).click();
      cy.get('[type="text"]').type('Nova poruka');
      cy.contains('Send Message').click();
      cy.contains('Cancel').click();
      cy.wait(1000);
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
      cy.wait(1000);
    })
    it('Click to assigne claim', () => {
      cy.get('[type="text"]').type('abrulic1@etf.unsa.ba');
      cy.get('[type="password"]').type('String1!');
      cy.get('.login-btn').click();
      cy.wait(3000);
      cy.reload();
      cy.contains('Transactions').click();
      cy.contains('Claims').click();
      cy.contains('Unassigned Claims').click();
      cy.wait(1000);
      cy.get('table').eq(1).find('tr').eq(2).find('td').eq(4).click();
    })
  });