import * as functions from 'firebase-functions'
import { initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

initializeApp()

const db = getFirestore()

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const createUserRecod = functions.auth
	.user()
	.onCreate((user, context) => {
		const userRef = db.doc(`users/${user.uid}`)

		return userRef.set({
			email: user.email,
			uid: user.uid,
			createdAt: context.timestamp,
			readingList: [],
		})
	})
