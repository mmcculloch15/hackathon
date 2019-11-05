import { loginInputs, validUser } from '../support/testData'

describe('Applitools Hackathon tests', () => {
	beforeEach(() => {
		cy.visit('https://demo.applitools.com/hackathonV2.html')
	})

	it('Should display all login page UI elements', () => {
		cy.get('#username').should('be.visible')
		cy.get('#password').should('be.visible')
		cy.get('#log-in').should('be.visible')
		cy.get('.form-check-input').should('be.visible')
		cy.get('.os-icon-fingerprint').should('be.visible')
		cy.get('.logo-w').should('be.visible')
		cy.get('a > img[src*=social-icons]')
			.should('be.visible')
			.and('have.length', 3)
		cy.contains('Login Form').should('be.visible')
	})

	loginInputs.map(input => {
		it(`Login form submission should ${input.result} when ${input.description} is entered and the form is submitted`, () => {
			cy.get('#username').clear()
			cy.get('#username').clear()
			if (input.username) cy.get('#username').type(input.username)
			if (input.password) cy.get('#password').type(input.password)
			cy.get('#log-in').click()
			if (input.error) cy.contains(input.error).should('be.visible')
			else cy.get('.logged-user-w').should('be.visible')
		})
	})

	describe('Authenticated user tests', () => {
		beforeEach(() => {
			cy.login()
		})

		it('should be able to sort the Amount of recent transacations in ascending order', () => {
			let lastValue
			cy.get('#amount').click()
			cy.get('span:contains(USD)').each(priceEl => {
				const price = Number(
					priceEl
						.text()
						.replace('USD', '')
						.replace(' ', '')
						.replace(',', '')
				)
				if (lastValue) expect(price).to.be.greaterThan(lastValue)
				lastValue = price
			})
		})

		it('should be able to display a graph that compares expenses', () => {
			/* This type of test is a great candidate for visual testing
				 it would be very difficult(doing a lot of style comparisons)/impossible to test from a purely functional perspective.
				 This is the type of test that you could spend many hours trying to shoehorn into this framework, or you could run through visual validation
				 and be done in a minute with great test confidence :) 
			*/
		})
	})

	it('Should display an advertisement when showAd parameter is present in the URL', () => {
		cy.visit('https://demo.applitools.com/hackathonV2.html?showAd=true')
		cy.login()
		cy.get('#flashSale > img').should('be.visible')
		cy.get('#flashSale2 > img').should('be.visible')

		/* Limitations with this test for V2 of the app: Technically I could write a selector that validates the src attribute
			 of the img tag to guard against a different image being passed, but it wouldn't necessarily improve confidence that 
			 nothing has broken within the application, or the wrong image is now showing.  This is a better candidate for a visual test
			 if the gif is a feature we want to specifically validate
		*/
	})
})
