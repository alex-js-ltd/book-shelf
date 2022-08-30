import { useQuery, useMutation } from '@tanstack/react-query';
import { getListItems } from 'utils/firebase/get-list-items';

const useListItems = (uid: string | undefined) => {
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

export { useListItems };
