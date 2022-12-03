import * as functions from 'firebase-functions'
import { getFirestore } from 'firebase-admin/firestore'

// Express
import * as express from 'express'
import * as cors from 'cors'

import { search } from './utils'

const db = getFirestore()

// Multi Route ExpressJS HTTP Function
const app = express()
app.use(cors({ origin: true }))

app.get('/books', async (request, response) => {
	const query = request.query.query

	if (typeof query !== 'string') return

	const hits = await search(query)

	response.send(hits)
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

app.get('/list-items', async (request, response) => {
	const userId = request.query.userId

	if (!userId) {
		response.status(400).send('ERROR you must supply a userId')
	}

	const userRef = db.doc(`users/${userId}`)
	const userSnap = await userRef.get()
	const userData = userSnap.data()
	const listItems = userData?.readingList
	response.send(listItems)
})

export const api = functions.https.onRequest(app)
