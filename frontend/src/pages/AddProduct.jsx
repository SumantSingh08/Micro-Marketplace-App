import { useState } from "react";
import Api from "../service/Api";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        title: "",
        price: "",
        description: "",
        image: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            setLoading(true);
            await Api.post("/products/create", product);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 px-4 py-10">
            <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">

                {/* Title */}
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Add New Product 📦
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                    Fill in the details below to list your product in the marketplace
                </p>

                {/* Error */}
                {error && (
                    <div className="bg-red-100 text-red-600 text-sm p-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Product Title
                        </label>
                        <input
                            name="title"
                            placeholder="Enter product title"
                            required
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Price ($)
                        </label>
                        <input
                            name="price"
                            type="number"
                            placeholder="Enter price"
                            required
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                        />
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Image URL
                        </label>
                        <input
                            name="image"
                            placeholder="Paste image URL"
                            required
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            rows="4"
                            placeholder="Write product description..."
                            required
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition resize-none"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 transform cursor-pointer disabled:opacity-70"
                    >
                        {loading ? "Adding Product..." : "Add Product"}
                    </button>

                </form>
            </div>
        </div>
    );
}