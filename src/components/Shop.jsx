import { useState, useEffect, createContext } from "react";
import Header from "./Header";
import { useCart } from "./CartContext";



export default function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {addItemToCart} = useCart()

  const fetchCategories = async () => {
    setIsLoading(true);
    const response = await fetch(
      "https://fakestoreapi.com/products/categories"
    );
    const categoryData = await response.json();
    setCategories(categoryData);
    setIsLoading(false);
  };

  useEffect(() => {

    fetchCategories();
  }, []);

  const filterCategory = (category) => {
    setCategories([category]);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);

      const results = await Promise.all(
        categories.map(async (category) => {
          const response = await fetch(
            `https://fakestoreapi.com/products/category/${category}`
          );
          return await response.json();
        })
      );

      setProducts(results);
      setIsLoading(false);
    };

    fetchProducts();
  }, [categories]);

  if (isLoading) {
    return (
      <div className="loading">
        <Header />
        <div className="loadingContainer">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="categoryChooser">
      <button className="categoryBtn" onClick={() => fetchCategories()}>All</button>
        <button className="categoryBtn" onClick={() => filterCategory("electronics")}>Electronics</button>
        <button className="categoryBtn" onClick={() => filterCategory("jewelery")}>Jewlery</button>
        <button className="categoryBtn" onClick={() => filterCategory("men's clothing")}>Men's</button>
        <button className="categoryBtn" onClick={() => filterCategory("women's clothing")}>Women's</button>
      </div>
      <div className="cardsContainer">
        {products.map((category, categoryIndex) => (
          <div className="categorySection" key={categoryIndex}>
            <h1>{categories[categoryIndex]}</h1>

            <div className="productsGrid">
              {category.map((product, productIndex) => (
                <div
                  className="productCard"
                  key={`${categoryIndex}-${productIndex}`}
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
                  <button
                    className="addToCart"
                    onClick={() => addItemToCart(product)} // Pass the entire product object
                  >
                    Add to cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
