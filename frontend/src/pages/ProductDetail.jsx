import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, Edit, Trash2 } from "lucide-react";
import Api from "../service/Api";
import { AuthContext } from "../context/AuthContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // assuming user stored in context

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await Api.get(`/products/get/${id}`);
        setProduct(res.data);
        setFavorite(res.data.isFavorite || res.data.favorites?.includes(user._id));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);



  const deleteProduct = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await Api.delete(`/products/delete/${id}`);
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Product not found
      </div>
    );
  }

  const isOwner = user?._id === product.user;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 ">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden ">

        <div className="grid md:grid-cols-2 gap-8">

          {/* Image */}
          <div className="relative bg-gray-100">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-96 object-cover md:h-full"
            />

            {/* Favorite Button */}
            <button
              
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-full shadow hover:scale-110 transition cursor-pointer"
            >
              <Heart
                size={20}
                className={`transition ${
                  favorite ? "fill-red-500 text-red-500" : "text-gray-600"
                }`}
              />
            </button>
          </div>

          {/* Info */}
          <div className="p-8 flex flex-col justify-between">

            <div>
              <button
                onClick={() => navigate(-1)}
                className="text-sm text-blue-600 hover:underline mb-4 cursor-pointer"
              >
                ← Back
              </button>

              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                {product.title}
              </h2>

              <p className="text-2xl font-semibold text-blue-600 mb-4">
                ${product.price}
              </p>

              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Actions */}
            <div className="mt-8 space-y-4">

              {/* Owner Actions */}
              {isOwner && (
                <div className="flex gap-4">
                  <button
                    onClick={() => navigate(`/edit/${product._id}`)}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition transform  cursor-pointer"
                  >
                    <Edit size={18} />
                    Edit
                  </button>

                  <button
                    onClick={deleteProduct}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium transition transform  cursor-pointer"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>
              )}


            </div>

          </div>
        </div>
      </div>
    </div>
  );
}