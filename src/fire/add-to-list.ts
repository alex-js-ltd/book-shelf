import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { db } from './index';

const addToList = async ({ user, book }: { user: User; book: any }) => {
  //if (!user || !book) return;

  console.log('user', user);
  console.log('book', book);

  const userRef = doc(db, 'users', user.uid);
  console.log('userRf', userRef);

  const docSnap = await getDoc(userRef);
  console.log('docSnap', docSnap);

  const data = docSnap.data();
  console.log('data', data);

  const returnList = (list: any[], book: any) => {
    if (Array.isArray(list)) {
      return [...list, book];
    } else return [book];
  };

  return await updateDoc(userRef, {
    list: returnList(data?.list, book),
  });
};

export { addToList };
