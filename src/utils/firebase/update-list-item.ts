import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './index';

const updateListItem = async ({
  uid,
  book,
  finishDate,
}: {
  uid: string | undefined;
  book: any;
  finishDate: any;
}) => {
  if (!uid || !book) return;

  const userRef = doc(db, 'users', uid);

  const docSnap = await getDoc(userRef);

  const data = docSnap.data();

  const readingList = data?.readingList;

  const index = readingList.findIndex((item: any) => item.id === book.id);

  let newReadingList = [...readingList];

  let newItem = { ...newReadingList[index] };

  newItem.finishDate = finishDate;

  newReadingList[index] = newItem;

  return await updateDoc(userRef, {
    readingList: newReadingList,
  });
};

export { updateListItem };
