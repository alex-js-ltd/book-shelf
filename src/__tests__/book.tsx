import * as React from 'react'
import { render, screen, waitFor } from 'test/test-utils'
import { books } from 'test/mock-data'
import { DiscoverBooksScreen } from 'screens/discover'

test(`render book screen with mock data`, async () => {
  render(<DiscoverBooksScreen />)

  await waitFor(() => {
    for (const book of books) {
      expect(screen.getByText(book.title)).toBeInTheDocument()
      expect(screen.getAllByText(book.author)[0]).toBeInTheDocument()
      expect(
        screen.getByRole('img', { name: `${book.title} book cover` }),
      ).toHaveAttribute('src', book.coverImageUrl)
    }
  })
})
