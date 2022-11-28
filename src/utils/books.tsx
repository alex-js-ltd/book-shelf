import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useClient } from 'utils/use-client'
import bookPlaceholderSvg from 'assets/book-placeholder.svg'
//import { useListItemsClient } from './list-items'
import { Book } from 'types'

import { search } from './algolia-client'

const loadingBook = {
	title: 'Loading...',
	author: 'loading...',
	coverImageUrl: bookPlaceholderSvg,
	publisher: 'Loading Publishing',
	synopsis: 'Loading...',
	pageCount: 0,
	loadingBook: true,
}

const loadingBooks = Array.from({ length: 10 }, (v, index) => ({
	objectID: `loading-book-${index}`,
	...loadingBook,
}))

const useBookSearch = (query: string) => {
	const result = useQuery<any, Error>({
		queryKey: ['bookSearch', { query }],
		queryFn: () => search(query),
	})

	console.log(result.data)

	//const listItems = useListItemsClient()

	// const filter = map?.filter(
	// 	(book: Book) =>
	// 		!listItems.find(
	// 			({ objectID }: { objectID: string }) => book.objectID === objectID,
	// 		),
	// )

	return { ...result, books: result.data ?? loadingBooks }
}

const useBook = (bookId: string | undefined) => {
	const { read } = useClient()

	const { data = loadingBook } = useQuery({
		queryKey: ['book', { bookId }],
		queryFn: () => read(`books/${bookId}`).then(data => data.fields),
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
