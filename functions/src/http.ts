import * as functions from 'firebase-functions'
import { getFirestore } from 'firebase-admin/firestore'

const db = getFirestore()

export const getBook = functions.https.onRequest(async (request, response) => {
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
