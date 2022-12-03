import { useQuery, useMutation } from '@tanstack/react-query'
import { useAuth } from 'context/auth-context'
import { Book } from 'types'
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

function useCreateListItem() {
	const { create } = useClient()
	const { user } = useAuth()
	const userId = user?.localId

	return useMutation({
		mutationFn: (book: Book) => create(`user/${userId}`, book),
	})
}

export { useListItems, useCreateListItem }
