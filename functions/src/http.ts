import * as functions from 'firebase-functions'
import { getFirestore } from 'firebase-admin/firestore'

// Express
import * as express from 'express'
import * as cors from 'cors'

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

export const api = functions.https.onRequest(app)
