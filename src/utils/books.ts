import algoliasearch from 'algoliasearch';
import { useQuery } from '@tanstack/react-query';
import { getBook } from 'utils/firebase/get-book';
import bookPlaceholderSvg from 'assets/book-placeholder.svg';

const YOUR_APP_ID = process.env.REACT_APP_YOUR_APP_ID;
const YOUR_SEARCH_KEY = process.env.REACT_APP_YOUR_SEARCH_KEY;

const client: any =
  YOUR_APP_ID && YOUR_SEARCH_KEY && algoliasearch(YOUR_APP_ID, YOUR_SEARCH_KEY);
const index = client.initIndex('books');

const loadingBook = {
  title: 'Loading...',
  author: 'loading...',
  coverImageUrl: bookPlaceholderSvg,
  publisher: 'Loading Publishing',
  synopsis: 'Loading...',
  loadingBook: true,
};

const loadingBooks = Array.from({ length: 10 }, (v, index) => ({
  id: `loading-book-${index}`,
  ...loadingBook,
}));

const useBookSearch = (query: string | null) => {
  const result = useQuery<any, Error>({
    queryKey: ['bookSearch', { query }],
    queryFn: () => index.search(query),
  });

  let map = result.data?.hits.map((b: any) => {
    return {
      objectID: b.objectID,
      coverImageUrl: b?.coverImageUrl,
      pageCount: b?.pageCount,
      publisher: b?.publisher,
      synopsis: b?.synopsis,
      title: b?.title,
    };
  });

  return { ...result, books: map ?? loadingBooks };
};

const useBook = (bookId: string | undefined): any => {
  const { data: book = loadingBook } = useQuery({
    queryKey: ['book', { bookId }],
    queryFn: () => (bookId ? getBook(bookId) : null),
  });
  return book ?? loadingBook;
};

export { useBookSearch, useBook };
