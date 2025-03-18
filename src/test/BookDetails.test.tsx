import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import BookDetails from "../components/BookDetails";
import { BookProvider } from "../context/BookContext";
import { Book } from "../components/type";

const mockBook: Book = {
  id: "1",
  name: "El Quijote",
  author: "Miguel de Cervantes",
  released: "1605-01-16",
  publisher: "Francisco de Robles",
  country: "España",
  mediaType: "Impreso",
  numberOfPages: 863,
};

describe("BookDetails Component", () => {
  test("muestra el título del libro correctamente", () => {
    render(
      <BookProvider>
        <BookDetails book={mockBook} />
      </BookProvider>
    );

    expect(screen.getByText(mockBook.name)).toBeInTheDocument();
  });

  test("agregar y eliminar de favoritos funciona correctamente", () => {
    render(
      <BookProvider>
        <BookDetails book={mockBook} />
      </BookProvider>
    );

    const favButton = screen.getByRole("button", {
      name: /Agregar a favoritos/i,
    });

    fireEvent.click(favButton);
    expect(
      screen.getByRole("button", { name: /Eliminar de favoritos/i })
    ).toBeInTheDocument();

    fireEvent.click(favButton);
    expect(
      screen.getByRole("button", { name: /Agregar a favoritos/i })
    ).toBeInTheDocument();
  });
});
