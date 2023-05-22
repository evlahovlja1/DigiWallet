/// <reference types="cypress" />

describe('Testing Transaction and view functionality', () => {
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.on('uncaught:exception', (err, runnable) => {
        return false;
      })
    })
  
    it('Test: App renders correct number of transactions', () => {
        cy.visit('localhost:3000/login');
        cy.get('[type="text"]').type('fejza2806@gmail.com');
        cy.get('[type="password"]').type('String1!');
        cy.get('.login-btn').click();
        cy.wait(5000);
        cy.visit('localhost:3000/transactions');
        cy.wait(5000);
        cy.get('[data-testid="transaction-mock-button"]').click()
        cy.wait(3000)
        cy.get('[data-testid="transaction-list-table"]').should('exist');
        //cy.get('[data-testid="transaction-list-table"]').find('.css-1p72hwd-MuiTableRow-root').should('have.length', 15); // auto-populated treba imati 15 prvo transakcija
        cy.get('[data-testid="transaction-list-table"]').find('[data-testid="transaction-list-row"]').should('have.length', 15); 
        cy.scrollTo('bottom');
        cy.wait(3000)
        cy.scrollTo('top');
    })

    it('Test: App renders correct details about transactions', () => {
        cy.visit('localhost:3000/login');
        cy.get('[type="text"]').type('fejza2806@gmail.com');
        cy.get('[type="password"]').type('String1!');
        cy.get('.login-btn').click();
        cy.wait(5000);
        cy.visit('localhost:3000/transactions');
        cy.wait(5000);
        cy.get('[data-testid="transaction-mock-button"]').click()
        cy.wait(3000)
        cy.contains('button', 'Details').first().click();
        cy.get('[data-testid="transaction-details-table"]').find('[data-testid="transaction-details-table-head"]').invoke('text').
        then(columnNames => {
            const expectedColumns = ['ID', 'Date', 'Recipient', 'Amount', 'Currency', 'Sender', 'Type', 'Purpose'];

            // Provjera da li su očekivane kolone prisutne u tabeli
            expectedColumns.forEach(column => {
              expect(columnNames).to.include(column);
            });
        })
        cy.get('[data-testid="transaction-details-table"]').find('[data-testid="transaction-details-table-row"]').should('exist'); // ovo potvrdjuje da postoji red sa informacijama
    })

    it('Test: App redirect user from details transaction page to transactions page when button "Close" is clicked', () => {
        cy.visit('localhost:3000/login');
        cy.get('[type="text"]').type('fejza2806@gmail.com');
        cy.get('[type="password"]').type('String1!');
        cy.get('.login-btn').click();
        cy.wait(5000);
        cy.visit('localhost:3000/transactions');
        cy.wait(5000);
        cy.get('[data-testid="transaction-mock-button"]').click()
        cy.wait(3000)
        cy.contains('button', 'Details').first().click();
        cy.wait(1000);
        cy.contains('button', 'Close').click();
        cy.wait(1000);
        cy.get('[data-testid="transaction-mock-button"]').click()
        cy.wait(1000)
        cy.get('[data-testid="transaction-list-table"]').should('exist'); 
    });

    it('Test: App renders correct number of transactions after filtering by some criteria', () => {
        cy.visit('localhost:3000/login');
        cy.get('[type="text"]').type('fejza2806@gmail.com');
        cy.get('[type="password"]').type('String1!');
        cy.get('.login-btn').click();
        cy.wait(5000);
        cy.visit('localhost:3000/transactions');
        cy.wait(5000);
        cy.get('[data-testid="transaction-mock-button"]').click()
        cy.wait(3000)
        cy.get('[data-testid="transaction-list-table"]').should('exist');
  
        // RECIPIENT:
        cy.get('[data-testid="recipient-input"]').type('XYZ Company');
        cy.get('[data-testid="filter-test"]').click();
        cy.get('[data-testid="transaction-list-table"]').find('[data-testid="transaction-list-row"]').should('have.length', 3);
        cy.wait(3000); 
        cy.get('[data-testid="recipient-input"]').clear();
        cy.wait(1000);
        cy.get('button').contains('Restart').click();

        cy.wait(3000);

        // AMOUNT:
        cy.get('[data-testid="amount-min-input"]').type('50');
        cy.get('[data-testid="amount-max-input"]').type('200');
        cy.get('[data-testid="filter-test"]').click();
        cy.get('[data-testid="transaction-list-table"]').find('[data-testid="transaction-list-row"]').should('have.length', 6);
        cy.wait(3000);
        cy.get('[data-testid="recipient-input"]').clear();
        cy.wait(1000);
        cy.get('button').contains('Restart').click();

        cy.wait(3000);
    });

    it('Test: App renders transactions which are sorted by some criteria', () => {
        cy.visit('localhost:3000/login');
        cy.get('[type="text"]').type('fejza2806@gmail.com');
        cy.get('[type="password"]').type('String1!');
        cy.get('.login-btn').click();
        cy.wait(5000);
        cy.visit('localhost:3000/transactions');
        cy.wait(5000);
        cy.get('[data-testid="transaction-mock-button"]').click()
        cy.wait(3000)
        cy.get('[data-testid="transaction-list-table"]').should('exist');
        cy.wait(1000);
 +      
        cy.get('[data-id="sort-recipient"]').click();
        cy.get('[data-testid="transaction-list-table"]').find('[data-testid="transaction-list-row"]').first().find('[data-testid="recipient-value-test"]').invoke('text').should('eq', 'ABC Consulting')
        cy.wait(3000);
        
        cy.get('[data-id="sort-amount"]').click();
        cy.get('[data-testid="transaction-list-table"]').find('[data-testid="transaction-list-row"]').first().find('[data-testid="amount-value-test"]').invoke('text').should('eq', '6.44')
        cy.wait(3000);

        cy.get('[data-id="sort-currency"]').click();
        cy.get('[data-testid="transaction-list-table"]').find('[data-testid="transaction-list-row"]').first().find('[data-testid="currency-value-test"]').invoke('text').should('eq', 'BAM')
        cy.wait(3000);

        cy.get('[data-id="sort-type"]').click();
        cy.get('[data-testid="transaction-list-table"]').find('[data-testid="transaction-list-row"]').first().find('[data-testid="type-value-test"]').invoke('text').should('eq', 'B2B')
        cy.wait(3000)
    });

    it('Test: App renders transactions which are group by some criteria', () => {
        cy.visit('localhost:3000/login');
        cy.get('[type="text"]').type('fejza2806@gmail.com');
        cy.get('[type="password"]').type('String1!');
        cy.get('.login-btn').click();
        cy.wait(5000);
        cy.visit('localhost:3000/transactions');
        cy.wait(5000);
        cy.get('[data-testid="transaction-mock-button"]').click()
        cy.wait(3000)
        cy.get('[data-testid="transaction-list-table"]').should('exist');
        cy.wait(1000);
        cy.get('[data-testid="group-by-test"]').click();
        cy.get('[data-testid="group-by-c"]').click();
        //cy.get('[data-testid="transaction-list-table"]').find('.css-2blr9s-MuiTableRow-root').should('have.length', 8); // provjeriti jer je hc
        cy.get('[data-testid="transaction-list-table"]').find('[data-testid="red-za-grupisanje"]').should('have.length', 8); // provjeriti jer je hc
        cy.wait(3000);
        //cy.get('.css-1pe4mpk-MuiButtonBase-root-MuiIconButton-root').first().click();
        cy.get('[data-testid="ikona-za-prikaz"]').first().click();
        cy.get('[data-testid="tabela-za-grupisanje-t"]').find('[data-testid="transaction-list-row"]').should('have.length', 16)
        //cy.get('.css-rqglhn-MuiTable-root').find('.css-1p72hwd-MuiTableRow-root').should('have.length', 16)
        // data-testid="transaction-list-row" za one liste transackija kad se klikne na ^
        cy.wait(3000);
        cy.get('[data-testid="group-by-test"]').click();
        cy.get('[data-testid="group-by-t"]').click();
        cy.get('[data-testid="transaction-list-table"]').find('[data-testid="red-za-grupisanje"]').should('have.length', 3);
        cy.wait(3000);
        //cy.get('.css-1pe4mpk-MuiButtonBase-root-MuiIconButton-root').first().click();
        cy.get('[data-testid="ikona-za-prikaz"]').first().click();
        //cy.get('.css-rqglhn-MuiTable-root').find('.css-1p72hwd-MuiTableRow-root').should('have.length', 6)
        cy.get('[data-testid="tabela-za-grupisanje-t"]').find('[data-testid="transaction-list-row"]').should('have.length', 6)
        cy.wait(3000)
    });

    
})