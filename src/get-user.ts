import * as auth from 'auth-provider'
const refreshURL = process.env.REACT_APP_REFRESH_URL
const localStorageKey = '__auth_provider_token__'

type RefreshToken = {
	refresh_token: string
	grant_type: 'refresh_token'
}

type RefreshData = {
	expires_in: string
	token_type: string
	refresh_token: string
	id_token: string
	user_id: string
	project_id: string
}

function handleRefresh(user: RefreshData) {
	window.localStorage.setItem(localStorageKey, user.refresh_token)
	return { idToken: user.id_token, localId: user.user_id }
}

async function getUser() {
	console.log('getUser')
	const token = await auth.getToken()

	if (!token) return null

	return client(refreshURL, {
		refresh_token: token,
		grant_type: 'refresh_token',
	}).then(handleRefresh)
}

async function client(
	endpoint: string | undefined,
	data: RefreshToken,
): Promise<RefreshData> {
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
			return Promise.reject(data)
		}
	})
}

export { getUser }
