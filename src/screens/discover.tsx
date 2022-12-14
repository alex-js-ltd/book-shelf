/** @jsxImportSource @emotion/react */

import React, { useState, FormEvent } from 'react'

import { FaSearch, FaTimes } from 'react-icons/fa'
import { Input, BookListUL, Spinner } from 'comps/lib'
import { BookRow } from 'comps/book-row'

import * as colors from 'styles/colors'
import { useBookSearch } from 'utils/books'
import { Book } from '../../types'

const DiscoverBooksScreen = () => {
  const [query, setQuery] = useState<string>('')
  const [queried, setQueried] = useState<boolean>(false)
  const { books, error, isLoading, isError, isSuccess } = useBookSearch(query)
  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formElements = form.elements as typeof form.elements & {
      search: HTMLInputElement
    }
    setQueried(true)
    setQuery(formElements.search.value)
  }

  return (
    <div
      css={{ maxWidth: 800, margin: 'auto', width: '90vw', padding: '0px 0' }}
    >
      <form onSubmit={handleSearchSubmit}>
        <Input
          placeholder="Search books..."
          id="search"
          css={{ width: '100%' }}
        />

        <label htmlFor="search">
          <button
            type="submit"
            css={{
              border: '0',
              position: 'relative',
              marginLeft: '-35px',
              background: 'transparent',
            }}
          >
            {isLoading ? (
              <Spinner />
            ) : isError ? (
              <FaTimes aria-label="error" css={{ color: colors.danger }} />
            ) : (
              <FaSearch aria-label="search" />
            )}
          </button>
        </label>
      </form>

      {isError ? (
        <div css={{ color: colors.danger }}>
          <p>There was an error:</p>
          <pre>{error.message}</pre>
        </div>
      ) : null}

      <BookListUL css={{ marginTop: 20 }}>
        {books.map((book: Book) => (
          <li key={book.objectID} aria-label={book.title}>
            <BookRow<Book> key={book.objectID} book={book} />
          </li>
        ))}
      </BookListUL>
    </div>
  )
}

export { DiscoverBooksScreen }
