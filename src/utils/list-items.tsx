import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from 'context/auth-context'
import { Book } from 'types'
import { useClient } from './use-client'

function useListItems() {
	const { read } = useClient()
	const { user } = useAuth()
	const userId = user?.localId

	const result = useQuery({
		queryKey: ['list-items'],
		queryFn: () => read(`users/${userId}/reading-list`),
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

		async onSettled() {
			await queryClient.refetchQueries()
		},
	})
}

function useRemoveListItem() {
	const { remove } = useClient()
	const { user } = useAuth()
	const userId = user?.localId

	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (book: Book) => remove(`users/${userId}`, book),

		async onSettled() {
			await queryClient.refetchQueries(['list-items'])
		},
	})
}

function useCreateListItem() {
	const { update } = useClient()
	const { user } = useAuth()
	const userId = user?.localId

	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (book: Book) => update(`users/${userId}`, book),

		async onMutate(newBook) {
			await queryClient.cancelQueries({ queryKey: ['books'] })

			const previousBooks = queryClient.getQueryData(['books'])

			queryClient.setQueryData(['books'], (old?: Book[]) => {
				if (!old) return

				const copyData = [...old]

				const filter = copyData?.filter(li => li.objectID !== newBook.objectID)

				return filter
			})

			// Return a context object with the snapshotted value
			return { previousBooks }
		},

		onError(err, newTodo, context) {
			queryClient.setQueryData(['books'], context?.previousBooks)
		},

		async onSettled() {
			await queryClient.refetchQueries()
		},
	})
}

export {
	useListItems,
	useUpdateListItem,
	useRemoveListItem,
	useListItem,
	useCreateListItem,
}
