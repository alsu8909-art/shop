import cartIcon from "../assets/cart.svg";
import { useCart } from "../contexts/CartContext";

type HeaderBarProps = {
  onCartClick: () => void;
};

export function HeaderBar({ onCartClick }: HeaderBarProps) {
  const { totalItems } = useCart();

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-left">
          <span className="badge-vegetable">Vegetable</span>
          <span className="badge-shop">SHOP</span>
        </div>

        <button className="cart-button" onClick={onCartClick}>
          <span>Cart</span>
          <img src={cartIcon} alt="" className="cart-button-icon" />
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </button>
      </div>
    </header>
  );
}
