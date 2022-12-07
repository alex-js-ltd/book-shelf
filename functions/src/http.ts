import { https } from 'firebase-functions'
import { initializeApp } from 'firebase-admin/app'

// Express
import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import 'express-async-errors'
import logger from 'loglevel'

import { getRoutes } from './routes'

initializeApp()

const app = express()
app.use(cors({ origin: true }))
app.use('/', getRoutes())
app.use(errorMiddleware)

function errorMiddleware(
  error: any,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  if (res.headersSent) {
    next(error)
  } else {
    logger.error(error)
    res.status(500)
    res.json({
      message: error.message,
      // we only add a `stack` property in non-production environments
      ...(process.env.NODE_ENV === 'production'
        ? null
        : { stack: error.stack }),
    })
  }
}

export const api = https.onRequest(app)
