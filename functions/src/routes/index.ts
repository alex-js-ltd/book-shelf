import express from 'express'
import { getBookRoutes } from './books'
import { getReadingListRoutes } from './reading-list'

function getRoutes() {
  const router = express.Router()

  router.use('/books', getBookRoutes())
  router.use('/reading-list', getReadingListRoutes())

  return router
}

export { getRoutes }
