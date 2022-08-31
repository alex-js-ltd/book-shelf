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

  const returnList = (readingList: any[], book: any) => {
    if (readingList.length) {
      return [...readingList, book];
    } else return [book];
  };

  return await updateDoc(userRef, {
    readingList: returnList(data?.readingList, book),
  });
};

export { addListItem };
