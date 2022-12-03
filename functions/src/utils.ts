import algoliasearch from 'algoliasearch'
import * as dotenv from 'dotenv'
dotenv.config()

const ID = process.env.YOUR_APP_ID
const SEARCH_KEY = process.env.YOUR_SEARCH_KEY

type SearchAttributes = {
	objectID: string
	coverImageUrl: string
	pageCount: number
	publisher: string
	synopsis: string
	title: string
	author: string
}

export async function search(query: string) {
	if (!ID || !SEARCH_KEY) return

	const client = algoliasearch(ID, SEARCH_KEY)
	const index = client.initIndex('books')

	const { hits } = await index.search<SearchAttributes>(query, {
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

	return hits
}
