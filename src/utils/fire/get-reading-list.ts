import { doc, getDoc } from 'firebase/firestore';
import { db } from './index';

const getReadingList = async (uid: string): Promise<any[]> => {
  const docRef = doc(db, 'users', uid);

  const docSnap = await getDoc(docRef);

  const data = docSnap.data();

  console.log('data', data);
  return data?.list;
};

export { getReadingList };
