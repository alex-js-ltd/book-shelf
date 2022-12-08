import * as React from 'react'
import { render, screen, waitFor } from 'test/test-utils'
import { setupServer } from 'msw/node'
import { handlers } from 'test/server-handlers'
import { books } from 'test/mock-data'
import { DiscoverBooksScreen } from 'screens/discover'

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

test(`render book screen with mock data`, async () => {
  render(<DiscoverBooksScreen />)

  await waitFor(() => {
    for (const book of books) {
      expect(screen.getByText(book.title)).toBeInTheDocument()
      expect(screen.getAllByText(book.author)[0]).toBeInTheDocument()
    }
  })
})
