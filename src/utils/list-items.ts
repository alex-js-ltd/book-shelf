import { useQuery, useMutation } from '@tanstack/react-query';
import { getListItems } from 'utils/firebase/get-list-items';
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

export { useListItems };
