import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { updateListItem } from './firebase/update-list-item';
import { useAuth, useClient } from 'context/auth-context';

const useListItems = () => {
  const client = useClient();
  const { user } = useAuth();
  const localId = user?.localId;

  const result = useQuery({
    queryKey: ['list-items', { localId }],
    queryFn: () =>
      client(localId, null).then(
        (data) => data.fields.readingList.arrayValue.values
      ),
  });

  console.log('result', result);

  const map = result?.data?.map(
    ({ mapValue }: { mapValue: { fields: any } }) => {
      const {
        coverImageUrl,
        objectID,
        pageCount,
        publisher,
        startDate,
        synopsis,
        title,
        finishDate,
      } = mapValue.fields;

      return {
        coverImageUrl: coverImageUrl?.stringValue,
        objectID: objectID.stringValue,
        pageCount: pageCount.integerValue,
        publisher: publisher.stringValue,
        startDate: startDate.integerValue,
        synopsis: synopsis.stringValue,
        title: title.stringValue,
        finishDate: finishDate.nullValue,
      };
    }
  );

  return { ...result, listItems: map };
};

const useCreateListItem = (book: any) => {
  const client = useClient();
  const { user } = useAuth();
  const localId = user?.localId;

  const queryClient = useQueryClient();

  const result = useListItems();

  let newBook = {
    mapValue: {
      fields: {
        coverImageUrl: {
          stringValue: book.coverImageUrl,
        },
        objectID: {
          stringValue: book.objectID,
        },
        pageCount: {
          integerValue: book.pageCount,
        },
        publisher: {
          stringValue: book.publisher,
        },
        startDate: {
          integerValue: Date.now(),
        },
        synopsis: {
          stringValue: book.synopsis,
        },
        title: {
          stringValue: book.title,
        },
        finishDate: {
          nullValue: null,
        },
      },
    },
  };

  return useMutation(
    () =>
      client(`${localId}?updateMask.fieldPaths=readingList`, {
        data: {
          fields: {
            readingList: {
              arrayValue: {
                values: !result.data ? [newBook] : [...result.data, newBook],
              },
            },
          },
        },
      }),
    {
      onSettled: () => queryClient.invalidateQueries(['list-items']),
    }
  );
};

const useListItem = (bookId: string | undefined) => {
  const { listItems } = useListItems();

  return (
    listItems?.find((li: { objectID: string }) => li.objectID === bookId) ??
    null
  );
};

const useRemoveListItem = (book: any) => {
  const client = useClient();
  const { user } = useAuth();
  const localId = user?.localId;

  const queryClient = useQueryClient();

  const result = useListItems();

  let filter = result?.data?.filter(
    ({ mapValue }: { mapValue: { fields: any } }) =>
      mapValue.fields.objectID.stringValue !== book.objectID
  );

  return useMutation(
    () =>
      client(`${localId}?updateMask.fieldPaths=readingList`, {
        data: {
          fields: {
            readingList: {
              arrayValue: {
                values: filter,
              },
            },
          },
        },
      }),
    {
      onSettled: () => queryClient.invalidateQueries(['list-items']),
    }
  );
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
      onSettled: () => queryClient.invalidateQueries(['list-items']),
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
