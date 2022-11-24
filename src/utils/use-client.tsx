import { useCallback } from 'react'
import { useAuth } from 'context/auth-context'
import * as client from 'utils/api-client'

const useClient = () => {
	const { user } = useAuth()
	const token = user?.idToken

	const endpoint = user?.localId

	const read = useCallback(
		(endpoint: string) => client.read(endpoint, token),
		[token],
	)

	const remove = useCallback(
		(data: any) =>
			client.remove(
				`users/${endpoint}?updateMask.fieldPaths=readingList`,
				data,
				token,
			),
		[token],
	)

	const create = useCallback(
		(data: any) =>
			client.create(
				`users/${endpoint}?updateMask.fieldPaths=readingList`,
				data,
				token,
			),
		[token],
	)

	return { read, remove, create }
}

export { useClient }
