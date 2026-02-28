import { useEffect, useState } from "react";
import Loader from "../components/loader";
import axios from "axios";
import ProductCard from "../components/productCard";

export default function ProductsPage() {

    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetchAllProducts();
    }, []);

    async function fetchAllProducts() {
        setLoaded(false);
        try {
            const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products");
            setProducts(res.data);
        } catch (error) {
            console.error("Error loading products", error);
        } finally {
            setLoaded(true);
        }
    }

    async function searchProducts(query) {
        if (!query.trim()) {
            fetchAllProducts();
            return;
        }

        setLoaded(false);
        try {
            const res = await axios.get(
                import.meta.env.VITE_BACKEND_URL + `/api/products/search/${query}`
            );
            setProducts(res.data);
        } catch (error) {
            console.error("Search failed", error);
        } finally {
            setLoaded(true);
        }
    }

    return (
        <div className="w-full min-h-screen bg-gray-100">

            {/* FIXED Search Bar */}
            <div className="fixed top-[100px] left-0 w-full z-30 bg-gray-100 px-6 py-4 shadow-sm">
                <div className="max-w-xl mx-auto">
                    <input
                        type="text"
                        placeholder="Search products..."
                        onChange={async (e) => {
                            if (e.target.value == "") {
                                setLoaded(false);
                                await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products")
                                .then((response) => {
                                    console.log(response.data)
                                    setProducts(response.data);
                                });
                                setLoaded(true);
                            } else {
                                await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/search/" + e.target.value)
                                .then((response) => {
                                    console.log(response.data)
                                    setProducts(response.data);
                                });
                                setLoaded(true);
                            }
                        }}
                        className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                </div>
            </div>

            {/* Products (padding-top added to avoid overlap) */}
            {!loaded ? (
                <Loader />
            ) : (
                <div className="px-6 pt-[100px] pb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
                    {products.length > 0 ? (
                        products.map((item) => (
                            <ProductCard
                                key={item.productId}
                                product={item}
                            />
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500 text-lg mt-10">
                            No products found
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
