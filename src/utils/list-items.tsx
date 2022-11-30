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

				return readingList
			}),
	})

	return result?.data ? result.data : []
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

export { useCreateListItem }