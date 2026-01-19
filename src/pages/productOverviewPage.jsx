import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useParams } from "react-router-dom"
import Loader from "../components/loader";
import ImageSlider from "../components/imageSlider";

export default function ProductOverviewPage() {

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
                    {/* <img src={product.images[0]} className="max-w-[80%] max-h-[80%] object-contain"/> */}
                </div>
                <div className="w-1/2 h-full p-10 flex flex-col gap-6">
                    <h1 className="text-4xl font-semibold">
                        {product.name}
                    </h1>
                </div>
            </div>
        }
        </>
    )
}