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

function isLoading(valueToTest: any) {
	return (
		valueToTest &&
		typeof valueToTest === 'object' &&
		'loadingBook' in valueToTest &&
		typeof valueToTest['loadingBook'] === 'boolean'
	)
}
export { isLoading }

export type { FormData, Config, Loading }
