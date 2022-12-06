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

		async onMutate(newBook) {
			await queryClient.cancelQueries({ queryKey: ['list-items'] })

			const previousListItems = queryClient.getQueryData(['list-items'])

			queryClient.setQueryData(['list-items'], (old?: Book[]) => {
				if (!old) {
					return [newBook]
				}

				let copyData = [...old]

				const index = copyData?.findIndex(
					li => li.objectID === newBook.objectID,
				)

				if (index !== -1) {
					copyData[index] = newBook
				}

				if (index === -1) {
					copyData = [...old, newBook]
				}

				return copyData
			})

			return { previousListItems }
		},

		onError(_err, _newBook, context) {
			queryClient.setQueryData(['list-items'], context?.previousListItems)
		},

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
			await queryClient.refetchQueries()
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
