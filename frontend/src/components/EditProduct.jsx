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
        <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow rounded">
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="title"
                    value={product.title || ""}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />
                <input
                    name="price"
                    value={product.price || ""}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />
                <input
                    name="image"
                    value={product.image || ""}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />
                <textarea
                    name="description"
                    value={product.description || ""}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition cursor-pointer">
                    Update Product
                </button>
            </form>
        </div>
    );
}