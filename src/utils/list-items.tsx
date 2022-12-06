import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from 'context/auth-context'
import { useClient } from './use-client'
import { Book } from '../../types'

function useListItems() {
	const { read } = useClient()
	const { user } = useAuth()
	const userId = user?.localId

	const result = useQuery({
		queryKey: ['list-items'],
		queryFn: () => read(`reading-list/${userId}`),
	})

	return result?.data ?? []
}

function useListItem(book: Book) {
	const listItems = useListItems()

	return listItems?.find((li: any) => li.objectID === book.objectID) ?? null
}

function useCreateListItem() {
	const { create } = useClient()
	const { user } = useAuth()
	const userId = user?.localId

	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (book: Book) => create(`reading-list/${userId}`, book),

		async onSettled() {
			await queryClient.invalidateQueries(['list-items'])
		},
	})
}

function useRemoveListItem() {
	const { remove } = useClient()
	const { user } = useAuth()
	const userId = user?.localId

	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (book: Book) => remove(`reading-list/${userId}`, book),

		async onMutate(newBook) {
			await queryClient.cancelQueries({ queryKey: ['list-items'] })

			const previousListItems = queryClient.getQueryData(['list-items'])

			queryClient.setQueryData(['list-items'], (old?: Book[]) => {
				const filter = old?.filter(li => li.objectID !== newBook.objectID)

				return filter
			})

			return { previousListItems }
		},

		onError(_err, _newBook, context) {
			queryClient.setQueryData(['list-items'], context?.previousListItems)
		},

		async onSettled() {
			await queryClient.invalidateQueries(['list-items'])
		},
	})
}

export { useListItems, useCreateListItem, useRemoveListItem, useListItem }
