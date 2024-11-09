import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);

    const addItemToCart = (product) => {
        setCart((prevCart) => {
            // Check if the product is already in the cart
            const existingItem = prevCart.find((item) => item.id === product.id);
            
            if (existingItem) {
                // Increase the quantity of the existing item
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // Add new item with quantity 1
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const removeItemFromCart = (product) => {
        setCart((prevCart) => prevCart.filter((item) => item.id!== product.id))
    }

    return (
        <CartContext.Provider value={{cart, addItemToCart, removeItemFromCart}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)