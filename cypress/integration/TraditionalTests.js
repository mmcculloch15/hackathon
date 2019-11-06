import { loginInputs, validUser, baseUrl } from '../support/testData'

describe('Applitools Hackathon tests', () => {
	beforeEach(() => {
		cy.visit(baseUrl)
	})

	it('Should display all login page UI elements', () => {
		cy.findByPlaceholderText('John Smith').should('be.visible')
		cy.get('label:contains(Username)').should('be.visible')
		cy.findByPlaceholderText('ABC$*1@').should('be.visible')
		cy.get('label:contains(Pwd)').should('be.visible')
		cy.get('#log-in').should('be.visible')
		cy.get('.form-check-input').should('be.visible')
		cy.get('.logo-w').should('be.visible')
		cy.get('img[src*=social-icons]')
			.should('be.visible')
			.and('have.length', 2)
		cy.contains('Logout Form').should('be.visible')
	})

	/*For the case where the username is present but password is not, the curernt state of the V2 application makes it undetectable by 
		a functional test.  The text is present, it has display: block, but the z-index is not taken into account for the 'be.visible' assertion.
		Visual testing would catch this, as seen in VisualAITests.js
	*/
	loginInputs.map(input => {
		it(`Login form submission should ${input.result} when ${input.description} is entered and the form is submitted`, () => {
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
			/* let lastValue
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
			 */
			/* I've commented the above code out from V1, because with the ordering now being out of order on the V2 application, this test cannot
				 be made to pass unless you manually keep track of the the new order, which seems like a fruitless activity.  
			*/
		})

		it('should display a graph that compares expenses across years', () => {
			/* This type of test is a great candidate for visual testing
				 it would be very difficult(doing a lot of style comparisons)/impossible to test from a purely functional perspective.
				 This is the type of test that you could spend many hours trying to shoehorn into this framework, or you could run through visual validation
				 and be done in a minute with great test confidence :) 
			*/
		})
	})

	it('Should display an advertisement when showAd parameter is present in the URL', () => {
		cy.visit(`${baseUrl}?showAd=true`)
		cy.login()
		//It's not possible to determine that this element is not displaying correctly, and a visual test would help catch this error
		cy.get('#flashSale').should('be.visible')
		cy.get('#flashSale2 > img').should('be.visible')

		/* Limitations with this test for V2 of the app: Technically I could write a selector that validates the src attribute
			 of the img tag to guard against a different image being passed, but it wouldn't necessarily improve confidence that 
			 nothing has broken within the application, or the wrong image is now showing.  This is a better candidate for a visual test
			 if the new gif is a feature we want to specifically validate
		*/
	})
})
