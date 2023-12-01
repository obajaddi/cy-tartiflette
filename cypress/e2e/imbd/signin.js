/// <reference types="cypress" />

describe('Testing sign in feature', () => {
	beforeEach(() => {
		cy.fixture('imbd-accounts.json').as('users')
		cy.visit('https://www.imdb.com/')
		cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
		cy.title().should(
			'contain',
			'IMDb: Ratings, Reviews, and Where to Watch the Best Movies & TV Shows'
		)
		cy.url().should('contain', 'imdb')
	})

	it.only('I can login with a valid account', function () {
		cy.get('.nav__userMenu > .ipc-btn--single-padding').click()
		cy.get('#signin-options .imdb-logo').click()
		cy.get('#ap_email').type(this.users.main.mail)
		// Not a good practice
		// Should use secrets in env variables like 'CYPRESS_password=secret'
		// Then use "Cypress.env('password')""
		cy.get('#ap_password').type(this.users.main.password, { log: false })
		cy.get('#signInSubmit').click()
		cy.contains(this.users.main.username).should('be.visible')
	})

	it('I can not login with wrong mail', function () {
		cy.get('.nav__userMenu > .ipc-btn--single-padding').click()
		cy.get('#signin-options .imdb-logo').click()
		cy.get('#ap_email').type('wrongMail')
		cy.get('#ap_password').type(this.users.main.password, { log: false })
		cy.get('#signInSubmit').click()
		cy.get('#auth-error-message-box')
			.should('be.visible')
			.and('contain.text', 'There was a problem')
		cy.get('.a-list-item')
			.should('be.visible')
			.and('contain.text', 'We cannot find an account with that email address')
	})

	it('I can not login with wrong password', function () {
		cy.get('.nav__userMenu > .ipc-btn--single-padding').click()
		cy.get('#signin-options .imdb-logo').click()
		cy.get('#ap_email').type(this.users.main.mail)
		cy.get('#ap_password').type('wrongPassword')
		cy.get('#signInSubmit').click()
		cy.get('#auth-error-message-box')
			.should('be.visible')
			.and('contain.text', 'There was a problem')
		cy.get('.a-list-item')
			.should('be.visible')
			.and('contain.text', 'Your password is incorrect')
	})
})
