import { https } from 'firebase-functions'
import { initializeApp } from 'firebase-admin/app'

// Express
import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import 'express-async-errors'
import logger from 'loglevel'

import { getRoutes } from './routes'
import { validateFirebaseIdToken } from './validate-firebase-tokenId'

initializeApp()

const app = express()
app.use(cors({ origin: true }))
app.use(validateFirebaseIdToken)
app.use('/', getRoutes())
app.use(errorMiddleware)

function errorMiddleware(
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  if (res.headersSent) {
    next(error)
  } else {
    const { message, stack } = isError(error)

    logger.error(error)

    res.status(500)
    res.json({
      message: message,
      // we only add a `stack` property in non-production environments
      ...(process.env.NODE_ENV === 'production' ? null : { stack }),
    })
  }
}

function isError(error: unknown) {
  let message = 'Unknown Error'
  if (error instanceof Error) {
    message = error.message
    return { message, stack: error.stack }
  } else return { message, stack: null }
}

export const api = https.onRequest(app)
