import { useState } from "react";
import { Card, Image, Text, Group } from "@mantine/core";
import cartIcon from "../assets/cart.svg";
import type { Product } from "../types";
import { useCart } from "../contexts/CartContext";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const [name, weight] = product.name.split(" - ");

  return (
    <Card className="product-card" withBorder={false}>
      <Image
        src={product.image}
        alt={product.name}
        height={276}
        fit="contain"
      />

      <Group justify="space-between" align="center" wrap="nowrap" gap="xs">
        <Group
          gap={6}
          align="baseline"
          wrap="nowrap"
          style={{ flex: 1, minWidth: 0 }}
        >
          <Text className="name" truncate>
            {name}
          </Text>
          {weight && <Text className="weight">{weight}</Text>}
        </Group>

        <div className="quantity-control">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrement value"
          >
            −
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Increment value"
          >
            +
          </button>
        </div>
      </Group>

      <Group justify="space-between" align="center" wrap="nowrap">
        <Text className="price">${product.price}</Text>
        <button
          className="add-to-cart"
          onClick={() => addToCart(product, quantity)}
        >
          <span>Add to cart</span>
          <img src={cartIcon} alt="" width={20} height={20} />
        </button>
      </Group>
    </Card>
  );
}
