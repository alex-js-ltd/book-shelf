import React, { FC, useEffect } from 'react';
import { getReadingList } from 'utils/fire/get-reading-list';
import { useAuth } from 'context/auth-context';

const ReadingListScreen: FC = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (user?.uid) {
      getReadingList(user.uid);
    }
  }, [user]);

  return <div>ReadingList</div>;
};

export { ReadingListScreen };
