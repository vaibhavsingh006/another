import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import {
  getProducts,
  addToCart,
} from "../services/api";

const Home = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getProducts();

    setProducts(data || []);
    setLoading(false);
  };

  const handleAddToCart = async (productId) => {
    const data = await addToCart({
      productId,
      quantity: 1,
    });

    if (data.error) {
      alert(data.error);
      return;
    }

    alert(data.message);
    fetchProducts();
  };

  return (
    <div>

      <Navbar />

      <div className="p-5">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold">
              Products
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Browse items and add them to your cart.
            </p>
          </div>
          <div className="text-sm text-gray-500">
            {products.length} product(s) available
          </div>
        </div>

        {loading ? (
          <div className="text-center text-gray-500">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-500">
            No products found.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                handleAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Home;