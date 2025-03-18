import Home from "../pages/Home";
import { BookProvider } from "../context/BookContext";

const exampleBooks = [
  {
    id: "1",
    name: "El Gran Gatsby",
    author: "F. Scott Fitzgerald",
    released: "1925-04-10",
    publisher: "Scribner",
    country: "USA",
    mediaType: "Libro",
    numberOfPages: 180,
  },
  {
    id: "2",
    name: "1984",
    author: "George Orwell",
    released: "1949-06-08",
    publisher: "Secker & Warburg",
    country: "UK",
    mediaType: "Libro",
    numberOfPages: 328,
  },
  {
    id: "3",
    name: "Cien Años de Soledad",
    author: "Gabriel García Márquez",
    released: "1967-06-05",
    publisher: "Editorial Sudamericana",
    country: "Colombia",
    mediaType: "Libro",
    numberOfPages: 417,
  },
  {
    id: "4",
    name: "Matar a un Ruiseñor",
    author: "Harper Lee",
    released: "1960-07-11",
    publisher: "J.B. Lippincott & Co.",
    country: "USA",
    mediaType: "Libro",
    numberOfPages: 281,
  },
];

export default {
  title: "Páginas/Home",
  component: Home,
};

const Template = () => (
  <BookProvider
    value={{
      books: exampleBooks,
      favorites: [],
      addBook: () => {},
      addFavorite: () => {},
      removeFavorite: () => {},
    }}
  >
    <Home />
  </BookProvider>
);

export const Default = Template.bind({});
