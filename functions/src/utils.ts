import { Firestore } from 'firebase-admin/firestore'
import algoliasearch from 'algoliasearch'
import * as dotenv from 'dotenv'
dotenv.config()

const ID = process.env.YOUR_APP_ID
const SEARCH_KEY = process.env.YOUR_SEARCH_KEY

export async function algoliaSearch(query: string) {
	if (!ID || !SEARCH_KEY) return

	const client = algoliasearch(ID, SEARCH_KEY)
	const index = client.initIndex('books')

	const { hits } = await index.search(query)

	const map = hits?.map(function (book: any) {
		delete book._highlightResult

		return book
	})

	return map ?? []
}

export async function getUserData(db: Firestore, userId: any) {
	const userRef = db.doc(`users/${userId}`)
	const userSnap = await userRef.get()
	const userData = userSnap.data()
	const listItems = userData?.readingList
	const copyUserData = { ...userData }
	const copyListItems = [...listItems]

	return {
		userRef,
		userObj: copyUserData,
		readingList: copyListItems,
	}
}
