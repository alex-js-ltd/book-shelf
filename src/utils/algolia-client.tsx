import algoliasearch from 'algoliasearch'
const YOUR_APP_ID = process.env.REACT_APP_YOUR_APP_ID as string
const YOUR_SEARCH_KEY = process.env.REACT_APP_YOUR_SEARCH_KEY as string

const client = algoliasearch(YOUR_APP_ID, YOUR_SEARCH_KEY)
const index = client.initIndex('books')

type SearchAttributes = {
	objectID: string
	coverImageUrl: string
	pageCount: number
	publisher: string
	synopsis: string
	title: string
	author: string
}

function search(query: string) {
	return index
		.search<SearchAttributes>(query, {
			attributesToRetrieve: [
				'objectID',
				'coverImageUrl',
				'pageCount',
				'publisher',
				'synopsis',
				'title',
				'author',
			],
		})
		.then(({ hits }) => hits)
}

export { search }
