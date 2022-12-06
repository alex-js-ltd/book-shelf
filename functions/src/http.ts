import * as functions from 'firebase-functions'
import { getFirestore } from 'firebase-admin/firestore'

// Express
import * as express from 'express'
import * as cors from 'cors'

import { algoliaSearch, getUserData } from './utils'

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

	response.send(hits)
})

app.get('/book/:bookId', async (request, response) => {
	const bookId = request.params.bookId

	console.log('bookId', bookId)
	if (!bookId) {
		response.status(400).send('ERROR you must supply a bookId')
	}

	const bookRef = db.doc(`books/${bookId}`)
	const bookSnap = await bookRef.get()
	const bookData = bookSnap.data()
	const bookObj = { ...bookData, objectID: bookId }
	response.send(bookObj)
})

app.get('/reading-list/:userId', async (request, response) => {
	const userId = request.params.userId

	if (!userId) {
		response.status(400).send('ERROR you must supply a userId')
	}

	const { readingList } = await getUserData(db, userId)

	response.send(readingList)
})

app.delete('/reading-list/:userId', async (request, response) => {
	const userId = request.params.userId
	const body = request.body

	if (!userId) {
		response.status(400).send('ERROR you must supply a userId')
	}

	const book = { ...body }

	const { readingList, userObj, userRef } = await getUserData(db, userId)

	const filter = readingList?.filter((li: any) => li.objectID !== book.objectID)

	userObj.readingList = filter

	await userRef.set(userObj)

	response.send(book)
})

export const api = functions.https.onRequest(app)
