import { useEffect, useState, useContext } from "react";
import Api from "../service/Api";
import ProductCard from "../components/ProductCard";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const  {token} = useContext(AuthContext);

    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    const limit = 8;

    const fetchProducts = async () => {
        try {
            setLoading(true);

            const res = await Api.get(
                `/products/get?search=${search}&page=${page}&limit=${limit}`
            );

            setProducts(res.data.products);
            setPages(res.data.pages || 1); // fallback if backend sends nothing

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [search, page]);

    // Reset to page 1 when searching
    useEffect(() => {
        setPage(1);
    }, [search]);

    return (
        <div className="bg-gray-50 min-h-screen">

            {/* Hero Section */}
            <section className="bg-linear-to-r from-blue-500 to-purple-600 text-white py-16 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Discover Amazing Products
                    </h1>
                    <p className="text-lg md:text-xl text-white/90">
                        Add and manage products with ease.
                    </p>

                    <div className="mt-8 max-w-xl mx-auto">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full px-5 py-3 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-4 focus:ring-white/40 shadow-lg"
                        />
                    </div>
                </div>
            </section>

            {/* Product Section */}
            <section className="max-w-7xl mx-auto px-6 py-12">
                <h2 className="text-2xl font-bold mb-8 text-gray-800">
                    Featured Products
                </h2>

                {token && (
                    <>
                        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {products.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                    refresh={fetchProducts}
                                />
                            ))}
                        </div>

                        {/* Pagination Section (Always Visible) */}
                        <div className="mt-12 flex justify-center">
                            <div className="flex items-center gap-2 flex-wrap">

                                {/* Previous */}
                                <button
                                    disabled={page === 1}
                                    onClick={() => setPage(page - 1)}
                                    className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-100 disabled:opacity-50 transition cursor-pointer"
                                >
                                    Prev
                                </button>

                                {/* Page Numbers */}
                                {[...Array(pages)].map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setPage(index + 1)}
                                        className={`px-4 py-2 rounded-lg border transition ${page === index + 1
                                                ? "bg-blue-600 text-white border-blue-600"
                                                : "bg-white hover:bg-gray-100"
                                            }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}

                                {/* Next */}
                                <button
                                    disabled={page === pages}
                                    onClick={() => setPage(page + 1)}
                                    className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-100 disabled:opacity-50 transition cursor-pointer"
                                >
                                    Next
                                </button>

                            </div>
                        </div>
                    </>
                )}
            </section>
        </div>
    );
}