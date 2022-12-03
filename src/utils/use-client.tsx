import { useCallback } from 'react'
import { useAuth } from 'context/auth-context'
import * as client from 'utils/api-client'

function useClient() {
	const { user } = useAuth()
	const token = user?.idToken

	const read = useCallback(
		(endpoint: string) => client.read(endpoint, token),
		[token],
	)

	const create = useCallback(
		(endpoint: string, data: any) => client.create(endpoint, data, token),
		[token],
	)

	const update = useCallback(
		(endpoint: string, data: any) => client.update(endpoint, data, token),
		[token],
	)

	const remove = useCallback(
		(endpoint: string, data: any) => client.remove(endpoint, data, token),
		[token],
	)

	return { read, create, update, remove }
}

export { useClient }
