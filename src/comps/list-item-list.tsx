/** @jsx jsx */
import { jsx } from '@emotion/react';

import { FC, useEffect, useCallback } from 'react';
import { useListItems } from 'utils/list-items';
import { BookListUL } from './lib';
import { BookRow } from './book-row';

const ListItemList = ({
  noListItems,
  filterListItems,
}: {
  noListItems: any;
  filterListItems: any;
}) => {
  const { listItems } = useListItems();

  const filteredListItems = listItems.filter(filterListItems);

  useEffect(() => {
    console.log('listItems', listItems);
  }, [listItems]);

  useEffect(() => {
    console.log('filteredListItems', filteredListItems);
  }, [filteredListItems]);

  // if (!listItems.length) {
  //   return (
  //     <div css={{ marginTop: '1em', fontSize: '1.2em' }}>{noListItems}</div>
  //   );
  // }

  return (
    <BookListUL>
      {listItems?.map((listItem: any) => (
        <li key={listItem?.objectID}>
          <BookRow book={listItem} />
        </li>
      ))}
    </BookListUL>
  );
};

export { ListItemList };
