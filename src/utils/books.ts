import React from 'react'
import algoliasearch from 'algoliasearch'
import { useQuery } from '@tanstack/react-query'
import { useClient } from 'context/auth-context'
import bookPlaceholderSvg from 'assets/book-placeholder.svg'
import { useListItemsClient } from './list-items'
import { Book } from 'types'

const YOUR_APP_ID = process.env.REACT_APP_YOUR_APP_ID
const YOUR_SEARCH_KEY = process.env.REACT_APP_YOUR_SEARCH_KEY

const client: any =
	YOUR_APP_ID && YOUR_SEARCH_KEY && algoliasearch(YOUR_APP_ID, YOUR_SEARCH_KEY)
const index = client.initIndex('books')

const loadingBook = {
	title: 'Loading...',
	author: 'loading...',
	coverImageUrl: bookPlaceholderSvg,
	publisher: 'Loading Publishing',
	synopsis: 'Loading...',
	loadingBook: true,
}

const loadingBooks = Array.from({ length: 10 }, (v, index) => ({
	id: `loading-book-${index}`,
	...loadingBook,
}))

const useBookSearch = (query: string | null) => {
	const result = useQuery<any, Error>({
		queryKey: ['bookSearch', { query }],
		queryFn: () => index.search(query),
	})

	const listItems = useListItemsClient()

	let map = result.data?.hits.map((book: any) => {
		const {
			objectID,
			coverImageUrl,
			pageCount,
			publisher,
			synopsis,
			title,
			author,
		} = book

		return {
			objectID,
			coverImageUrl,
			pageCount,
			publisher,
			synopsis,
			title,
			author,
		}
	})

	const filter = map?.filter(
		(book: Book) =>
			!listItems.find(
				({ objectID }: { objectID: string }) => book.objectID === objectID,
			),
	)

	return { ...result, books: filter ?? loadingBooks }
}

const useBook = (bookId: string | undefined) => {
	const client = useClient()

	const { data = loadingBook, error } = useQuery({
		queryKey: ['book', { bookId }],
		queryFn: () =>
			client(`books/${bookId}`, { method: 'GET' }).then(data => data.fields),
	})

	const { title, coverImageUrl, publisher, synopsis, pageCount, author } = data

	let book: any = {}

	book.objectID = bookId
	book.title = title?.stringValue
	book.coverImageUrl = coverImageUrl?.stringValue
	book.publisher = publisher?.stringValue
	book.synopsis = synopsis?.stringValue
	book.pageCount = pageCount?.integerValue
	book.author = author?.stringValue

	return book ?? loadingBook
}

export { useBookSearch, useBook }
