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
];

export default {
  title: "Páginas/Home",
  component: Home,
};

const Template = () => (
  <BookProvider value={{ books: exampleBooks }}>
    <Home />
  </BookProvider>
);

export const Default = Template.bind({});
