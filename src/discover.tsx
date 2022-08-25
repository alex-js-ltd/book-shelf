/** @jsx jsx */
import { jsx } from '@emotion/react';

import React, { FC, useEffect, useState, FormEvent } from 'react';
import Tooltip from '@reach/tooltip';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { Input, BookListUL, Spinner } from './comps/lib';
import { BookRow } from './comps/book-row';
import { getBooks } from './firebase/get-books';
import * as colors from './styles/colors';
import { useAsync } from './utils/hooks';

import algoliasearch from 'algoliasearch/lite';

const YOUR_APP_ID = process.env.REACT_APP_YOUR_APP_ID;
const YOUR_SEARCH_KEY = process.env.REACT_APP_YOUR_SEARCH_KEY;

console.log('YOUR_APP_ID', YOUR_APP_ID);
console.log('YOUR_SEARCH_KEY', YOUR_SEARCH_KEY);

const DiscoverBooksScreen: FC = () => {
  const { data, error, run, isLoading, isError, isSuccess } = useAsync();
  const [query, setQuery] = useState<null | string>(null);

  const searchClient =
    YOUR_APP_ID &&
    YOUR_SEARCH_KEY &&
    algoliasearch(YOUR_APP_ID, YOUR_SEARCH_KEY);

  useEffect(() => {
    run(getBooks());
  }, [run]);

  useEffect(() => {
    console.log('data', data);
  }, [data]);

  useEffect(() => {
    console.log('isLoading', isLoading);
    console.log('isError', isError);
    console.log('isSuccess', isSuccess);
  }, [isLoading, isError, isSuccess]);

  useEffect(() => {
    console.log('search client', searchClient);
  }, [searchClient]);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      search: HTMLInputElement;
    };
    setQuery(formElements.search.value);
  };

  return (
    <div
      css={{ maxWidth: 800, margin: 'auto', width: '90vw', padding: '40px 0' }}
    >
      <form onSubmit={handleSearchSubmit}>
        <Input
          placeholder='Search books...'
          id='search'
          css={{ width: '100%' }}
        />
        <Tooltip label='Search Books'>
          <label htmlFor='search'>
            <button
              type='submit'
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
                <FaTimes aria-label='error' css={{ color: colors.danger }} />
              ) : (
                <FaSearch aria-label='search' />
              )}
            </button>
          </label>
        </Tooltip>
      </form>

      {isError ? (
        <div css={{ color: colors.danger }}>
          <p>There was an error:</p>
          <pre>{error.message}</pre>
        </div>
      ) : null}

      {isSuccess ? (
        data?.length ? (
          <BookListUL css={{ marginTop: 20 }}>
            {data?.map((book: any) => (
              <li key={book.id} aria-label={book.title}>
                <BookRow key={book.id} book={book} />
              </li>
            ))}
          </BookListUL>
        ) : (
          <p>No books found. Try another search.</p>
        )
      ) : null}
    </div>
  );
};

export { DiscoverBooksScreen };
