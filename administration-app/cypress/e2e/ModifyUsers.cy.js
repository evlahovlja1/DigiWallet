/// <reference types="cypress" />

describe('User Management', () => {
	beforeEach(() => {
		// Cypress starts out with a blank slate for each test
		// so we must tell it to visit our website with the `cy.visit()` command.
		// Since we want to visit the same URL at the start of all our tests,
		// we include it in our beforeEach function so that it runs before each test
		cy.on('uncaught:exception', (err, runnable) => {
			return false;
		});
		cy.visit('http://digipay.cc/login');
		cy.login('abrulic1@etf.unsa.ba', 'String1!');
		cy.get("[aria-label='Account']").click();
		cy.get("[data-testid='PersonIcon']").click();
		cy.visit('http://digipay.cc/user-management');
	});

	it('should contain edit and reset options', () => {
		cy.get("[data-testid='EditIcon']").should('be.visible');
		cy.get("[data-testid='LockResetIcon']").should('be.visible');
	});

	it('should open an edit window with user data', () => {
		cy.get('tr')
			.first()
			.get('td')
			.then(data => {
				cy.get("[data-testid='EditIcon']").first().click();
				cy.get("input[name='name']").should('have.value', data[0].textContent);
				cy.get("input[name='surname']").should('have.value', data[1].textContent);
				cy.get("input[name='email']").should('have.value', data[2].textContent);
				cy.get("input[name='phone']").should('have.value', data[3].textContent);
				cy.get("input[name='address']").should('have.value', data[4].textContent);
				cy.get("input[name='role']").should('have.value', data[5].textContent);
			});
	});

	it('should update all user data', () => {
		cy.get('tr')
			.first()
			.get('td')
			.then(data => {
				cy.get("[data-testid='EditIcon']").first().click();
				cy.get("input[name='name']").type('edit');
				cy.get("input[name='surname']").type('edit');
				cy.get("input[name='email']").type('edit');
				cy.get("input[name='phone']").clear().type('061 789 789');
				cy.get("input[name='address']").type('edit');
				cy.get('#mui-component-select-role').click();
				cy.get("[data-value='Restricted']").click();
				cy.get("button[type='submit']").click();
				cy.reload();
				cy.get('tr')
					.first()
					.get('td')
					.then(newData => {
						expect(newData[0]).to.contain('edit');
						expect(newData[1]).to.contain('edit');
						expect(newData[2]).to.contain('edit');
						expect(newData[3]).to.contain('061 789 789');
						expect(newData[4]).to.contain('edit');
						expect(newData[5]).to.contain('Restricted');
					});
			});
	});

	it('should trigger password reset', () => {
		cy.intercept('POST', 'http://siprojekat.duckdns.org:5051/api/User/forgotPassword', req => {
			req.reply(res => {
				res.send('Password reset request has been made');
			});
		});
		cy.get("[data-testid='LockResetIcon']").first().click();
	});

	it('should display three different roles', () => {
		cy.get("[data-testid='EditIcon']").first().click();
		cy.get('#mui-component-select-role').click();
		cy.get("[role='listbox']").find('li').should('have.length', 3);
	});
});
