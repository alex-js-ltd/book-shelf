import { doc, getDoc } from 'firebase/firestore';
import { db } from './index';

interface Book {
  title?: string;
  author?: string;
  coverImageUrl?: string;
  publisher?: string;
  synopsis?: string;
  objectID: string;
}

const getBook = async (id: string): Promise<Book> => {
  const docRef = doc(db, 'books', id);

  const docSnap = await getDoc(docRef);

  const data = docSnap.data();

  return {
    objectID: docSnap.id,
    ...data,
  };
};

export { getBook };
