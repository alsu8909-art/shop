import { useState } from "react";
import { AppShell, Loader } from "@mantine/core";
import { HeaderBar } from "../components/HeaderBar";
import { ProductCard } from "../components/ProductCard";
import { CartPopup } from "../components/CartPopup";
import { CartProvider } from "../contexts/CartContext";
import { useProducts } from "../hooks/useProducts";

export function VegetablesPage() {
  const { products, loading } = useProducts();
  const [cartOpened, setCartOpened] = useState(false);

  return (
    <CartProvider>
      <AppShell header={{ height: 64 }} padding="md" className="page-shell">
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
