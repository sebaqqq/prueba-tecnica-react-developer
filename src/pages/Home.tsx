import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Library, Search } from "lucide-react";
import useBooks from "../hooks/useBook";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";

const Home: React.FC = () => {
  const { books, loading, error } = useBooks();
  const [filteredBooks, setFilteredBooks] = useState(books);

  const handleSearch = (term: string) => {
    setFilteredBooks(
      books.filter((book) =>
        book.name.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-400 flex items-center gap-2">
          <span className="text-lg">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-gray-100 px-4 py-8 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Library className="w-8 h-8 text-purple-500" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Biblioteca Digital
            </h1>
          </div>
          <div className="flex items-center gap-3 mb-8 bg-gray-800 p-2 rounded-lg">
            <Link to="/favorites" className=" text-purple-500 text-2xl bg ">
              Ir a Favoritos
            </Link>
          </div>

          <div className="mb-8">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <Link
                key={book.id}
                to={`/book/${book.id}`}
                className="transform transition-transform hover:scale-105"
              >
                <BookCard book={book} onClick={() => {}} />
              </Link>
            ))}
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No se encontraron libros</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
