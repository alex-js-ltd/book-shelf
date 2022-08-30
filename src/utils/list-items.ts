// @ts-nocheck
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getListItems } from 'utils/firebase/get-list-items';
import { addListItem } from './firebase/add-list-item';
import { useAuth } from 'context/auth-context';

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

const useCreateListItem = (book: any) => {
  const { user } = useAuth();

  const uid = user?.uid;

  const queryClient = useQueryClient();

  return useMutation(() => addListItem({ uid: uid, book: book }), {
    onSettled: () => queryClient.invalidateQueries('list-items'),
  });
};

const useListItem = (bookId: string) => {
  const listItems = useListItems();
  return listItems?.find((li) => li.id === bookId) ?? null;
};

export { useListItems, useCreateListItem, useListItem };
