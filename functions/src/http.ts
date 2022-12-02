import * as functions from 'firebase-functions'
import { getFirestore } from 'firebase-admin/firestore'

// Express
import * as express from 'express'
import * as cors from 'cors'

import { search, getReadingList } from './utils'

const db = getFirestore()

// Multi Route ExpressJS HTTP Function
const app = express()
app.use(cors({ origin: true }))

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

app.get('/books', async (request, response) => {
	const query = request.query.query

	const hits = await search(query)

	console.log(hits)

	response.send(hits)
})

app.get('/reading-list', async (request, response) => {
	const userId = request.query.userId

	if (!userId) {
		response.status(400).send('ERROR you must supply a userId')
	}

	const readingList = await getReadingList(userId, db)
	const filter = readingList.filter((li: any) => li?.finishDate === null)
	response.send(filter)
})

app.get('/finished-list', async (request, response) => {
	const userId = request.query.userId

	if (!userId) {
		response.status(400).send('ERROR you must supply a userId')
	}

	const readingList = await getReadingList(userId, db)
	const filter = readingList.filter((li: any) => li?.finishDate !== null)
	response.send(filter)
})

export const api = functions.https.onRequest(app)
