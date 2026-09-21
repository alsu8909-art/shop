import { useCart } from "../contexts/CartContext";
import cartEmptyImg from "../assets/cart-empty.svg";

type CartPopupProps = {
  opened: boolean;
  onClose: () => void;
};

export function CartPopup({ opened, onClose }: CartPopupProps) {
  const { cart, updateQuantity, totalPrice } = useCart();

  if (!opened) return null;

  return (
    <>
      <div className="cart-popup-overlay" onClick={onClose} />
      <div className="cart-popup">
        {cart.length === 0 ? (
          <div className="cart-popup-empty">
            <img
              src={cartEmptyImg}
              alt="Empty cart"
              className="cart-empty-image"
            />
            <p className="cart-popup-text">Your cart is empty!</p>
          </div>
        ) : (
          <div className="cart-popup-content">
            {cart.map((item) => (
              <div key={item.product.id} className="cart-item">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="cart-item-image"
                />
                <div className="cart-item-info">
                  <div className="cart-item-name">
                    <span className="name">
                      {item.product.name.split(" - ")[0]}
                    </span>
                    <span className="weight">
                      {item.product.name.split(" - ")[1] || ""}
                    </span>
                  </div>
                  <div className="cart-item-price">
                    ${item.product.price.toFixed(2)}
                  </div>
                </div>
                <div className="cart-item-quantity">
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity - 1)
                    }
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            <div className="cart-total">
              <div className="cart-total-row">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
