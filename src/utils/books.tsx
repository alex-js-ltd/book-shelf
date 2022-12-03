import { useQuery, useQueryClient } from '@tanstack/react-query'
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

function useBookSearch(query: string) {
	const { read } = useClient()
	const { user } = useAuth()
	const userId = user?.localId

	const queryClient = useQueryClient()

	const result = useQuery<Book[], Error>({
		queryKey: ['books', query],
		queryFn: () =>
			read(`books?userId=${userId}?query=${encodeURIComponent(query)}`),

		onSuccess(books: Book[] | undefined) {
			if (!books) return

			for (const book of books) {
				queryClient.setQueryData(['book', book.objectID], book)
			}
		},
	})

	return { ...result, books: result?.data ?? loadingBooks }
}

function useBook(bookId: string | undefined) {
	const { read } = useClient()

	const result = useQuery<Book | null, Error>({
		queryKey: ['book', bookId],
		queryFn: () => read(`book?bookId=${bookId}`),
	})

	return result?.data ?? loadingBook
}

export { useBookSearch, useBook }
