import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Api from "../service/Api";

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});

    useEffect(() => {
        Api.get(`/products/get/${id}`).then((res) => {
            setProduct(res.data);
        });
    }, [id]);

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await Api.put(`/products/update/${id}`, product);
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-gray-100 p-8">

                {/* Header */}
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Edit Product
                    </h2>
                    <p className="text-gray-500 text-sm mt-2">
                        Update your product details below
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Product Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={product.title || ""}
                            onChange={handleChange}
                            placeholder="Enter product title"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Price ($)
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={product.price || ""}
                            onChange={handleChange}
                            placeholder="Enter product price"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                        />
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Image URL
                        </label>
                        <input
                            type="text"
                            name="image"
                            value={product.image || ""}
                            onChange={handleChange}
                            placeholder="Paste image URL"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            rows="4"
                            value={product.description || ""}
                            onChange={handleChange}
                            placeholder="Write product description..."
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition resize-none"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">

                        <button
                            type="submit"
                            className="w-full sm:w-auto flex-1 bg-green-600 text-white font-medium py-3 rounded-lg hover:bg-green-700 transition duration-300 shadow-md hover:shadow-lg"
                        >
                            Update Product
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="w-full sm:w-auto flex-1 bg-gray-100 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-200 transition duration-300"
                        >
                            Cancel
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
}