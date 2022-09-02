import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './index';

const updateListItem = async ({
  uid,
  book,
  finishDate,
  rating,
}: {
  uid: string | undefined;
  book: any;
  finishDate?: any;
  rating?: any;
}) => {
  if (!uid || !book) return;

  const userRef = doc(db, 'users', uid);

  const docSnap = await getDoc(userRef);

  const data = docSnap.data();

  const readingList = data?.readingList;

  const index = readingList.findIndex(
    (item: any) => item.objectID === book.objectID
  );

  let newReadingList = [...readingList];

  let newItem = { ...newReadingList[index] };

  newItem.finishDate = finishDate;

  newItem.rating = rating;

  newReadingList[index] = newItem;

  return await updateDoc(userRef, {
    readingList: newReadingList,
  });
};

export { updateListItem };
