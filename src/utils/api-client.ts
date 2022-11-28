import { queryClient } from 'context'
import * as auth from 'auth-provider'
import { Book } from 'types'
import { formatBook } from './misc'
const apiURL = process.env.REACT_APP_API_URL

type Config = {
	method: 'GET' | 'PATCH'
	token: string
	data?: any
}

async function client(endpoint: string, { method, data, token }: Config) {
	const config = {
		method: method,
		body: data ? JSON.stringify(data) : undefined,
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	}

	return window.fetch(`${apiURL}/${endpoint}`, config).then(async response => {
		if (response.status === 401) {
			queryClient.clear()
			await auth.logout()
			// refresh the page for them
			window.location.assign(window.location.href)
			return Promise.reject({ message: 'Please re-authenticate.' })
		}
		const data = await response.json()

		if (response.ok) {
			return data
		} else {
			return Promise.reject(data)
		}
	})
}

async function readBook(endpoint: string, token: string): Promise<Book> {
	const { fields } = await client(endpoint, { method: 'GET', token })

	const book = formatBook(fields)

	return book
}

function create(endpoint: string, data: any, token: string): Promise<any> {
	return client(endpoint, { method: 'PATCH', data, token })
}

function remove(endpoint: string, data: any, token: string): Promise<void> {
	return client(endpoint, { method: 'PATCH', data, token })
}

export { client, readBook, create, remove }
