import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from 'context/auth-context'
import { Book, ReadingList } from 'types'
import { useClient } from './use-client'

const useListItems = () => {
	const { read } = useClient()
	const { user } = useAuth()
	const endpoint = user?.localId

	const result = useQuery<ReadingList, Error>({
		queryKey: ['list-items', { endpoint }],
		queryFn: () =>
			read(`users/${endpoint}`).then(({ fields }) => {
				const readingList = fields.readingList.arrayValue?.values

				return readingList ?? []
			}),
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
			onSettled: () => queryClient.invalidateQueries(['list-items']),
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
			finishDate: finishDate?.integerValue,
			rating: rating?.integerValue,
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
			onSettled: () => {
				queryClient.refetchQueries(['list-items'])
			},
		},
	)
}

const useUpdateListItem = (bookId: string) => {
	const { create } = useClient()

	const queryClient = useQueryClient()

	const listItems = useListItems()

	const index = listItems.findIndex(li => {
		const fieldValues = Object.values(li.mapValue)[0]
		return fieldValues.objectID.stringValue === bookId
	})

	const values = (finishDate: number | null, rating: number) => {
		const listItemsCopy = [...listItems]

		const newListItem = { ...listItems[index] }

		newListItem.mapValue.fields.finishDate.integerValue = finishDate
			? finishDate
			: undefined

		newListItem.mapValue.fields.rating.integerValue = rating
			? rating
			: undefined

		listItemsCopy[index] = newListItem

		return listItemsCopy
	}

	return useMutation(
		({ finishDate, rating }: { finishDate: number | null; rating: number }) =>
			create({
				fields: {
					readingList: {
						arrayValue: {
							values: values(finishDate, rating),
						},
					},
				},
			}),
		{
			onSettled: () => queryClient.invalidateQueries(['list-items']),
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
