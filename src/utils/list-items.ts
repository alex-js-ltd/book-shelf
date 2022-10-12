import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth, useClient } from 'context/auth-context';

const useListItems = () => {
  const client = useClient();
  const { user } = useAuth();
  const endpoint = user?.localId;

  const { data, error } = useQuery({
    queryKey: ['list-items', { endpoint }],
    queryFn: () =>
      client(`users/${endpoint}`, null).then(
        (data) => data.fields.readingList.arrayValue
      ),
  });

  let listItems = data?.values ? data.values : [];

  return listItems;
};

const useListItemsClient = () => {
  const listItems = useListItems();

  const list =
    listItems.length > 0
      ? listItems?.map(({ mapValue }: { mapValue: { fields: any } }) => {
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
            finishDate: finishDate.integerValue
              ? finishDate.integerValue
              : finishDate.nullValue,
          };
        })
      : [];

  return list;
};

const useCreateListItem = (book: any) => {
  const client = useClient();
  const { user } = useAuth();

  const endpoint = user?.localId;

  const queryClient = useQueryClient();

  const listItems = useListItems();

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
        synopsis: {
          stringValue: book.synopsis,
        },
        title: {
          stringValue: book.title,
        },
        startDate: {
          integerValue: Date.now(),
        },
        finishDate: {
          nullValue: null,
        },
      },
    },
  };

  return useMutation(
    () =>
      client(`users/${endpoint}?updateMask.fieldPaths=readingList`, {
        data: {
          fields: {
            readingList: {
              arrayValue: {
                values: [...listItems, newBook],
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
  const listItems = useListItemsClient();

  return (
    listItems?.find((li: { objectID: string }) => li.objectID === bookId) ??
    null
  );
};

const useRemoveListItem = () => {
  const client = useClient();
  const { user } = useAuth();
  const endpoint = user?.localId;

  const queryClient = useQueryClient();

  const listItems = useListItems();

  const returnArr = (bookId: string) =>
    listItems?.filter(
      ({ mapValue }: any) => mapValue.fields.objectID.stringValue !== bookId
    );

  return useMutation(
    ({ bookId }: any) =>
      client(`users/${endpoint}?updateMask.fieldPaths=readingList`, {
        data: {
          fields: {
            readingList: {
              arrayValue: {
                values: returnArr(bookId),
              },
            },
          },
        },
      }),
    {
      onSettled: () => {
        queryClient.refetchQueries(['list-items']);
      },
    }
  );
};

const useUpdateListItem = (bookId: string) => {
  const client = useClient();
  const { user } = useAuth();
  const endpoint = user?.localId;

  const queryClient = useQueryClient();

  const listItems = useListItems();

  console.log('list items', listItems);

  const index = listItems.findIndex(
    ({ mapValue }: any) => mapValue.fields.objectID.stringValue === bookId
  );

  const values = (finishDate: number, rating: number) => {
    let listItemsCopy = [...listItems];

    let newListItem = { ...listItems[index] };

    newListItem.mapValue.fields.finishDate = { integerValue: finishDate };

    listItemsCopy[index] = newListItem;
    console.log('copy', listItemsCopy);
    return listItemsCopy;
  };

  console.log('index', index);

  return useMutation(
    ({ finishDate, rating }: { finishDate: number; rating: number }) =>
      client(`users/${endpoint}?updateMask.fieldPaths=readingList`, {
        data: {
          fields: {
            readingList: {
              arrayValue: {
                values: values(finishDate, rating),
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

export {
  useListItemsClient,
  useListItem,
  useCreateListItem,
  useRemoveListItem,
  useUpdateListItem,
};
