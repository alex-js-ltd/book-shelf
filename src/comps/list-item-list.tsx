/** @jsx jsx */
import { jsx } from '@emotion/react';

import { FC, useEffect } from 'react';
import { useListItems } from 'utils/list-items';
import { BookListUL } from './lib';
import { BookRow } from './book-row';

const ListItemList: FC<{ noListItems: any; filterListItems: any }> = ({
  noListItems,
  filterListItems,
}) => {
  const listItems = useListItems();

  const filteredListItems = listItems?.filter(filterListItems);

  if (!listItems.length) {
    return (
      <div css={{ marginTop: '1em', fontSize: '1.2em' }}>{noListItems}</div>
    );
  }

  return (
    <BookListUL>
      {filteredListItems?.map((listItem) => (
        <li key={listItem?.objectID}>
          <BookRow book={listItem} />
        </li>
      ))}
    </BookListUL>
  );
};

export { ListItemList };
