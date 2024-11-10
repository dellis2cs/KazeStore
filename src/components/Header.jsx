import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "./CartContext";
import "../styles/Header.css";

export default function Header() {
  const { cart } = useCart(); // Optional: Get cart items for count

  // Calculate total number of items in the cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="headerContainer">
      <div className="leftHeader">
        <h1>Kaze</h1>
      </div>
      <div className="middleHeader">
        <input type="text" placeholder="Search" className="searchBar" />
        <Link to="/" className="Link">Home</Link>
        <Link to="/shop" className="Link">Shop</Link>
      </div>
      <div className="rightHeader">
        <Link to="/cart" className="headerCart">
          <FaShoppingCart size={22} className="cartIcon" />
          {cartItemCount > 0 && (
            <span className="cartCount">{cartItemCount}</span>
          )}
        </Link>
      </div>
    </div>
  );
}