/// <reference types="cypress" />

describe('Testing login form', () => {
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
  
    it('checks the form elements', () => {
      cy.get('.login-container').should('exist');
      cy.get('[type="text"]').should('exist');
      cy.get('[type="password"]').should('exist');
      cy.get('button').contains('Log in with Google');
      cy.get('button').contains('Log in with Facebook');
      cy.get('.login-btn').contains('Login');
    })

    it('submits the empty form', () => {
      cy.get('.login-btn').click();
      cy.wait(3000);
      cy.get('.login-container').contains('User not found!');
    })

    it('executes login of the correct user (E-mail)', () => {
      cy.get('[type="text"]').type('fejza2806@gmail.com');
      cy.get('[type="password"]').type('String1!');
      cy.get('.login-btn').click();
      cy.wait(3000);
      cy.get('h3').contains('adminUser');
    })

    it('executes login of the correct user (Phone)', () => {
      cy.get('[type="text"]').type('062518214');
      cy.get('[type="password"]').type('String1!');
      cy.get('.login-btn').click();
      cy.wait(3000);
      cy.get('h3').contains('adminUser');
    })

    it('tries login with incorrect mail', () => {
      cy.get('[type="text"]').type('fakemail@gmail.com');
      cy.get('[type="password"]').type('String1!');
      cy.get('.login-btn').click();
      cy.wait(3000);
      cy.get('.login-container').contains('Email/Phone/Password combination mismatch!');
    })

    it('tries login with incorrect password', () => {
      cy.get('[type="text"]').type('fejza2806@gmail.com');
      cy.get('[type="password"]').type('PogresanPassword123');
      cy.get('.login-btn').click();
      cy.wait(3000);
      cy.get('.login-container').contains('Email/Phone/Password combination mismatch!');
    })

    it('executes login of the user with 2FA enabled', () => {
      cy.get('[type="text"]').type('mbecirovic3@etf.unsa.ba');
      cy.get('[type="password"]').type('String1!');
      cy.get('.login-btn').click();
      cy.wait(3000);
      cy.get('.auth-container').contains('2-Factor Authentication');
      cy.get('.code-container').should('exist');
      cy.get('.verify-btn').should('exist');
    })

    it('executes user logout', () => {
      cy.get('[type="text"]').type('fejza2806@gmail.com');
      cy.get('[type="password"]').type('String1!');
      cy.get('.login-btn').click();
      cy.wait(3000);
      cy.get('[aria-label="Account"]').click();
      cy.get('li').contains('Log out').click();
      cy.wait(1000);
      cy.get('.login-container').should('exist');
    })
});