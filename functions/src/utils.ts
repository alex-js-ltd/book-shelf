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

export async function search(query: any) {
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
