type FormData = {
	email: string
	password: string
}

type Config = {
	method: 'GET' | 'POST' | 'DELETE'
	token: string
	data?: any
}

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

export { FormData, Config, Book }
