import BookCard from "../components/BookCard";
import { Book } from "../context/type";

const bookExample: Book = {
  id: "1",
  name: "El Gran Gatsby",
  author: "F. Scott Fitzgerald",
  released: "1925-04-10",
  publisher: "Scribner",
  country: "USA",
  mediaType: "Libro",
  numberOfPages: 180,
};

export default {
  title: "Componentes/BookCard",
  component: BookCard,
  argTypes: {
    book: { control: "object" },
  },
};

const Template = (args: { book: Book }) => <BookCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  book: bookExample,
};

const anotherBook: Book = {
  id: "2",
  name: "Cien Años de Soledad",
  author: "Gabriel García Márquez",
  released: "1967-06-05",
  publisher: "Editorial Sudamericana",
  country: "Colombia",
  mediaType: "Libro",
  numberOfPages: 417,
};

export const AnotherBook = Template.bind({});
AnotherBook.args = {
  book: anotherBook,
};

export const HoverState = Template.bind({});
HoverState.args = {
  book: bookExample,
};

export const LongBookName = Template.bind({});
LongBookName.args = {
  book: {
    ...bookExample,
    name: "Este es un nombre de libro mucho más largo para probar cómo se comporta el componente cuando el título excede una línea",
  },
};

export const NoAuthor = Template.bind({});
NoAuthor.args = {
  book: {
    ...bookExample,
    author: "",
  },
};
