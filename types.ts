type Book = {
	objectID: string
	title: string
	author: string
	coverImageUrl: string
	publisher: string
	synopsis: string
	pageCount: number
}

type ListItem = Book & {
	startDate?: number
	finishDate?: number | null
	rating?: number | null
}

export type { Book, ListItem }
