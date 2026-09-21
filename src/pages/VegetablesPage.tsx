import { useEffect, useState } from "react";
import { AppShell, Loader } from "@mantine/core";
import { HeaderBar } from "../components/HeaderBar";
import { ProductCard } from "../components/ProductCard";
import { CartPopup } from "../components/CartPopup";
import { CartProvider } from "../contexts/CartContext";
import { fetchProducts } from "../api";
import type { Product } from "../types";

export function VegetablesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <CartProvider>
      <AppShell
        header={{ height: 64 }}
        padding="md"
        styles={{
          header: { position: "sticky", top: 0, zIndex: 100 },
          main: { backgroundColor: "#F3F5FA" },
        }}
      >
        <AppShell.Header>
          <HeaderBar onCartClick={() => setCartOpened(true)} />
        </AppShell.Header>

        <AppShell.Main>
          <div className="page-container">
            {loading ? (
              <div className="loader-container">
                <Loader size="xl" color="green" data-testid="products-loader" />
              </div>
            ) : (
              <>
                <div className="catalog-title">Catalog</div>
                <div className="products-grid">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </AppShell.Main>

        <CartPopup opened={cartOpened} onClose={() => setCartOpened(false)} />
      </AppShell>
    </CartProvider>
  );
}
