import { useEffect, useState } from "react";
import Api from "../service/Api";
import ProductCard from "../components/ProductCard";

export default function Favorites() {
  const [products, setProducts] = useState([]);

  const fetchFavorites = async () => {
    const res = await Api.get("/favorites");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-2xl font-bold mb-6">My Favorites ❤️</h2>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            refresh={fetchFavorites}
          />
        ))}
      </div>
    </div>
  );
}