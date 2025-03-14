import React from "react";
import { Formik, Field, Form } from "formik";

const BookForm: React.FC = () => {
  return (
    <Formik
      initialValues={{ title: "", author: "", genre: "", published: "" }}
      onSubmit={(values) => console.log(values)}
    >
      <Form>
        <div>
          <Field type="text" name="title" placeholder="Título" />
        </div>
        <div>
          <Field type="text" name="author" placeholder="Autor" />
        </div>
        <div>
          <Field type="text" name="genre" placeholder="Género" />
        </div>
        <div>
          <Field
            type="date"
            name="published"
            placeholder="Fecha de publicación"
          />
        </div>
        <button type="submit">Agregar libro</button>
      </Form>
    </Formik>
  );
};

export default BookForm;
