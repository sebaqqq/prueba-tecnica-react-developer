import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import BookForm from "../components/BookForm";
import { BookProvider } from "../context/BookContext";
import { act } from "react-dom/test-utils";

describe("BookForm Component", () => {
  test("se renderiza correctamente con todos los campos", () => {
    render(
      <BookProvider>
        <BookForm />
      </BookProvider>
    );

    expect(screen.getByPlaceholderText("Título")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Autor")).toBeInTheDocument();
  });

  test("llama a addBook cuando se envía el formulario", async () => {
    render(
      <BookProvider>
        <BookForm />
      </BookProvider>
    );

    const titleInput = screen.getByPlaceholderText("Título");
    const authorInput = screen.getByPlaceholderText("Autor");
    const submitButton = screen.getByText(/Agregar libro/i);

    fireEvent.change(titleInput, { target: { value: "El Quijote" } });
    fireEvent.change(authorInput, { target: { value: "Miguel de Cervantes" } });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(
      screen.getByText("¡Libro agregado correctamente!")
    ).toBeInTheDocument();
  });
});
