type FormData = {
	email: string
	password: string
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
}

interface Started extends Book {
	startDate: number
	finishDate: null
	rating: null
}

interface Finished extends Book {
	startDate: number
	finishDate: number
	rating: number | null
}

type MapValue = {
	fields: {
		objectID: { stringValue: string }
		title: { stringValue: string }
		author: { stringValue: string }
		coverImageUrl: { stringValue: string }
		publisher: { stringValue: string }
		synopsis: { stringValue: string }
		pageCount: { integerValue: number }
		startDate: { integerValue?: number }
		finishDate: { integerValue?: number; nullValue?: null }
		rating: { integerValue?: number; nullValue?: null }
	}
}

type ReadingList = Array<{ mapValue: MapValue }> | []

export { FormData, Book, ReadingList, MapValue, Started, Finished }
