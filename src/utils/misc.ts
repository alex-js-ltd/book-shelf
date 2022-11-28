import { Book } from 'types'

const formatDate = (date: number) =>
	new Intl.DateTimeFormat('en-US', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	}).format(date)

const returnBook = (fields: any): Book => {
	return {
		title: fields?.title?.stringValue,
		coverImageUrl: fields?.coverImageUrl?.stringValue,
		publisher: fields?.publisher?.stringValue,
		synopsis: fields?.synopsis?.stringValue,
		pageCount: fields?.pageCount?.integerValue,
		author: fields?.author?.stringValue,
	}
}

export { formatDate, returnBook }
