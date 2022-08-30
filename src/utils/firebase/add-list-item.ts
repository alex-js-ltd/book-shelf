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

  const returnList = (list: any[], book: any) => {
    if (Array.isArray(list)) {
      return [...list, book];
    } else return [book];
  };

  return await updateDoc(userRef, {
    list: returnList(data?.list, book),
  });
};

export { addListItem };
