// @ts-nocheck
import { useQuery, useMutation } from '@tanstack/react-query';
import { getListItems } from 'utils/firebase/get-list-items';
import { addListItem } from './firebase/add-list-item';
import { useAuth } from 'context/auth-context';
import { useEffect } from 'react';

const useListItems = () => {
  const { user } = useAuth();

  const uid = user?.uid;
  const {
    data: listItems,
    error,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ['list-items', { uid }],
    queryFn: () => getListItems(uid),
  });

  return listItems ?? [];
};

const useCreateListItem = () => {
  const { user } = useAuth();

  const uid = user?.uid;
  return useMutation(({ book }) => addListItem({ uid: uid, book: book }));
};

export { useListItems, useCreateListItem };
