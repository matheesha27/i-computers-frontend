import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Loader from "../components/loader";
import ImageSlider from "../components/imageSlider";
import { CgChevronRight } from "react-icons/cg";
import { addToCart, getCart } from "../utils/cart";

export default function ProductOverviewPage() {

    const navigate = useNavigate();
    const params = useParams();
    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("loading"); //loading, error, success

    useEffect(() => {
        if(status == "loading") {
            axios.get("http://localhost:3000/api/products/" + params.productId).then(
                (response) => {
                    setProduct(response.data);
                    setStatus("success")
                }
            ).catch(
                () => {
                    setStatus("error")
                    toast.error("Product Not Found")
                }
            )
        }
    }, [])
    return (
        <>
        {
            status == "loading" && <Loader/>
        }
        {
            status == "error" && <h1 className="text center mt-10 text-2xl">Error loading product</h1>
        }
        {
            status == "success" &&
            <div className="w-full h-[calc(100vh-100px)] flex">
                <div className="w-1/2 h-full flex justify-center items-center">
                    <ImageSlider images={product.images}/>
                </div>
                <div className="mt-5 flex flex-col gap-6">
                    <div>
                        <h1 className="text-4xl font-semibold text-gray-900">
                            {product.name}
                        </h1>

                        <p className="italic text-sm text-gray-500 mt-1">
                            Product ID: {product.productId}
                        </p>

                        <div className="flex items-center gap-1 text-gray-600 mt-2">
                            <CgChevronRight className="text-lg" />
                            <span className="text-sm">{product.category}</span>
                        </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed text-justify">
                        {product.description}
                    </p>

                    <div className="flex flex-col gap-1">
                        {product.labeledPrice > product.price && (
                            <span className="text-xl line-through text-gray-500">
                                LKR {product.labeledPrice.toLocaleString()}
                            </span>
                        )}
                        <span className="text-3xl font-bold text-amber-600">
                            LKR {product.price.toLocaleString()}
                        </span>
                    </div>

                    <div className="w-[400px] flex gap-4 mt-4">
                        <button className="flex-1 bg-secondary text-white py-3 rounded-lg font-medium
                                           hover:bg-secondary/80 transition" onClick={() => {
                                            addToCart(product, 1)
                                           }}>
                            Add to Cart
                        </button>

                        <button className="flex-1 border-2 border-secondary text-secondary/90 py-3 rounded-lg font-medium
                                           hover:bg-secondary hover:text-white transition"
                                           onClick={() => {
                                            navigate("/checkout", {state: [{
                                                productId: product.productId,
                                                name: product.name,
                                                price: product.price,
                                                labeledPrice: product.labeledPrice,
                                                image: product.image,
                                                quantity: 1
                                            }]})
                                           }}>
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        }
        </>
    )
}