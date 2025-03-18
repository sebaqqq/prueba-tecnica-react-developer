import BookForm from "../components/BookForm";
import { BookProvider } from "../context/BookContext";

const handleBookSubmit = (book: {
  name: string;
  author: string;
  released: string;
  publisher: string;
}) => {
  console.log("Libro enviado:", book);
};

export default {
  title: "Componentes/BookForm",
  component: BookForm,
};

const Template = () => (
  <BookProvider value={{ books: [] }}>
    <BookForm onSubmit={handleBookSubmit} />
  </BookProvider>
);

export const Default = Template.bind({});
Default.args = {
  onSubmit: handleBookSubmit,
};
