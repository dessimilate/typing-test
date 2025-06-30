class Errors {
	email = {
		required: 'Email is required',
		incorrect: 'Email is incorrect'
	}

	password = {
		required: 'Password is required',
		incorrect: 'Password must be at least 6 chars'
	}

	server = {
		email: {
			notFound: 'User not found',
			alreadyExists: 'User already exists'
		},
		password: 'Invalid password'
	}
}

export const errorsMessage = new Errors()
