import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

const mockProducts = [
  {
    id: 1,
    name: "Broccoli - 1 Kg",
    price: 120,
    image: "https://example.com/broccoli.jpg",
    category: "vegetables",
  },
  {
    id: 2,
    name: "Carrot - 1 Kg",
    price: 56,
    image: "https://example.com/carrot.jpg",
    category: "vegetables",
  },
];

describe("Vegetable Shop", () => {
  beforeEach(() => {
    localStorage.clear();
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProducts),
      }),
    ) as any;
  });

  it("Показывает loader во время загрузки", () => {
    render(<App />);
    expect(screen.getByTestId("products-loader")).toBeTruthy();
  });

  it("Отображает товары после загрузки", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/Broccoli/)).toBeTruthy();
      expect(screen.getByText(/Carrot/)).toBeTruthy();
    });
  });

  it("Увеличивает количество товара по клику на +", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/Broccoli/)).toBeTruthy();
    });

    const plusButtons = screen.getAllByLabelText("Increment value");
    fireEvent.click(plusButtons[0]);

    await waitFor(() => {
      expect(screen.getAllByText("2").length).toBeGreaterThan(0);
    });
  });

  it("Добавляет товар в корзину", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/Broccoli/)).toBeTruthy();
    });

    const addButtons = screen.getAllByText("Add to cart");
    fireEvent.click(addButtons[0]);

    await waitFor(() => {
      const cartBadge = document.querySelector(".cart-badge");
      expect(cartBadge).toBeTruthy();
      expect(cartBadge?.textContent).toBe("1");
    });
  });

  it("Открывает попап корзины при клике на Cart", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/Broccoli/)).toBeTruthy();
    });

    const cartButton = screen.getByText("Cart").closest("button");
    fireEvent.click(cartButton!);

    await waitFor(() => {
      expect(screen.getByText(/Your cart is empty|Total/)).toBeTruthy();
    });
  });
});
