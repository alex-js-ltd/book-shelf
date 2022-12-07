import { auth } from 'firebase-functions'
import { getFirestore } from 'firebase-admin/firestore'

const db = getFirestore()

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const createUserRecord = auth.user().onCreate((user, context) => {
  const userRef = db.doc(`users/${user.uid}`)

  return userRef.set({
    email: user.email,
    uid: user.uid,
    createdAt: context.timestamp,
    readingList: [],
  })
})
