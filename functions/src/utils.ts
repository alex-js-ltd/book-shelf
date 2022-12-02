import { Firestore } from 'firebase-admin/firestore'

export async function getReadingList(userId: any, db: Firestore) {
	const userRef = db.doc(`users/${userId}`)
	const userSnap = await userRef.get()
	const userData = userSnap.data()
	const readingList = userData?.readingList
	return readingList
}
