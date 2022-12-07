import * as React from 'react'
import { render, screen, waitFor } from 'test/test-utils'
import { setupServer } from 'msw/node'
import { handlers } from 'test/server-handlers'
import { books } from 'test/mock-data'
import userEvent from '@testing-library/user-event'
import { DiscoverBooksScreen } from 'screens/discover'

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

test(`render book screen with mock data`, async () => {
  render(<DiscoverBooksScreen />)

  await userEvent.click(screen.getByRole('button'))

  await waitFor(() => {
    expect(screen.getByText(books[0].title)).toBeInTheDocument()
  })

  screen.debug()
})
