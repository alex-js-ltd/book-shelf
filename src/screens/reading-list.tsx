import React, { FC, useEffect } from 'react';

import { useAuth } from 'context/auth-context';
import { useListItems } from 'utils/list-items';

const ReadingListScreen: FC = () => {
  const { user } = useAuth();

  const listItems = useListItems(user?.uid);

  useEffect(() => {
    console.log('list items', listItems);
  }, [listItems]);

  return <div>ReadingList</div>;
};

export { ReadingListScreen };
