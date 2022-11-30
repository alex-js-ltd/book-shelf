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

type objectID = {
	stringValue: string
}

type title = {
	stringValue: string
}

type author = {
	stringValue: string
}

type coverImageUrl = {
	stringValue: string
}

type publisher = {
	stringValue: string
}

type synopsis = {
	stringValue: string
}

type startDate = {
	integerValue: number
}

type finishDate = {
	integerValue: number
}

type rating = {
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

type ReadingList = { mapValue: MapValue }[] | []

export { FormData, Book, ReadingList }
