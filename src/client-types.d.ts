type FormData = {
	email: string
	password: string
}

type Config = {
	method: 'GET' | 'POST' | 'PUT' | 'DELETE'
	token: string
	data?: any
}

export { FormData, Config }
