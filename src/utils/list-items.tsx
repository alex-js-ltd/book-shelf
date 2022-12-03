import { useQuery } from '@tanstack/react-query'
import { useAuth } from 'context/auth-context'
import { useClient } from './use-client'

function useListItems() {
	const { read } = useClient()
	const { user } = useAuth()
	const userId = user?.localId

	const result = useQuery({
		queryKey: ['list-items', userId],
		queryFn: () => read(`list-items?userId=${userId}`),
	})

	return result?.data ?? []
}

export { useListItems }
