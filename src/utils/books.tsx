import { useQuery } from '@tanstack/react-query'
import { useClient } from 'utils/use-client'
import bookPlaceholderSvg from 'assets/book-placeholder.svg'
//import { useListItemsClient } from './list-items'
import { Book } from 'types'
import { search } from './algolia-client'
import { formatBook } from './misc'

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
	const result = useQuery<Book[], Error>({
		queryKey: ['bookSearch', { query }],
		queryFn: () => search(query),
	})

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

	const result = useQuery<Book, Error>({
		queryKey: ['book', { bookId }],
		queryFn: () =>
			read(`books/${bookId}`).then(({ fields }) => {
				const book = formatBook(fields)

				return book
			}),
	})

	return result?.data ?? loadingBook
}

export { useBookSearch, useBook }
