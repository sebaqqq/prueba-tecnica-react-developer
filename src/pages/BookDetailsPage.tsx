import React from "react";
import { useParams } from "react-router-dom";
import { BookUser } from "lucide-react";
import BookDetails from "../components/BookDetails";
import useBooks from "../hooks/useBook";

const BookDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { books, loading, error } = useBooks();

  const book = books.find((b) => b.id === id);

  if (loading) return <div>Cargando detalles del libro...</div>;
  if (error) return <div>{error}</div>;
  if (!book) return <div>Libro no encontrado</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 px-4 py-8 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <BookUser className="w-8 h-8 text-purple-500" />
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent ">
            Detalle del libro
          </h1>
        </div>
        <BookDetails book={book} />{" "}
      </div>
    </div>
  );
};

export default BookDetailsPage;
