import { rest } from 'msw'
import { books, readingList } from 'test/mock-data'
import { getEnv } from 'utils/env'

const { API_URL } = getEnv()

const handlers = [
  rest.get(`${API_URL}/books`, (_req, res, ctx) => {
    return res(ctx.json(books))
  }),

  rest.get(`${API_URL}/reading-list/:userId`, (_req, res, ctx) => {
    return res(ctx.json(readingList))
  }),
]

export { handlers }
