import { useQuery } from '@tanstack/react-query'
import { useClient } from 'utils/use-client'
import { useAuth } from 'context/auth-context'
import bookPlaceholderSvg from 'assets/book-placeholder.svg'
import { Book } from 'types'

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
	const { read } = useClient()
	const { user } = useAuth()
	const userId = user?.localId

	const result = useQuery<Book[], Error>({
		queryKey: ['books', query],
		queryFn: () => read(`books?query=${encodeURIComponent(query)}`),
	})

	return { ...result, books: result?.data ?? loadingBooks }
}

const useBook = (bookId: string | undefined) => {
	const { read } = useClient()

	const result = useQuery<Book | null, Error>({
		queryKey: ['book', bookId],
		queryFn: () => read(`book?bookId=${bookId}`),
	})

	return result?.data ?? loadingBook
}

export { useBookSearch, useBook }
