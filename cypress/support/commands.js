before(() => {
	cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
	cy.fixture('imbd-accounts.json').as('users')
})

beforeEach(() => {
	cy.visitHomePage()
})

Cypress.Commands.add('visitHomePage', () => {
	cy.visit('https://www.imdb.com/')
	cy.title().should(
		'contain',
		'IMDb: Ratings, Reviews, and Where to Watch the Best Movies & TV Shows'
	)
	cy.url().should('contain', 'imdb')
})

Cypress.Commands.add(
	'loginTest',
	function (email = this.users.main.mail, password = this.users.main.password) {
		cy.get('.nav__userMenu > .ipc-btn--single-padding').click()
		cy.get('#signin-options .imdb-logo').click()
		cy.get('#ap_email').type(email)
		// Not a good practice
		// Should use secrets in env variables like 'CYPRESS_password=secret'
		// Then use "Cypress.env('password')""
		cy.get('#ap_password').type(password, { log: false })
		cy.get('#signInSubmit').click()
	}
)

Cypress.Commands.add('login', function () {
	cy.loginTest()
	cy.contains(this.users.main.username).should('be.visible')
})
