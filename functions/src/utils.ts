import { Firestore } from 'firebase-admin/firestore'
import algoliasearch from 'algoliasearch'
import * as dotenv from 'dotenv'
dotenv.config()

export async function getReadingList(userId: any, db: Firestore) {
	const userRef = db.doc(`users/${userId}`)
	const userSnap = await userRef.get()
	const userData = userSnap.data()
	const readingList = userData?.readingList
	return readingList
}

const YOUR_APP_ID = process.env.YOUR_APP_ID
const YOUR_SEARCH_KEY = process.env.YOUR_SEARCH_KEY

type SearchAttributes = {
	objectID: string
	coverImageUrl: string
	pageCount: number
	publisher: string
	synopsis: string
	title: string
	author: string
}

export async function search(query: any) {
	if (!YOUR_APP_ID || !YOUR_SEARCH_KEY) return

	const client = algoliasearch(YOUR_APP_ID, YOUR_SEARCH_KEY)
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
