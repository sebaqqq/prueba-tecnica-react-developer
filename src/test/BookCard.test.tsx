import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import BookCard from "../components/BookCard";
import { BookCardProps } from "../components/type";

const mockBook: BookCardProps["book"] = {
  id: "1",
  name: "El Quijote",
  author: "Miguel de Cervantes",
  released: "1605-01-16",
  publisher: "Francisco de Robles",
  country: "España",
  mediaType: "Impreso",
  numberOfPages: 863,
};

const mockOnClick = jest.fn();

describe("BookCard Component", () => {
  test("muestra el título del libro correctamente", () => {
    render(<BookCard book={mockBook} onClick={mockOnClick} />);

    expect(screen.getByText(mockBook.name)).toBeInTheDocument();
  });

  test("muestra el autor del libro correctamente", () => {
    render(<BookCard book={mockBook} onClick={mockOnClick} />);

    expect(screen.getByText(mockBook.author)).toBeInTheDocument();
  });
});
