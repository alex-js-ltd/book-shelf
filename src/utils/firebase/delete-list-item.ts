import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './index';

const deleteListItem = async ({
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

  const list = data?.list;

  let filter = list?.filter((li: any) => li.id !== book.id);

  if (!filter) return;

  return await updateDoc(userRef, {
    list: filter,
  });
};

export { deleteListItem };
