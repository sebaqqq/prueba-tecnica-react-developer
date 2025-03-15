import { useState, useEffect } from "react";
import { useBookContext } from "../context/BookContext";

const useBooks = () => {
  const { addBook } = useBookContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("https://anapioficeandfire.com/api/books");
        const data = await response.json();

        data.forEach((book: any) => {
          addBook({
            id: book.isbn,
            name: book.name,
            author: book.authors.join(", "),
            released: new Date(book.released).toLocaleDateString("es-ES"),
            publisher: book.publisher,
            country: book.country,
            mediaType: book.mediaType,
            numberOfPages: book.numberOfPages,
          });
        });
      } catch (err) {
        setError("No se pudieron cargar los libros");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [addBook]);

  return { loading, error };
};

export default useBooks;
