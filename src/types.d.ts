type FormData = {
	email: string
	password: string
}

type Book = {
	objectID?: string
	title: string
	author: string
	coverImageUrl: string
	publisher: string
	synopsis: string
	pageCount: number

	startDate?: number
	finishDate?: number
	rating?: number
	loadingBook?: boolean
}

export { FormData, Book }
