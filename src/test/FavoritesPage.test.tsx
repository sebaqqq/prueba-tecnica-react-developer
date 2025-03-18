import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BookProvider } from "../context/BookContext";
import FavoritesPage from "../pages/FavoritesPage";

jest.mock("../components/BookCard", () => ({
  __esModule: true,
  default: ({ book }: { book: { name: string } }) => (
    <div data-testid="book-card">{book?.name}</div>
  ),
}));

describe("FavoritesPage", () => {
  test("muestra mensaje cuando no hay libros favoritos", () => {
    render(
      <BookProvider>
        <FavoritesPage />
      </BookProvider>
    );

    expect(
      screen.getByText("No tienes libros favoritos todavía.")
    ).toBeInTheDocument();
  });
});
