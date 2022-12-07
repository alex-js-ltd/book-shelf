import { rest } from 'msw'
import { books } from 'test/mock-data'
const delay = 0

const apiURL = process.env.REACT_APP_API_URL as string

const handlers = [
  rest.get(`${apiURL}/books`, (req, res, ctx) => {
    return res(ctx.json(books))
  }),
]

export { handlers }
