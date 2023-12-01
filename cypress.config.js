const { defineConfig } = require('cypress')

module.exports = defineConfig({
	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
		// -- GLOBAL OPTIONS -- //
		specPattern: 'cypress/e2e/**/*.{js,jsx,ts}',
		testIsolation: true,
		//baseUrl: '',
		includeShadowDom: true,
		screenshotOnRunFailure: true,
		retries: {
			runMode: 0,
			openMode: 0,
		},
		defaultCommandTimeout: 10 * 1000,
		pageLoadTimeout: 30 * 1000,
		excludeSpecPattern: ['cypress/e2e/cypress-examples'],
		// -- VIDEO -- //
		video: false,
		videoCompression: 32,
		// -- BROWSER -- //
		chromeWebSecurity: false,
		//blockHosts: null,
		// -- VIEWPORT -- //
		viewportHeight: 720,
		viewportWidth: 1280,
	},
})
