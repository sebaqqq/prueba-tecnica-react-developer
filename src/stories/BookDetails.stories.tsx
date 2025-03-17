import BookDetails from "../components/BookDetails";
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
  title: "Componentes/BookDetails",
  component: BookDetails,
};

const Template = (args: { book: Book }) => <BookDetails {...args} />;

export const Default = Template.bind({});
Default.args = {
  book: bookExample,
};
