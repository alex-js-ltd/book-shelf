// @ts-nocheck
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getListItems } from 'utils/firebase/get-list-items';
import { addListItem } from './firebase/add-list-item';
import { deleteListItem } from './firebase/delete-list-item';
import { updateListItem } from './firebase/update-list-item';
import { useAuth, useClient } from 'context/auth-context';

const useListItems = () => {
  const client = useClient();
  const { user } = useAuth();
  const localId = user?.localId;

  const result = useQuery({
    queryKey: ['list-items', { localId }],
    queryFn: () =>
      client(localId).then((data) => data.fields.readingList.arrayValue.values),
  });

  console.log('result', result);

  const map = result?.data?.map(({ mapValue }) => {
    let fields = mapValue.fields;

    console.log('fields', fields);
    let coverImageUrl = fields.coverImageUrl.stringValue;
    let objectID = fields.objectID.stringValue;
    let pageCount = fields.pageCount.integerValue;
    let publisher = fields.publisher.stringValue;
    let startDate = fields.startDate.integerValue;
    let synopsis = fields.synopsis.stringValue;
    let title = fields.title.stringValue;

    return {
      coverImageUrl,
      objectID,
      pageCount,
      publisher,
      startDate,
      synopsis,
      title,
    };
  });

  return { ...result, listItems: map };
};

const useCreateListItem = (book: any) => {
  const { user } = useAuth();

  const uid = user?.uid;

  const queryClient = useQueryClient();

  return useMutation(() => addListItem({ uid: uid, book: book }), {
    onSettled: () => queryClient.invalidateQueries('list-items'),
  });
};

const useListItem = (bookId: string | undefined) => {
  const listItems = useListItems();

  return listItems?.find((li) => li.objectID === bookId) ?? null;
};

const useRemoveListItem = (book: any) => {
  const { user } = useAuth();

  const uid = user?.uid;

  const queryClient = useQueryClient();

  return useMutation(() => deleteListItem({ uid: uid, book: book }), {
    onSettled: () => queryClient.invalidateQueries('list-items'),
  });
};

const useUpdateListItem = (book: any): any | Error => {
  const { user } = useAuth();

  const uid = user?.uid;

  const queryClient = useQueryClient();

  return useMutation(
    ({ finishDate, rating }: { finishDate: Date; rating: number }) =>
      updateListItem({
        uid: uid,
        book: book,
        finishDate: finishDate,
        rating: rating,
      }),
    {
      onSettled: () => queryClient.invalidateQueries('list-items'),
    }
  );
};

export {
  useListItems,
  useCreateListItem,
  useListItem,
  useRemoveListItem,
  useUpdateListItem,
};
