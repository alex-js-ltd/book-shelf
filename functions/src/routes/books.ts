import express, { Request, Response } from 'express'
import { getFirestore } from 'firebase-admin/firestore'
import algoliasearch from 'algoliasearch'
import dotenv from 'dotenv'
dotenv.config()

function getBookRoutes() {
  const router = express.Router()
  router.get('', books)
  router.get('/:bookId', book)
  return router
}

async function books(req: Request, res: Response) {
  const search = req.query.search
  const userId = req.query.userId

  if (!userId) {
    res.status(400).send('ERROR you must supply a userId')
  }

  if (typeof search !== 'string') {
    res.status(400).send('ERROR search must be a string')
    return
  }

  const hits = await algoliaSearch(search)

  res.send(hits)
}

async function book(req: Request, res: Response) {
  const bookId = req.params.bookId

  if (!bookId) {
    res.status(400).send('ERROR you must supply a bookId')
  }

  const db = getFirestore()

  const bookRef = db.doc(`books/${bookId}`)
  const bookSnap = await bookRef.get()
  const bookData = bookSnap.data()
  const bookObj = { ...bookData, objectID: bookId }
  res.send(bookObj)
}

const ID = process.env.YOUR_APP_ID
const SEARCH_KEY = process.env.YOUR_SEARCH_KEY

export async function algoliaSearch(query: string) {
  if (!ID || !SEARCH_KEY) return

  const client = algoliasearch(ID, SEARCH_KEY)
  const index = client.initIndex('books')

  const { hits } = await index.search(query)

  const map = hits?.map(function (book: any) {
    delete book._highlightResult

    return book
  })

  return map ?? []
}

export { getBookRoutes }
