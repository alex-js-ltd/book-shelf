import { firestore } from 'firebase-functions'
import algoliasearch from 'algoliasearch'
import dotenv from 'dotenv'
dotenv.config()

const APP_ID = process.env.APP_ID as string
const ADMIN_KEY = process.env.ADMIN_KEY as string

const client = algoliasearch(APP_ID, ADMIN_KEY)
const index = client.initIndex('books')

export const addToIndex = firestore
  .document('books/{bookId}')
  .onCreate(snapshot => {
    const data = snapshot.data()
    const objectID = snapshot.id

    return index.saveObject({ ...data, objectID })
  })

export const updateIndex = firestore
  .document('books/{bookId}')
  .onUpdate(change => {
    const newData = change.after.data()
    const objectID = change.after.id
    return index.saveObject({ ...newData, objectID })
  })

export const deleteFromIndex = firestore
  .document('books/{bookId}')
  .onDelete(snapshot => index.deleteObject(snapshot.id))
