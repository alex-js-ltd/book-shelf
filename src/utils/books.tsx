import { useQuery } from '@tanstack/react-query'
import { useClient } from 'utils/use-client'
import bookPlaceholderSvg from 'assets/book-placeholder.svg'
import { useFormattedListItems } from './list-items'
import { Book } from 'types'
import { search } from './algolia-client'
import { formatBook } from './misc'

const loadingBook = {
	objectID: `loading-book-${0}`,
	title: 'Loading...',
	author: 'loading...',
	coverImageUrl: bookPlaceholderSvg,
	publisher: 'Loading Publishing',
	synopsis: 'Loading...',
	pageCount: 0,
	loadingBook: true,
}

const loadingBooks = Array.from({ length: 10 }, (v, index) => ({
	...loadingBook,
	objectID: `loading-book-${index}`,
}))

const useBookSearch = (query: string) => {
	const result = useQuery<Book[], Error>({
		queryKey: ['bookSearch', { query }],
		queryFn: () => search(query),
	})

	const listItems = useFormattedListItems()

	const filter = result?.data?.filter(
		(book: Book) =>
			!listItems.find(
				({ objectID }: { objectID: string }) => book.objectID === objectID,
			),
	)

	return { ...result, books: filter ?? loadingBooks }
}

const useBook = (bookId: string | undefined) => {
	const { read } = useClient()

	const result = useQuery<Book | null, Error>({
		queryKey: ['book', { bookId }],
		queryFn: () =>
			read(`books/${bookId}`).then(({ fields }) => {
				const book = formatBook(bookId, fields)

				return book
			}),
	})

	return result?.data ?? loadingBook
}

export { useBookSearch, useBook }
