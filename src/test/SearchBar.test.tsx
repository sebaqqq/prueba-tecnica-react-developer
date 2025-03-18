import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

describe("SearchBar Component", () => {
  test("se renderiza correctamente con un input de búsqueda", () => {
    render(<SearchBar onSearch={jest.fn()} />);

    const searchInput = screen.getByPlaceholderText("Buscar libro...");
    expect(searchInput).toBeInTheDocument();
  });

  test("llama a la función onSearch cuando se ingresa texto", () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const searchInput = screen.getByPlaceholderText("Buscar libro...");

    fireEvent.change(searchInput, { target: { value: "Harry Potter" } });

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith("Harry Potter");
  });

  test("actualiza el estado al escribir en el input", () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const searchInput = screen.getByPlaceholderText("Buscar libro...");

    fireEvent.change(searchInput, { target: { value: "El Quijote" } });

    expect(searchInput).toHaveValue("El Quijote");
  });
});
