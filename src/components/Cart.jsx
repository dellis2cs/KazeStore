import Header from "./Header";
import "../styles/cart.css";
import { useCart } from "./CartContext";
import { useState, useEffect } from "react";

export default function Cart() {
  
  const { cart, removeItemFromCart, addItemToCart, decreaseQuantity } = useCart();

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0));
  }, [cart]);

  return (
    <div>
      <Header />
      <div className="cartContainer">
        <h1>Your Cart</h1>
        <div className="cartTotal">
          <p>Total Price: ${totalPrice}</p>
        </div>
        <div className="cartCardsContainer">
          {cart.length > 0 ? (
            cart.map((product, index) => (
              <div className="cartCard" key={`${index}`}>
                <div className="cartImageContainer">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="productImage"
                  />
                </div>
                <p className="productName">{product.title}</p>
                <p className="productPrice">${product.price}</p>
                <button
                  className="removeFromCart"
                  onClick={() => removeItemFromCart(product)}
                >
                  Remove to cart
                </button>
                <div className="quantityButtons">
                  <button
                    className="decreaseQuantity"
                    onClick={() => decreaseQuantity(product)}
                  >-</button>
                  <p className="productQuantity">{product.quantity}</p>
                  <button
                    className="increaseQuantity"
                    onClick={() => addItemToCart(product)}
                  >+</button>
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
}
