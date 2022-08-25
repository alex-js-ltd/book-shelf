import React, { FC } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-hooks-web';

const YOUR_APP_ID = process.env.REACT_APP_YOUR_APP_ID;
const YOUR_SEARCH_KEY = process.env.REACT_APP_YOUR_SEARCH_KEY;

const searchClient =
  YOUR_APP_ID && YOUR_SEARCH_KEY && algoliasearch(YOUR_APP_ID, YOUR_SEARCH_KEY);

const Find: FC = () => {
  if (!searchClient) return null;
  return (
    <InstantSearch indexName='books' searchClient={searchClient}>
      <SearchBox />
      <Hits />
    </InstantSearch>
  );
};

export default Find;
