import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsPlus } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function AdminProductsPage() {

    const [products, setProducts] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
    if (!loaded) {
        axios.get("http://localhost:3000/api/products")
            .then((response) => {
                setProducts(response.data);
                console.log(response.data);
                setLoaded(true);
            });
    }
    }, [loaded]);


    return(
        <div className="w-full max-h-full flex justify-center p-10 relative bg-primary text-text">
            <div className="w-full overflow-x-auto shadow-lg rounded-xl bg-white">
                {loaded ? <table className="w-full max-h-full text-left border-collapse">
                    <thead className="bg-secondary sticky top-0 border-b border-secondary/20"> 
                        <tr className="text-primary">
                            <th className="p-4">Image</th>
                            <th className="p-4">Product ID</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Labeled Price</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Brand</th>
                            <th className="p-4">Model</th>
                            <th className="p-4">Available</th>
                            <th className="p-4">Stock</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((item, index) => (
                            <tr
                                key={index}
                                className="hover:bg-accent/10 transition-all border-b border-secondary/10"
                            >
                                <td className="p-4">
                                    <img
                                        src={item.images[0]}
                                        alt={item.name}
                                        className="w-12 h-12 object-cover rounded-lg border border-secondary/20"
                                    />
                                </td>

                                <td className="p-4">{item.productId}</td>
                                <td className="p-4 font-medium">{item.name}</td>

                                <td className="p-4 text-accent font-semibold">
                                    Rs. {item.price}
                                </td>

                                <td className="p-4 line-through text-secondary/70">
                                    Rs. {item.labeledPrice}
                                </td>

                                <td className="p-4">{item.category}</td>
                                <td className="p-4">{item.brand}</td>
                                <td className="p-4">{item.model}</td>

                                <td className="p-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                                            item.isAvailable
                                                ? "bg-secondary text-primary"
                                                : "bg-accent text-white"
                                        }`}
                                    >
                                        {item.isAvailable ? "Available" : "Out of stock"}
                                    </span>
                                </td>

                                <td className="p-4">{item.stock}</td>
                                <td className="p-4">
                                    <button
                                        className="w-[100px] bg-red-500 text-primary flex justify-center items-center p-2 rounded-lg cursor-pointer hover:bg-red-600"
                                        onClick={() => {
                                            const token = localStorage.getItem("token");
                                            axios.delete(
                                                "http://localhost:3000/api/products/" + item.productId,
                                                {
                                                    headers: {
                                                        Authorization: "Bearer " + token
                                                    }
                                                }
                                            ).then(() => {
                                                toast.success("Product deleted succeffully")
                                                setLoaded(false)
                                            })
                                        }}
                                    >
                                        Delete
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table> : <div className="w-full h-screen fixed top-0 left-0 bg-black/40 flex justify-center items-center">
                <div className="w-[80px] h-[80px] border-4 border-accent border-t-transparent rounded-full animate-spin"></div></div>}
            </div>

            <Link
                to="/admin/add-product"
                className="fixed right-6 bottom-6 w-[55px] h-[55px] flex justify-center items-center 
                        text-5xl rounded-full border-2 border-secondary
                        text-secondary bg-primary shadow-xl
                        hover:bg-secondary hover:text-primary transition-all"
            >
                <BsPlus />
            </Link>
        </div>
    )
}