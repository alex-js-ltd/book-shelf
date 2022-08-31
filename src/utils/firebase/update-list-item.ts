import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './index';

const updateListItem = async ({
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

  let filter = readingList?.filter((li: any) => li.id !== book.id);

  if (!filter) return;

  const returnFinishedBooks = (finishedBooks: any[], book: any) => {
    if (finishedBooks.length) {
      return [...finishedBooks, book];
    } else return [book];
  };

  return await updateDoc(userRef, {
    readingList: filter,
    finishedBooks: returnFinishedBooks(data?.finishedBooks, book),
  });
};

export { updateListItem };
