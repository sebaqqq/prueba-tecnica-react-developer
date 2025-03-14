import React from "react";
import BookForm from "../components/BookForm";

const AddBook: React.FC = () => {
  return (
    <div>
      <h1>Agregar nuevo libro</h1>
      <BookForm />
    </div>
  );
};

export default AddBook;
