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

function useListItem(book: Book) {
	const listItems = useListItems()

	return listItems?.find((li: any) => li.objectID === book.objectID) ?? null
}

function useUpdateListItem() {
	const { update } = useClient()
	const { user } = useAuth()
	const userId = user?.localId

	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (book: Book) => update(`users/${userId}`, book),

		onSettled: () => queryClient.refetchQueries(['books']),
	})
}

function useRemoveListItem() {
	const { remove } = useClient()
	const { user } = useAuth()
	const userId = user?.localId

	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (book: Book) => remove(`users/${userId}`, book),

		onSettled: () => {
			queryClient.refetchQueries(['list-items'])
		},
	})
}

export { useListItems, useUpdateListItem, useRemoveListItem, useListItem }
