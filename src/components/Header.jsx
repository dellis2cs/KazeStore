import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

export default function Header() {
  return (
    <div className="headerContainer">
      <div className="leftHeader">
        <h1>Kaze</h1>
      </div>
      <div className="middleHeader">
        <input type="text" placeholder="search" className="searchBar" />
        <Link to="/" className="Link">
          Home
        </Link>
        <Link to="/shop" className="Link">
          Shop
        </Link>
      </div>
      <div className="rightHeader">
        <Link to="/cart" className="Link">
          <FaShoppingCart size={22} />
        </Link>
      </div>
    </div>
  );
}
