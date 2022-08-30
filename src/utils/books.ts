// @ts-nocheck
import React from 'react';
import algoliasearch from 'algoliasearch';
import { useQuery } from '@tanstack/react-query';
import bookPlaceholderSvg from 'assets/book-placeholder.svg';

const YOUR_APP_ID = process.env.REACT_APP_YOUR_APP_ID;
const YOUR_SEARCH_KEY = process.env.REACT_APP_YOUR_SEARCH_KEY;

const client: any =
  YOUR_APP_ID && YOUR_SEARCH_KEY && algoliasearch(YOUR_APP_ID, YOUR_SEARCH_KEY);
const index = client.initIndex('books');

const loadingBook = {
  title: 'Loading...',
  author: 'loading...',
  coverImageUrl: bookPlaceholderSvg,
  publisher: 'Loading Publishing',
  synopsis: 'Loading...',
  loadingBook: true,
};

const loadingBooks = Array.from({ length: 10 }, (v, index) => ({
  id: `loading-book-${index}`,
  ...loadingBook,
}));

const useBookSearch = (query: string | null) => {
  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['bookSearch', { query }],
    queryFn: () => index.search(query),
  });

  return {
    books: data?.hits ?? loadingBooks,
    error,
    isLoading,
    isError,
    isSuccess,
  };
};

export { useBookSearch };
