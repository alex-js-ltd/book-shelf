import * as functions from 'firebase-functions'
import { getFirestore } from 'firebase-admin/firestore'

// Express
import * as express from 'express'
import * as cors from 'cors'

import { algoliaSearch, getReadingList } from './utils'

const db = getFirestore()

// Multi Route ExpressJS HTTP Function
const app = express()
app.use(cors({ origin: true }))

app.get('/books', async (request, response) => {
	const search = request.query.search
	const userId = request.query.userId

	if (!userId) {
		response.status(400).send('ERROR you must supply a userId')
	}

	if (typeof search !== 'string') {
		response.status(400).send('ERROR search must be a string')
		return
	}

	const hits = await algoliaSearch(search)
	const listItems = await getReadingList(db, userId)
	const listItemIds = listItems?.map((li: any) => li.objectID)
	const filter = hits?.filter(
		(book: any) => !listItemIds.includes(book.objectID),
	)

	response.send(filter)
})

app.get('/book', async (request, response) => {
	const bookId = request.query.bookId

	if (!bookId) {
		response.status(400).send('ERROR you must supply a bookId')
	}

	const bookRef = db.doc(`books/${bookId}`)
	const bookSnap = await bookRef.get()
	const bookData = bookSnap.data()
	const bookObj = { ...bookData, objectID: bookId }
	response.send(bookObj)
})

app.get('/users/:userId/reading-list', async (request, response) => {
	const userId = request.params.userId

	if (!userId) {
		response.status(400).send('ERROR you must supply a userId')
	}

	if (typeof userId !== 'string') return

	const listItems = await getReadingList(db, userId)
	response.send(listItems)
})

app.put('/users/:userId', async (request, response) => {
	const userId = request.params.userId
	const body = request.body

	if (!userId) {
		response.status(400).send('ERROR you must supply a userId')
	}

	const book = { ...body }

	delete book._highlightResult

	const userRef = db.doc(`users/${userId}`)
	const userSnap = await userRef.get()
	const userData = userSnap.data()
	const copyUserData = { ...userData }
	let copyReadingList = [...copyUserData.readingList]

	const index = copyReadingList.findIndex(
		(li: any) => li.objectID === book.objectID,
	)

	if (index !== -1) {
		copyReadingList[index] = book
	}

	if (index === -1) {
		copyReadingList = [...copyReadingList, book]
	}

	copyUserData.readingList = copyReadingList
	await userRef.set(copyUserData)

	response.send(book)
})

app.delete('/users/:userId', async (request, response) => {
	const userId = request.params.userId
	const body = request.body

	if (!userId) {
		response.status(400).send('ERROR you must supply a userId')
	}

	const book = { ...body }

	const userRef = db.doc(`users/${userId}`)
	const userSnap = await userRef.get()
	const userData = userSnap.data()
	const copyUserData = { ...userData }

	const filter = copyUserData?.readingList?.filter(
		(li: any) => li.objectID !== book.objectID,
	)

	copyUserData.readingList = filter

	await userRef.set(copyUserData)

	response.send(book)
})

export const api = functions.https.onRequest(app)
