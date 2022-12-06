import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from 'context/auth-context'
import { useClient } from './use-client'
import { ListItem } from '../../types'

function useListItems() {
	const { read } = useClient()
	const { user } = useAuth()
	const userId = user?.localId

	const result = useQuery<ListItem[], Error>({
		queryKey: ['list-items'],
		queryFn: () => read(`reading-list/${userId}`),
	})

	return result?.data ?? []
}

function useListItem(listItem: ListItem): ListItem | null {
	const listItems = useListItems()

	return (
		listItems?.find((li: ListItem) => li.objectID === listItem.objectID) ?? null
	)
}

function useCreateListItem() {
	const { create } = useClient()
	const { user } = useAuth()
	const userId = user?.localId

	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (listItem: ListItem) =>
			create(`reading-list/${userId}`, listItem),

		async onSettled() {
			await queryClient.invalidateQueries(['list-items'])
		},
	})
}

function useUpdateListItem() {
	const { update } = useClient()
	const { user } = useAuth()
	const userId = user?.localId

	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (listItem: ListItem) =>
			update(`reading-list/${userId}`, listItem),

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
		mutationFn: (listItem: ListItem) =>
			remove(`reading-list/${userId}`, listItem),

		async onSettled() {
			await queryClient.invalidateQueries(['list-items'])
		},
	})
}

export {
	useListItems,
	useCreateListItem,
	useUpdateListItem,
	useRemoveListItem,
	useListItem,
}
