import express, { Request, Response } from 'express'
import { getFirestore } from 'firebase-admin/firestore'

function getReadingListRoutes() {
  const router = express.Router()
  router.get('/:userId', getReadingList)
  router.delete('/:userId', deleteListItem)
  router.post('/:userId', createListItem)
  router.put('/:userId', updateListItem)

  return router
}

async function getReadingList(req: Request, res: Response) {
  const userId = req.params.userId

  if (!userId) {
    res.status(400).send('ERROR you must supply a userId')
  }

  const { readingList } = await getUserData(userId)

  res.send(readingList)
}

async function deleteListItem(req: Request, res: Response) {
  const userId = req.params.userId
  const body = req.body

  if (!userId) {
    res.status(400).send('ERROR you must supply a userId')
  }

  const book = { ...body }

  const { readingList, userObj, userRef } = await getUserData(userId)

  const filter = readingList?.filter((li: any) => li.objectID !== book.objectID)

  userObj.readingList = filter

  await userRef.set(userObj)

  res.send(book)
}

async function createListItem(req: Request, res: Response) {
  const userId = req.params.userId
  const body = req.body

  if (!userId) {
    res.status(400).send('ERROR you must supply a userId')
  }

  const book = { ...body }

  const { readingList, userObj, userRef } = await getUserData(userId)

  const found = readingList?.find(element => element.objectID === book.objectID)

  if (found) {
    res.status(400).send('ERROR item already exists in reading list array')
  }

  const newReadingList = [...readingList, book]

  userObj.readingList = newReadingList

  await userRef.set(userObj)

  res.send(book)
}

async function updateListItem(req: Request, res: Response) {
  const userId = req.params.userId
  const body = req.body

  if (!userId) {
    res.status(400).send('ERROR you must supply a userId')
  }

  const book = { ...body }

  const { readingList, userObj, userRef } = await getUserData(userId)

  const index = readingList?.findIndex(li => li.objectID === book.objectID)

  if (index === -1) {
    res.status(400).send(`can't change this item 😸`)
  }

  readingList[index] = { ...book }

  userObj.readingList = readingList

  await userRef.set(userObj)

  res.send(book)
}

export { getReadingListRoutes }

export async function getUserData(userId: any) {
  const db = getFirestore()
  const userRef = db.doc(`users/${userId}`)
  const userSnap = await userRef.get()
  const userData = userSnap.data()
  const listItems = userData?.readingList
  const copyUserData = { ...userData }
  const copyListItems = [...listItems]

  return {
    userRef,
    userObj: copyUserData,
    readingList: copyListItems,
  }
}
