import { loginInputs, validUser, baseUrl } from '../support/testData'

describe('Applitools Hackathon tests - Traditional', () => {
	beforeEach(() => {
		cy.visit(baseUrl)
		cy.eyesOpen({
			appName: 'Applitools Hackathon App',
			batchName: 'Hackathon',
		})
	})

	afterEach(() => {
		cy.eyesClose()
	})

	it('Should display all login page UI elements', () => {
		cy.eyesCheckWindow('Login screen')
	})

	loginInputs.map(input => {
		it(`Login form submission should ${input.result} when ${input.description} is entered and the form is submitted`, () => {
			if (input.username) cy.get('#username').type(input.username)
			if (input.password) cy.get('#password').type(input.password)
			cy.get('#log-in').click()
			cy.eyesCheckWindow('After form submission')
		})
	})

	it('Should display an advertisement when showAd parameter is present in the URL when login occurs', () => {
		cy.visit(`${baseUrl}?showAd=true`)
		cy.login()
		cy.eyesCheckWindow('Advertisements on the dashboard')
	})

	describe('Authenticated user tests', () => {
		beforeEach(() => {
			cy.login()
		})

		it('Should be able to sort the Amount of recent transacations in ascending order', () => {
			cy.get('#amount').click()
			cy.eyesCheckWindow('Amount sorted by ascending order')
		})

		it('should display a graph that compares expenses across years', () => {
			cy.get('#showExpensesChart').click()
			cy.wait(2000) //Explicit waits are undesirable, but necessary due to the animation time of the charting library
			cy.eyesCheckWindow('Initial chart')
			cy.get('#addDataset').click()
			cy.wait(2000)
			cy.eyesCheckWindow('Chart with 2019 data added')
		})
	})
})
