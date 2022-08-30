import { doc, getDoc } from 'firebase/firestore';
import { db } from './index';

interface Book {
  title?: string;
  author?: string;
  coverImageUrl?: string;
  publisher?: string;
  synopsis?: string;
  pageCount?: number;
  id: string;
}

const getBook = async (id: string): Promise<Book> => {
  const docRef = doc(db, 'books', id);

  const docSnap = await getDoc(docRef);

  const data = docSnap.data();

  return {
    id: id,
    ...data,
  };
};

export { getBook };
