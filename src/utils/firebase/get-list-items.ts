import { doc, getDoc } from 'firebase/firestore';
import { db } from './index';

const getListItems = async (uid: string | undefined): Promise<any[] | void> => {
  if (uid === undefined) return;
  const docRef = doc(db, 'users', uid);

  const docSnap = await getDoc(docRef);

  const data = docSnap.data();

  console.log('data', data);
  return data?.list;
};

export { getListItems };
