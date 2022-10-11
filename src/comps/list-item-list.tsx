/** @jsx jsx */
import { jsx } from '@emotion/react';

import { useListItemsClient } from 'utils/list-items';
import { BookListUL } from './lib';
import { BookRow } from './book-row';

const ListItemList = ({
  noListItems,
  filterListItems,
}: {
  noListItems: any;
  filterListItems: any;
}) => {
  const list = useListItemsClient();

  const filteredList = list.filter(filterListItems);

  if (!list?.length) {
    return (
      <div css={{ marginTop: '1em', fontSize: '1.2em' }}>{noListItems}</div>
    );
  }

  return (
    <BookListUL>
      {filteredList?.map((listItem: any) => (
        <li key={listItem?.objectID}>
          <BookRow book={listItem} />
        </li>
      ))}
    </BookListUL>
  );
};

export { ListItemList };
