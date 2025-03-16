// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Library, Search } from "lucide-react";
// import useBooks from "../hooks/useBook";
// import BookCard from "../components/BookCard";
// import SearchBar from "../components/SearchBar";
// import { useBookContext } from "../context/BookContext";

// const Home: React.FC = () => {
//   const { books } = useBookContext();
//   const { loading, error } = useBooks();
//   const [filteredBooks, setFilteredBooks] = useState(books);

//   useEffect(() => {
//     setFilteredBooks(books);
//   }, [books]);

//   const handleSearch = (term: string) => {
//     setFilteredBooks(
//       books.filter(
//         (book) =>
//           book.name.toLowerCase().includes(term.toLowerCase()) ||
//           book.author.toLowerCase().includes(term.toLowerCase()) ||
//           book.publisher.toLowerCase().includes(term.toLowerCase()) ||
//           book.country.toLowerCase().includes(term.toLowerCase())
//       )
//     );
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-900 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-900 flex items-center justify-center">
//         <div className="text-red-400 flex items-center gap-2">
//           <span className="text-lg">{error}</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-100 px-4 py-8 md:px-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex items-center gap-3 mb-8">
//           <Library className="w-8 h-8 text-purple-500" />
//           <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
//             Biblioteca Digital
//           </h1>
//         </div>
//         <div className="flex items-center gap-3 mb-8 bg-gray-800 p-2 rounded-lg">
//           <Link to="/favorites" className=" text-purple-500 text-2xl">
//             Ir a Favoritos
//           </Link>
//         </div>

//         <div className="flex items-center gap-3 mb-8 bg-gray-800 p-2 rounded-lg">
//           <Link to="/add-book" className=" text-purple-500 text-2xl">
//             Añadir Libro
//           </Link>
//         </div>

//         <div className="mb-8">
//           <SearchBar onSearch={handleSearch} />
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {filteredBooks.length > 0 ? (
//             filteredBooks.map((book, index) => (
//               <Link
//                 key={`${book.id}-${index}`}
//                 to={`/book/${book.id}`}
//                 className="transform transition-transform hover:scale-105"
//               >
//                 <BookCard book={book} onClick={() => {}} />
//               </Link>
//             ))
//           ) : (
//             <div className="text-center py-12">
//               <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
//               <p className="text-gray-400 text-lg">No se encontraron libros</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Library, Search, Heart, PlusCircle, Filter } from "lucide-react";
import useBooks from "../hooks/useBook";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import { useBookContext } from "../context/BookContext";

interface FilterOptions {
  publisher: string;
  mediaType: string;
  country: string;
  dateFrom: string;
  dateTo: string;
  pagesMin: string;
  pagesMax: string;
}

const Home: React.FC = () => {
  const { books } = useBookContext();
  const { loading, error } = useBooks();
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    publisher: "",
    mediaType: "",
    country: "",
    dateFrom: "",
    dateTo: "",
    pagesMin: "",
    pagesMax: "",
  });

  useEffect(() => {
    setFilteredBooks(books);
  }, [books]);

  const handleSearch = (term: string) => {
    applyFilters(term);
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
    applyFilters();
  };

  const applyFilters = (searchTerm: string = "") => {
    let filtered = [...books];

    // Text search
    if (searchTerm) {
      filtered = filtered.filter(
        (book) =>
          book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.publisher.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Publisher filter
    if (filters.publisher) {
      filtered = filtered.filter((book) =>
        book.publisher.toLowerCase().includes(filters.publisher.toLowerCase())
      );
    }

    // Media type filter
    if (filters.mediaType) {
      filtered = filtered.filter(
        (book) =>
          book.mediaType.toLowerCase() === filters.mediaType.toLowerCase()
      );
    }

    // Country filter
    if (filters.country) {
      filtered = filtered.filter((book) =>
        book.country.toLowerCase().includes(filters.country.toLowerCase())
      );
    }

    // Date range filter
    if (filters.dateFrom) {
      filtered = filtered.filter(
        (book) => new Date(book.released) >= new Date(filters.dateFrom)
      );
    }
    if (filters.dateTo) {
      filtered = filtered.filter(
        (book) => new Date(book.released) <= new Date(filters.dateTo)
      );
    }

    // Pages range filter
    if (filters.pagesMin) {
      filtered = filtered.filter(
        (book) => book.numberOfPages >= parseInt(filters.pagesMin)
      );
    }
    if (filters.pagesMax) {
      filtered = filtered.filter(
        (book) => book.numberOfPages <= parseInt(filters.pagesMax)
      );
    }

    setFilteredBooks(filtered);
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
    <div className="min-h-screen bg-gray-900 text-gray-100 px-4 py-8 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Library className="w-8 h-8 text-purple-500" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Biblioteca Digital
            </h1>
          </div>
          <div className="flex gap-4">
            <Link
              to="/favorites"
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-purple-400 rounded-lg transition-colors duration-200"
            >
              <Heart className="w-5 h-5" />
              <span>Favoritos</span>
            </Link>
            <Link
              to="/add-book"
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Añadir Libro</span>
            </Link>
          </div>
        </div>

        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="mb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <Filter className="w-5 h-5" />
            <span>{showFilters ? "Ocultar filtros" : "Mostrar filtros"}</span>
          </button>

          {showFilters && (
            <div className="mt-4 p-4 bg-gray-800 rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Filter inputs */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Editorial
                </label>
                <input
                  type="text"
                  name="publisher"
                  value={filters.publisher}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Filtrar por editorial"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Tipo de medio
                </label>
                <input
                  type="text"
                  name="mediaType"
                  value={filters.mediaType}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Filtrar por tipo de medio"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  País
                </label>
                <input
                  type="text"
                  name="country"
                  value={filters.country}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Filtrar por país"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Fecha de publicación
                </label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    name="dateFrom"
                    value={filters.dateFrom}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <input
                    type="date"
                    name="dateTo"
                    value={filters.dateTo}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Rango de páginas
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="pagesMin"
                    value={filters.pagesMin}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Mín"
                  />
                  <input
                    type="number"
                    name="pagesMax"
                    value={filters.pagesMax}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Máx"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => (
              <Link
                key={`${book.id}-${index}`}
                to={`/book/${book.id}`}
                className="transform transition-transform hover:scale-105"
              >
                <BookCard book={book} onClick={() => {}} />
              </Link>
            ))
          ) : (
            <div className="text-center py-12 col-span-full">
              <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No se encontraron libros</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
