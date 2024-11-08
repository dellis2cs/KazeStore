import { useState, useEffect } from "react";
import Header from "./Header";

const categories = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

const useFetchProducts = () => {
  const [products, setProducts] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const categoryProducts = await Promise.all(
          categories.map(async (category) => {
            const response = await fetch(
              `https://fakestoreapi.com/products/category/${category}`
            );
            if (response.status >= 400) {
              throw new Error("server error");
            }
            const data = await response.json();
            return { category, products: data };
          })
        );

        // Convert the array of results into an object with categories as keys
        const productsByCategory = categoryProducts.reduce(
          (acc, { category, products }) => {
            acc[category] = products;
            return acc;
          },
          {}
        );

        setProducts(productsByCategory);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  });

  return { products, error, loading };
};

export default function Shop() {
  const { products, error, loading } = useFetchProducts();

  if (loading)
    return (
      <>
        <Header />
        <p>Loading...</p>
      </>
    );
  if (error) return <p>A network error was encountered</p>;

  return (
    <>
      <Header />
      <div className="cardsContainer">
        {Object.entries(products).map(([category, items]) => (
          <div key={category} className="categorySection">
            <h2>{category}</h2>
            <div className="productsGrid">
              {items.map((data) => (
                <div className="productCard" key={data.id}>
                  <div className="productImageContainer">
                    <img
                      src={data.image}
                      alt={data.title}
                      className="productImage"
                    />
                  </div>
                  <p className="productName">{data.title}</p>
                  <p className="productPrice">${data.price}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
