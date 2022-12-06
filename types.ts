type Book = {
	objectID: string
	title: string
	author: string
	coverImageUrl: string
	publisher: string
	synopsis: string
	pageCount: number
	loadingBook?: boolean

	startDate?: number
	finishDate?: number | null
	rating?: number | null
}

export { Book }
