/** @jsx jsx */
import { jsx } from '@emotion/react';

import React, { FC, useEffect } from 'react';
import Tooltip from '@reach/tooltip';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { Input, BookListUL, Spinner } from './comps/lib';
import { BookRow } from './comps/book-row';
import { getBooks } from './firebase/get-books';
import * as colors from './styles/colors';
import { useAsync } from './utils/hooks';

const DiscoverBooksScreen: FC = () => {
  const { data, error, run, isLoading, isError, isSuccess } = useAsync();

  useEffect(() => {
    run(getBooks());
  }, [run]);

  useEffect(() => {
    console.log('data', data);
  }, [data]);

  useEffect(() => {}, []);

  useEffect(() => {
    console.log('isLoading', isLoading);
    console.log('isError', isError);
    console.log('isSuccess', isSuccess);
  }, [isLoading, isError, isSuccess]);

  return <div>DiscoverBooksScreen</div>;
};

export { DiscoverBooksScreen };
