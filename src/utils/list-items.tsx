import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
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
	const { update } = useClient()
	const { user } = useAuth()
	const userId = user?.localId

	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (book: Book) => update(`user/${userId}`, book),

		onSettled: () => {
			queryClient.refetchQueries(['books'])
		},
	})
}

export { useListItems, useCreateListItem }
