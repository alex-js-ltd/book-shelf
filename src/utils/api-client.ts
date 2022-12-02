import { queryClient } from 'context'
import * as auth from 'auth-provider'
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

	return window
		.fetch(`${apiURL}/${endpoint}.json`, config)
		.then(async response => {
			if (response.status === 401) {
				queryClient.clear()
				await auth.logout()
				// refresh the page for them
				window.location.assign(window.location.href)
				return Promise.reject({ message: 'Please re-authenticate.' })
			}
			const data = await response.json()
			console.log(data)
			if (response.ok) {
				return data
			} else {
				const error = new Error(data?.error?.message)
				return Promise.reject(error)
			}
		})
}

function read(endpoint: string, token: string) {
	return client(endpoint, { method: 'GET', token })
}

function create(endpoint: string, data: any, token: string) {
	return client(endpoint, { method: 'PATCH', data, token })
}

function remove(endpoint: string, data: any, token: string) {
	return client(endpoint, { method: 'PATCH', data, token })
}

export { client, read, create, remove }
