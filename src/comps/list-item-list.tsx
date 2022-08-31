/** @jsx jsx */
import { jsx } from '@emotion/react';

import { FC } from 'react';
import { useListItems } from 'utils/list-items';
import { BookListUL } from './lib';
import { BookRow } from './book-row';

const ListItemList: FC<{ noListItems: any }> = ({ noListItems }) => {
  const listItems = useListItems();

  if (!listItems.length) {
    return (
      <div css={{ marginTop: '1em', fontSize: '1.2em' }}>{noListItems}</div>
    );
  }

  const Li = (li: any) => {
    return {
      ...li,
      objectID: li.id,
    };
  };

  return (
    <BookListUL>
      {listItems?.map((listItem) => (
        <li key={listItem?.id}>
          <BookRow book={Li(listItem)} />
        </li>
      ))}
    </BookListUL>
  );
};

export { ListItemList };
