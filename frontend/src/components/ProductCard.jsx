import { useNavigate, Link } from "react-router-dom";
import { useState, useContext } from "react";
import Api from "../service/Api";
import { ArrowRight, Heart } from "lucide-react";

export default function ProductCard({ product, refresh }) {
    const navigate = useNavigate();
    const [favorite, setFavorite] = useState(product.isFavorite || false);
    const [loadingFav, setLoadingFav] = useState(false);

    const toggleFavorite = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            setLoadingFav(true);

            if (!favorite) {
                await Api.delete(`/favorites/${product._id}`);
            } else {
                const res = await Api.post(`/favorites/${product._id}`);
                log(res.data);
            }

            setFavorite(!favorite);
        } catch (err) {
            console.log(err);
        } finally {
            setLoadingFav(false);
        }
    };

    return (
        <Link to={`/product/${product._id}`} className="block">


            <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100 group">

                {/* Image Section */}
                <div className="relative">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="h-52 w-full object-cover"
                    />

                    {/* Price Badge */}
                    <div className="absolute top-3 left-3 bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full shadow">
                        ${product.price}
                    </div>

                    {/* Favorite Button */}
                    <button
                        onClick={toggleFavorite}
                        disabled={loadingFav}
                        className="absolute top-3 right-3 bg-white/90 backdrop-blur-md p-2 rounded-full shadow hover:scale-110 transition"
                    >
                        <Heart
                            size={18}
                            className={`transition ${favorite ? "fill-red-500 text-red-500" : "text-gray-600"
                                }`}
                        />
                    </button>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col justify-between h-44">

                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 truncate">
                            {product.title}
                        </h3>

                        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                            {product.description}
                        </p>
                    </div>

                    {/* View Details Section */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between text-blue-600 font-medium text-sm group-hover:text-blue-700 transition">

                            <span>View Details</span>

                            <ArrowRight
                                size={18}
                                className="transition-transform duration-300 group-hover:translate-x-2"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </Link>
    );
}