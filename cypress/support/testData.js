export const validUser = {
	username: 'GilTayar',
	password: 'ReallyGilTayar',
}

export const loginInputs = [
	{
		description: 'no username or password',
		username: '',
		password: '',
		error: 'Both Username and Password must be present',
		result: 'fail',
	},
	{
		description: 'only a username',
		username: 'GilTayar',
		error: 'Password must be present',
		result: 'fail',
	},
	{
		description: 'only a password',
		password: 'ReallyGilTayar',
		error: 'Username must be present',
		result: 'fail',
	},
	{
		description: 'a valid username and password',
		result: 'succeed',
		...validUser,
	},
]

export const baseUrl = 'https://demo.applitools.com/hackathon.html'
