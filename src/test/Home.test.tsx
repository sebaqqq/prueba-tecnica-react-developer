import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { BookProvider } from "../context/BookContext";
import Home from "../pages/Home";
import useBooks from "../hooks/useBook";
import "@testing-library/jest-dom";

jest.mock("../hooks/useBook", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Home Component", () => {
  const mockBooks = [
    {
      id: "1",
      name: "El Quijote",
      author: "Miguel de Cervantes",
      publisher: "Editorial A",
      country: "España",
      released: "1605",
      mediaType: "Book",
      numberOfPages: 863,
    },
    {
      id: "2",
      name: "1984",
      author: "George Orwell",
      publisher: "Editorial B",
      country: "Reino Unido",
      released: "1949",
      mediaType: "Book",
      numberOfPages: 328,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useBooks as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      books: mockBooks,
    });
  });

  it("muestra la pantalla de carga cuando loading es true", async () => {
    (useBooks as jest.Mock).mockReturnValue({ loading: true, error: null });

    render(
      <BrowserRouter>
        <BookProvider>
          <Home />
        </BookProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole("status")).toBeInTheDocument();
    });
  });

  it("muestra un mensaje de error cuando error existe", async () => {
    (useBooks as jest.Mock).mockReturnValue({
      loading: false,
      error: "Error al cargar",
      books: [],
    });

    render(
      <BrowserRouter>
        <BookProvider>
          <Home />
        </BookProvider>
      </BrowserRouter>
    );

    expect(await screen.findByText(/Error al cargar/i)).toBeInTheDocument();
  });

  it("muestra el título 'Biblioteca Digital'", async () => {
    render(
      <BrowserRouter>
        <BookProvider>
          <Home />
        </BookProvider>
      </BrowserRouter>
    );

    expect(await screen.findByText(/Biblioteca Digital/i)).toBeInTheDocument();
  });

  it("muestra el botón de 'Añadir Libro'", async () => {
    render(
      <BrowserRouter>
        <BookProvider>
          <Home />
        </BookProvider>
      </BrowserRouter>
    );

    expect(await screen.findByText(/Añadir Libro/i)).toBeInTheDocument();
  });

  it("navega a la página de favoritos al hacer clic en el botón de 'Favoritos'", async () => {
    render(
      <BrowserRouter>
        <BookProvider>
          <Home />
        </BookProvider>
      </BrowserRouter>
    );

    const favoritesLink = screen.getByText(/Favoritos/i);
    expect(favoritesLink).toBeInTheDocument();
    expect(favoritesLink.closest("a")).toHaveAttribute("href", "/favorites");
  });
});
