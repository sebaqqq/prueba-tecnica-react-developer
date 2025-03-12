import { useState, useEffect } from "react";
import {
  Search,
  BookOpen,
  Library,
  Calendar,
  Tag,
  User,
  ChevronRight,
} from "lucide-react";

interface Book {
  id: number;
  name: string;
  isbn: string;
  author: string;
  numberOfPages: number;
  publisher: string;
  country: string;
  mediaType: string;
  released: string;
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("https://anapioficeandfire.com/api/books");
        if (!response.ok) throw new Error("Error al obtener los datos");
        const data = await response.json();

        // Transformar los datos en el formato deseado
        const formattedBooks: Book[] = data.map((book: any, index: number) => ({
          id: index + 1,
          name: book.name,
          isbn: book.isbn,
          author: book.authors[0] || "Desconocido",
          numberOfPages: book.numberOfPages,
          publisher: book.publisher,
          country: book.country,
          mediaType: book.mediaType,
          released: new Date(book.released).toLocaleDateString("es-ES"), // Formato de fecha
        }));

        setBooks(formattedBooks);
      } catch (err) {
        setError("No se pudieron cargar los libros.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter(
    (book) =>
      book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.publisher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0A0A1F] overflow-hidden">
      <div className="relative container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-center mb-12 animate-fade-in">
          <Library className="w-12 h-12 text-white" />
          <h1 className="ml-6 text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 animate-gradient">
            Biblioteca Digital
          </h1>
        </div>

        {/* Search Bar */}
        <div
          className={`relative max-w-3xl mx-auto mb-16 transition-all duration-300 ${
            isSearchFocused ? "scale-105" : ""
          }`}
        >
          <Search className="absolute left-6 w-6 h-6 text-gray-400" />
          <input
            type="text"
            placeholder="Explora el universo de libros..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="w-full pl-16 pr-6 py-5 rounded-full border-2 bg-gray-900/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
          />
        </div>

        {/* Loading & Error Handling */}
        {loading && (
          <div className="text-center py-16">
            <p className="text-gray-300 text-2xl">Cargando libros...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-16 text-red-400">
            <p className="text-2xl">{error}</p>
          </div>
        )}

        {/* Books Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="group relative cursor-pointer"
                onClick={() =>
                  setSelectedBook(selectedBook?.id === book.id ? null : book)
                }
              >
                <div
                  className={`relative p-8 rounded-3xl border-2 transition-all duration-500 ${
                    selectedBook?.id === book.id
                      ? "bg-gray-800/80 border-purple-500/50 scale-105"
                      : "bg-gray-900/50 border-gray-700/30 hover:border-purple-500/30"
                  }`}
                >
                  <BookOpen className="w-10 h-10 text-purple-400 mb-6" />

                  <h3 className="text-2xl font-bold text-white mb-4">
                    {book.name}
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center text-gray-300">
                      <User className="w-4 h-4 mr-3" />
                      <span className="text-sm">{book.author}</span>
                    </div>

                    <div className="flex items-center text-gray-300">
                      <Calendar className="w-4 h-4 mr-3" />
                      <span className="text-sm">{book.released}</span>
                    </div>

                    <div className="flex items-center">
                      <Tag className="w-4 h-4 mr-3 text-purple-400" />
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium">
                        {book.mediaType}
                      </span>
                    </div>

                    <div className="flex items-center text-gray-300">
                      <span className="text-sm font-bold">📚 Páginas:</span>
                      <span className="ml-2 text-sm">{book.numberOfPages}</span>
                    </div>

                    <div className="flex items-center text-gray-300">
                      <span className="text-sm font-bold">🏢 Editorial:</span>
                      <span className="ml-2 text-sm">{book.publisher}</span>
                    </div>

                    <div className="flex items-center text-gray-300">
                      <span className="text-sm font-bold">🌍 País:</span>
                      <span className="ml-2 text-sm">{book.country}</span>
                    </div>
                  </div>

                  <ChevronRight
                    className={`absolute right-6 bottom-6 w-6 h-6 transition-all ${
                      selectedBook?.id === book.id
                        ? "text-purple-400 rotate-90"
                        : "text-gray-500 group-hover:text-purple-400 group-hover:translate-x-2"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && filteredBooks.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-20 h-20 text-purple-400 mx-auto mb-6" />
            <p className="text-gray-300 text-2xl">
              No encontramos libros que coincidan con tu búsqueda.
            </p>
            <p className="text-gray-500 mt-2">Intenta con otros términos</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
