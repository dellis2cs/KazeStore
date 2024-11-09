import Header from "./Header";
import { useCart } from "./CartContext";
import { useState, useEffect } from "react";

export default function Cart() {
    const { cart } = useCart();
    const {removeItemFromCart, addItemToCart} = useCart()
    
    const [totalPrice, setTotalPrice] = useState(0)
  
    useEffect(() => {
        setTotalPrice(cart.reduce((acc, curr) => acc + curr.price, 0))
    }, [cart])

    return (
      <div>
        <Header />
        <h1>Your Cart</h1>
        <div className="cartTotal">
          <p>Total Price: ${totalPrice}</p>
          
        </div>

        <div className="cartContainer">
            {cart.length > 0 ? (
              cart.map((product, index) => (
                <div
                      className="productCard"
                      key={`${index}`}
                    >
                      <div className="productImageContainer">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="productImage"
                        />
                      </div>
                      <p className="productName">{product.title}</p>
                      <p className="productPrice">${product.price}</p>
                      <p className="productQuantity">{product.quantity}</p>
                      <button
                        className="removeFromCart"
                        onClick={() => removeItemFromCart(product)}
                      >
                        Remove to cart
                      </button>
                      <button
                        className="increaseQuantity"
                        onClick={() => addItemToCart(product)}
                      ></button>
                    </div>
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
        </div>
      </div>
    );
  }