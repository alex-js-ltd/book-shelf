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

app.get('/books', async (request, response) => {
	const query = request.query.query
	const userId = request.query.userId

	if (!userId) {
		response.status(400).send('ERROR you must supply a userId')
		return
	}

	const hits = await search(query)
	const listItems = await getReadingList(db, userId)
	const listItemIds = listItems?.map((li: any) => li.objectID)

	const filter = hits?.filter(book => listItemIds.includes(book.objectID))

	console.log(filter)
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

app.get('/list-items', async (request, response) => {
	const userId = request.query.userId

	if (!userId) {
		response.status(400).send('ERROR you must supply a userId')
	}

	if (typeof userId !== 'string') return

	const listItems = await getReadingList(db, userId)
	response.send(listItems)
})

export const api = functions.https.onRequest(app)
