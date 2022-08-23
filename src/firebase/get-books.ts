import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const getBooks = async (): Promise<any[]> => {
  const collectionRef = collection(db, 'books');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => {
    return {
      id: docSnapshot.id,
      ...docSnapshot.data(),
    };
  });
};

export { getBooks };
