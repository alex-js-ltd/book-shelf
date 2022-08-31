import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './index';

const deleteListItem = async ({
  uid,
  book,
}: {
  uid: string | undefined;
  book: any;
}) => {
  if (!uid || !book) return;

  const userRef = doc(db, 'users', uid);

  const docSnap = await getDoc(userRef);

  const data = docSnap.data();

  const readingList = data?.readingList;

  let filter = readingList?.filter((li: any) => li.objectID !== book.objectID);

  if (!filter) return;

  return await updateDoc(userRef, {
    readingList: filter,
  });
};

export { deleteListItem };
