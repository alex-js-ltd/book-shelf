import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { db } from './index';

const addToList = async ({ user, book }: { user: User; book: any }) => {
  if (!user || !book) return;

  const userRef = doc(db, 'users', user.uid);

  const docSnap = await getDoc(userRef);

  const data = docSnap.data();

  const returnList = (list: any[], book: any) => {
    if (Array.isArray(list)) {
      return [...list, book];
    } else return [book];
  };

  return updateDoc(userRef, {
    list: returnList(data?.list, book),
  });
};

export { addToList };
