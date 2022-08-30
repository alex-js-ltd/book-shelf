/** @jsx jsx */
import { jsx } from '@emotion/react';

import { FC } from 'react';
import { useAuth } from 'context/auth-context';
import { useListItems } from 'utils/list-items';
import { BookListUL } from './lib';
import { BookRow } from './book-row';

const ListItemList: FC<{ noListItems: any }> = ({ noListItems }) => {
  const { user } = useAuth();
  const listItems = useListItems(user?.uid);

  if (!listItems.length) {
    return (
      <div css={{ marginTop: '1em', fontSize: '1.2em' }}>{noListItems}</div>
    );
  }

  return (
    <BookListUL>
      {listItems?.map((listItem) => (
        <li key={listItem?.id}>
          <BookRow book={listItem} />
        </li>
      ))}
    </BookListUL>
  );
};

export { ListItemList };
