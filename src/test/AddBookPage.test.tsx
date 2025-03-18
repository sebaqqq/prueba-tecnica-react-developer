import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AddBook from "../pages/AddBook";

jest.mock("../components/BookForm", () => () => (
  <div data-testid="book-form" />
));

describe("AddBook Page", () => {
  test("se renderiza correctamente con el título y el icono", () => {
    render(<AddBook />);

    expect(screen.getByText("Detalle del libro")).toBeInTheDocument();
    expect(screen.getByTestId("book-form")).toBeInTheDocument();
  });
});
