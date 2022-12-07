import express from 'express'
import { getBookRoutes } from './books'

function getRoutes() {
  const router = express.Router()

  router.use('/books', getBookRoutes())
  console.log('router', router)
  return router
}

export { getRoutes }
