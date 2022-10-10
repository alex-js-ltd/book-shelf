import * as React from 'react';
import { Link } from 'comps/lib';
import { ListItemList } from 'comps/list-item-list';

const ReadingListScreen = () => (
  <ListItemList
    filterListItems={(li: any) => !li?.finishDate}
    noListItems={
      <p>
        Hey there! Welcome to your bookshelf reading list. Get started by
        heading over to <Link to='/discover'>the Discover page</Link> to add
        books to your list.
      </p>
    }
  />
);

export { ReadingListScreen };
