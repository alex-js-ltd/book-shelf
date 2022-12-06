import { Book, ListItem } from '../types'

type FormData = {
	email: string
	password: string
}

type Config = {
	method: 'GET' | 'POST' | 'PUT' | 'DELETE'
	token: string
	data?: ListItem
}

type Loading = Book & {
	loadingBook: boolean
}

export type { FormData, Config, Loading }
