import React, { createContext, useContext, useState } from "react";

interface Book {
  id: string;
  name: string;
  author: string;
  released: string;
  publisher: string;
  country: string;
  mediaType: string;
  numberOfPages: number;
}

interface BookContextType {
  books: Book[];
  favorites: Book[];
  addBook: (book: Book) => void;
  addFavorite: (book: Book) => void;
  removeFavorite: (id: string) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context)
    throw new Error("useBookContext must be used within a BookProvider");
  return context;
};

export const BookProvider: React.FC = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [favorites, setFavorites] = useState<Book[]>([]);

  const addBook = (book: Book) => {
    setBooks((prevBooks) => [...prevBooks, book]);
  };

  const addFavorite = (book: Book) => {
    setFavorites((prevFavorites) => [...prevFavorites, book]);
  };

  const removeFavorite = (id: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((book) => book.id !== id)
    );
  };

  return (
    <BookContext.Provider
      value={{ books, favorites, addBook, addFavorite, removeFavorite }}
    >
      {children}
    </BookContext.Provider>
  );
};
