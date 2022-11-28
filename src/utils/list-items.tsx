import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from 'context/auth-context'
import { Book } from 'types'

import { useClient } from './use-client'

const useListItems = () => {
	const { read } = useClient()
	const { user } = useAuth()
	const endpoint = user?.localId

	const { data } = useQuery({
		queryKey: ['list-items', { endpoint }],
		queryFn: () =>
			read(`users/${endpoint}`).then(
				data => data.fields.readingList.arrayValue,
			),
	})

	const listItems = data?.values ? data.values : []

	return listItems
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
