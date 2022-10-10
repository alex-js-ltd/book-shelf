// @ts-nocheck
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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

  console.log('result', result.data);

  const map = result?.data?.map(({ mapValue }) => {
    let fields = mapValue.fields;

    let coverImageUrl = fields.coverImageUrl?.stringValue;
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
  const client = useClient();
  const { user } = useAuth();
  const localId = user?.localId;

  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ['list-items', { localId }],
    queryFn: () =>
      client(localId).then((data) => data.fields.readingList.arrayValue.values),
  });

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
      onSettled: () => queryClient.invalidateQueries('list-items'),
    }
  );
};

const useListItem = (bookId: string | undefined) => {
  const { listItems } = useListItems();

  return listItems?.find((li) => li.objectID === bookId) ?? null;
};

const useRemoveListItem = (book: any) => {
  const client = useClient();
  const { user } = useAuth();
  const localId = user?.localId;

  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ['list-items', { localId }],
    queryFn: () =>
      client(localId).then((data) => data.fields.readingList.arrayValue.values),
  });

  let filter = result?.data?.filter(
    ({ mapValue }) => mapValue.fields.objectID.stringValue !== book.objectID
  );

  console.log('filter', filter);

  return useMutation(
    () =>
      client(`${localId}?updateMask.fieldPaths=readingList`, {
        data: {
          fields: {
            readingList: {
              arrayValue: {
                values: filter ? [...filter] : [],
              },
            },
          },
        },
      }),
    {
      onSettled: () => queryClient.invalidateQueries('list-items'),
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
