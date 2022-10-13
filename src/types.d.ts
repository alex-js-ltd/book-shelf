type Book = {
  objectID: string;
  title: string;
  author: string;
  coverImageUrl: string;
  publisher: string;
  synopsis: string;
  startDate?: number | null;
  finishDate?: number | null;
  rating?: number;
};

type FinishedBook = {
  objectID: string;
  title: string;
  author: string;
  coverImageUrl: string;
  publisher: string;
  synopsis: string;
  startDate: number;
  finishDate: number;
  rating: number;
};

export { Book, FinishedBook };
