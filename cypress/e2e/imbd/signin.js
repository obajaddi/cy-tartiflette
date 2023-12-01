/// <reference types="cypress" />

describe('Testing sign in feature', () => {
	it('I can login with a valid account', function () {
		cy.loginTest()
		cy.contains(this.users.main.username).should('be.visible')
	})

	it('I can not login with wrong mail', function () {
		cy.loginTest('wrongMail')
		cy.get('#auth-error-message-box')
			.should('be.visible')
			.and('contain.text', 'There was a problem')
		cy.get('.a-list-item')
			.should('be.visible')
			.and('contain.text', 'We cannot find an account with that email address')
	})

	it('I can not login with wrong password', function () {
		cy.loginTest(this.users.main.mail, 'wrongPassword')
		cy.get('#auth-error-message-box')
			.should('be.visible')
			.and('contain.text', 'There was a problem')
		cy.get('.a-list-item')
			.should('be.visible')
			.and('contain.text', 'Your password is incorrect')
	})
})
