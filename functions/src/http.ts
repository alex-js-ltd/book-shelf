import { https } from 'firebase-functions'
import { initializeApp } from 'firebase-admin/app'

// Express
import express from 'express'
import cors from 'cors'
import 'express-async-errors'

import { getRoutes } from './routes'

initializeApp()

const app = express()
app.use(cors({ origin: true }))
app.use('/', getRoutes())

export const api = https.onRequest(app)
