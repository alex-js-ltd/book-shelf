type Book = {
	objectID: string
	title: string
	author: string
	coverImageUrl: string
	publisher: string
	synopsis: string
	pageCount: number
	startDate?: number | null
	finishDate?: number | null
	rating?: number
}

type FinishedBook = {
	objectID: string
	title: string
	author: string
	coverImageUrl: string
	publisher: string
	synopsis: string
	startDate: number
	finishDate: number
	rating: number
}

type LoadingBook = {
	objectID: string
	title: string
	author: string
	coverImageUrl: string
	publisher: string
	synopsis: string
	loadingBook: boolean
}

interface objectID {
	stringValue: string
}

interface title {
	stringValue: string
}

interface author {
	stringValue: string
}

interface coverImageUrl {
	stringValue: string
}

interface publisher {
	stringValue: string
}

interface synopsis {
	stringValue: string
}

interface startDate {
	integerValue: number
}

interface finishDate {
	integerValue: number
}

interface rating {
	integerValue: number
}

type Field =
	| objectID
	| title
	| author
	| coverImageUrl
	| publisher
	| synopsis
	| startDate
	| finishDate
	| ratings

type MapValue = {
	fields: Field
}

type FormData = {
	email: string
	password: string
}

export { Book, FinishedBook, LoadingBook, MapValue, FormData }
