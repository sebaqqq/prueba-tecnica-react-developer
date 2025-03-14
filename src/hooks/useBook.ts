import { useState, useEffect } from "react";
import { formatDate } from "../utils/formatDate";

const useBooks = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("https://anapioficeandfire.com/api/books");
        const data = await response.json();

        const transformedBooks = data.map((book: any) => ({
          id: book.isbn,
          name: book.name,
          author: book.authors.join(", "),
          released: formatDate(book.released),
          publisher: book.publisher,
          country: book.country,
          mediaType: book.mediaType,
          numberOfPages: book.numberOfPages,
        }));

        setBooks(transformedBooks);
      } catch (err) {
        setError("No se pudieron cargar los libros");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return { books, loading, error };
};

export default useBooks;
