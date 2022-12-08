import { rest } from 'msw'
import { books } from 'test/mock-data'
import { getEnv } from 'utils/env'
const delay = 0

const { API_URL } = getEnv()
console.log('API', API_URL)
const handlers = [
  rest.get(`${API_URL}/books`, (req, res, ctx) => {
    return res(ctx.json(books))
  }),

  rest.get(`${API_URL}/reading-list`, (req, res, ctx) => {
    return res(ctx.json(books))
  }),
]

export { handlers }
