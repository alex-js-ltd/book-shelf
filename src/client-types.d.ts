import { ListItem } from '../types'

type FormData = {
	email: string
	password: string
}

type Config = {
	method: 'GET' | 'POST' | 'PUT' | 'DELETE'
	token: string
	data?: ListItem
}

export { FormData, Config }
