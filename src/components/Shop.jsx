import { useState, useEffect, useMemo } from "react";
import Header from "./Header";
import { useCart } from "./CartContext";
import "../styles/Shop.css"

export default function Shop() {
  // State for all products and filtered products based on selected category
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { addItemToCart } = useCart(); // Access the cart context

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      const categoryData = await response.json();
      setCategories(categoryData); // Store categories for filtering
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://fakestoreapi.com/products");
        const productData = await response.json();
        setAllProducts(productData); // Store all products in a single state
        setFilteredProducts(productData); // Initially show all products
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    };

    fetchAllProducts();
    fetchCategories(); // Fetch categories on component mount
  }, []);

  // Filter function to set selected category and filtered products
  const filterCategory = (category) => {
    setSelectedCategory(category); // Set the current category
    if (!category) {
      setFilteredProducts(allProducts); // Show all products if no category is selected
    } else {
      setFilteredProducts(
        allProducts.filter((product) => product.category === category)
      );
    }
  };

  // Calculate filtered products using useMemo for optimized re-renders
  const productsToDisplay = useMemo(() => {
    if (!selectedCategory) return allProducts;
    return allProducts.filter(
      (product) => product.category === selectedCategory
    );
  }, [allProducts, selectedCategory]);

  if (isLoading) {
    return (
      <div className="loading">
        <Header />
        <div className="loadingContainer">Loading...</div>
      </div>
    );
  }

  // Optimized add-to-cart handler to avoid recreating inline functions
  const handleAddToCart = (product) => {
    addItemToCart(product);
  };

  return (
    <div>
      <Header />
      <div className="categoryChooser">
        {/* "All" button to reset category filter */}
        <button className="categoryBtn" onClick={() => filterCategory(null)}>
          All
        </button>
        {/* Dynamically generate category buttons */}
        {categories.map((category) => (
          <button
            key={category}
            className="categoryBtn"
            onClick={() => filterCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      <div className="cardsContainer">
        {productsToDisplay.length > 0 ? (
          <div className="productsGrid">
            {productsToDisplay.map((product) => (
              <div className="productCard" key={product.id}>
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
                  onClick={() => handleAddToCart(product)}
                >
                  Add to cart
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}
