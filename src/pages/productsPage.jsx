import { useEffect, useState } from "react";
import Loader from "../components/loader";
import axios from "axios";
import ProductCard from "../components/productCard";


export default function ProductsPage() {

    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    
    useEffect(() => {
        if (!loaded) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products")
                .then((response) => {
                    setProducts(response.data);
                    setLoaded(true);
                });
        }
    }, []);

    return(
        <div className="w-full max-h-full flex">
            {
                !loaded?<Loader/>:
                <div className="w-full bg-gray-100 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
                    {products.map((item) => (
                        <ProductCard key={item.productId} product={item} />
                    ))}
                </div>
            }
            
        </div>
    )
}