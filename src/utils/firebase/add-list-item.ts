import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './index';

const addListItem = async ({
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

  const newBook = { ...book };

  newBook.startDate = Date.now();

  return await updateDoc(userRef, {
    readingList: [...data?.readingList, newBook],
  });
};

export { addListItem };
