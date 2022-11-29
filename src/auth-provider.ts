import { FormData } from 'types'
const loginURL = process.env.REACT_APP_SIGN_IN_URL
const registerURL = process.env.REACT_APP_SIGN_UP_URL
const refreshURL = process.env.REACT_APP_REFRESH_URL
const localStorageKey = '__auth_provider_token__'

type AuthData = {
	idToken: string
	localId: string
	refreshToken: string
	email: string
	displayName?: string
	expiresIn?: string
	kind?: string
	registered?: string
}

async function getToken() {
	const u = window.localStorage.getItem(localStorageKey)
	return u ? JSON.parse(u) : null
}

function handleUserResponse(user: AuthData) {
	window.localStorage.setItem(localStorageKey, JSON.stringify(user))
	return user
}

function login({ email, password }: FormData): Promise<AuthData> {
	return client(loginURL, { email, password, returnSecureToken: true }).then(
		handleUserResponse,
	)
}

function register({ email, password }: FormData): Promise<AuthData> {
	return client(registerURL, { email, password, returnSecureToken: true }).then(
		handleUserResponse,
	)
}

async function logout() {
	window.localStorage.removeItem(localStorageKey)
}

type RefreshData = {
	expires_in: string
	token_type: string
	refresh_token: string
	id_token: string
	user_id: string
	project_id: string
}

function handleRefresh(refreshData: RefreshData, email: string): AuthData {
	const user = {
		idToken: refreshData.id_token,
		localId: refreshData.user_id,
		refreshToken: refreshData.refresh_token,
		email,
	}

	window.localStorage.setItem(localStorageKey, JSON.stringify(user))

	return user
}

async function getUser(): Promise<AuthData | null> {
	console.log('getUser')
	const user = await getToken()

	if (!user) return null

	return client(refreshURL, {
		refresh_token: user.refreshToken,
		grant_type: 'refresh_token',
	}).then(refreshData => handleRefresh(refreshData, user.email))
}

async function client(endpoint: string | undefined, data: any) {
	const config = {
		method: 'POST',
		body: JSON.stringify(data),
		headers: { 'Content-Type': 'application/json' },
	}

	return window.fetch(`${endpoint}`, config).then(async response => {
		const data = await response.json()

		if (response.ok) {
			return data
		} else {
			const error = new Error(data?.error?.message)
			return Promise.reject(error)
		}
	})
}

export { getToken, login, register, logout, getUser, localStorageKey }
