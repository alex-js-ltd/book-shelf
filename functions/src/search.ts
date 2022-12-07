import { config, firestore } from 'firebase-functions'
import algoliasearch from 'algoliasearch'

const APP_ID = config().algolia.app
const ADMIN_KEY = config().algolia.key

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
