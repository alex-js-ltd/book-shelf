import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from 'context/auth-context'
import { Book, ReadingList } from 'types'
import { useClient } from './use-client'

const useListItems = () => {
	const { read } = useClient()
	const { user } = useAuth()
	const endpoint = user?.localId

	const result = useQuery<ReadingList, Error>({
		queryKey: ['list-items'],
		queryFn: () =>
			read(`users/${endpoint}`).then(({ fields }) => {
				const readingList = fields.readingList.arrayValue?.values

				return readingList ?? []
			}),
		enabled: true,
	})

	return result?.data ?? []
}

const useCreateListItem = (book: Book) => {
	const { create } = useClient()

	const queryClient = useQueryClient()

	const listItems = useListItems()

	const newBook = {
		mapValue: {
			fields: {
				coverImageUrl: {
					stringValue: book.coverImageUrl,
				},
				objectID: {
					stringValue: book.objectID,
				},
				pageCount: {
					integerValue: book.pageCount,
				},
				publisher: {
					stringValue: book.publisher,
				},
				synopsis: {
					stringValue: book.synopsis,
				},
				title: {
					stringValue: book.title,
				},
				startDate: {
					integerValue: Date.now(),
				},
				finishDate: {
					nullValue: null,
				},
				rating: {
					integerValue: 0,
				},
			},
		},
	}

	return useMutation(
		() =>
			create({
				fields: {
					readingList: {
						arrayValue: {
							values: [...listItems, newBook],
						},
					},
				},
			}),
		{
			onSuccess: () => queryClient.refetchQueries(['list-items']),
		},
	)
}

const useFormattedListItems = () => {
	const listItems = useListItems()

	return listItems?.map(li => {
		const fieldValues = Object.values(li.mapValue)[0]

		const {
			coverImageUrl,
			objectID,
			pageCount,
			publisher,
			synopsis,
			title,
			author,
			startDate,
			finishDate,
			rating,
		} = fieldValues
		return {
			coverImageUrl: coverImageUrl.stringValue,
			objectID: objectID.stringValue,
			pageCount: pageCount.integerValue,
			publisher: publisher.stringValue,
			synopsis: synopsis.stringValue,
			title: title.stringValue,
			author: author?.stringValue,
			startDate: startDate?.integerValue,
			finishDate: finishDate?.integerValue ?? finishDate?.nullValue,
			rating: rating?.integerValue ?? rating?.nullValue,
		}
	})
}

const useListItem = (bookId: string | undefined) => {
	const listItems = useFormattedListItems()

	return listItems?.find((li: Book) => li.objectID === bookId) ?? null
}

const useRemoveListItem = () => {
	const { remove } = useClient()

	const queryClient = useQueryClient()

	const listItems = useListItems()

	const returnArr = (bookId: string) =>
		listItems?.filter(li => {
			const fieldValues = Object.values(li.mapValue)[0]
			return fieldValues.objectID.stringValue !== bookId
		})

	return useMutation(
		({ bookId }: { bookId: string }) =>
			remove({
				fields: {
					readingList: {
						arrayValue: {
							values: returnArr(bookId),
						},
					},
				},
			}),
		{
			onSuccess: () => queryClient.refetchQueries(['list-items']),
		},
	)
}

const useUpdateListItem = () => {
	const { create } = useClient()

	const queryClient = useQueryClient()

	const listItems = useListItems()

	const values = (newBook: Book) => {
		const index = listItems.findIndex(li => {
			const fieldValues = Object.values(li.mapValue)[0]
			return fieldValues.objectID.stringValue === newBook.objectID
		})

		const listItemsCopy = [...listItems]

		const newListItem = { ...listItems[index] }

		const finishDate = newBook.finishDate ?? null
		const rating = newBook.rating ?? null

		newListItem.mapValue.fields.finishDate = finishDate
			? { integerValue: finishDate }
			: { nullValue: null }

		newListItem.mapValue.fields.rating = rating
			? { integerValue: rating }
			: { nullValue: null }

		listItemsCopy[index] = newListItem

		return listItemsCopy
	}

	return useMutation(
		(book: Book) =>
			create({
				fields: {
					readingList: {
						arrayValue: {
							values: values(book),
						},
					},
				},
			}),
		{
			onMutate: async listItem => {
				// Cancel any outgoing refetches
				// (so they don't overwrite our optimistic update)
				await queryClient.cancelQueries({ queryKey: ['list-items'] })

				// Snapshot the previous value
				const previousListItems = queryClient.getQueryData(['list-items'])

				// Optimistically update to the new value
				queryClient.setQueryData(['list-items'], (old: Book[] | undefined) => {
					if (!old) return [listItem]

					const copyList = [...old]

					const index = copyList.findIndex(
						li => li.objectID === listItem.objectID,
					)

					copyList[index] = listItem

					return copyList
				})

				// Return a context object with the snapshotted value
				return { previousListItems }
			},
			// If the mutation fails,
			// use the context returned from onMutate to roll back
			onError: (_err, _listItem, context) => {
				queryClient.setQueryData(['list-items'], context?.previousListItems)
			},
			// Always refetch after error or success:
			onSettled: () => {
				queryClient.invalidateQueries({ queryKey: ['list-items'] })
			},
		},
	)
}

export {
	useCreateListItem,
	useFormattedListItems,
	useListItem,
	useRemoveListItem,
	useUpdateListItem,
}
