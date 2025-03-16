export interface BookCardProps {
  book: Book;
  onClick: () => void;
}

export interface Book {
  name: string;
  author: string;
  released: string;
  publisher: string;
  country: string;
  mediaType: string;
  numberOfPages: number;
}
