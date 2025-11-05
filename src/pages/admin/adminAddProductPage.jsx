import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AdminAddProductPage() {
    const [productId, setProductId] = useState("");
    const [name, setName] = useState("");
    const [alternativeNames, setAlternativeNames] = useState(); // can be managed with split(",")
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [labeledPrice, setLabeledPrice] = useState(0);
    const [images, setImages] = useState(""); // can store URLs or file paths
    const [category, setCategory] = useState("");
    const [model, setModel] = useState("Standard");
    const [brand, setBrand] = useState("No brand");
    const [stock, setStock] = useState(0);
    const [isAvailable, setIsAvailable] = useState(false);

    const navigate = useNavigate();
    async function addProduct() {
        const token = localStorage.getItem("token")
        console.log(token)
        
        if (token == null) {
            toast.error("You must be logged in as Admin to add products.")
            navigate("/login")
            return
        }

        if (productId == "" || name == "" || description == "" || category == "" || brand == "" || model == "") {
            toast.error("Please fill all required fields.")
            return
        }

        try {
            const alternativeNamesInArray = alternativeNames.split(",")
            const imagesInArray = images.split(",")

            await axios.post("http://localhost:3000/api/products", {
                productId: productId,
                name: name,
                alternativeNames: alternativeNamesInArray,
                description: description,
                price: price,
                labeledPrice: labeledPrice,
                images: imagesInArray,
                category: category,
                model: model,
                brand: brand,
                stock: stock,
                isAvailable: isAvailable
            },
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        )
        toast.success("Product added successfully")

        } catch(error) {
            toast.error()
        }
    }

    return (
        <div className="w-full h-full p-10 flex justify-center items-start overflow-y-scroll bg-gray-50">
            {/* Form container */}
            <div className="w-[850px] bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-center text-accent mb-8">Add New Product</h2>

            {/* Inputs grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                {/* Product ID */}
                <div>
                <label className="block mb-1 font-medium text-gray-700">Product ID</label>
                <input
                    type="text"
                    className="w-full h-[42px] border border-accent rounded-xl focus:outline-none focus:ring-2 focus:ring-accent px-3"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                />
                <p className="text-sm text-gray-500 text-right">Provide a unique ID</p>
                </div>

                {/* Name */}
                <div>
                <label className="block mb-1 font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    className="w-full h-[42px] border border-accent rounded-xl focus:outline-none focus:ring-2 focus:ring-accent px-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                </div>

                {/* Alternative Names */}
                <div className="col-span-2">
                <label className="block mb-1 font-medium text-gray-700">Alternative Names</label>
                <input
                    type="text"
                    className="w-full h-[42px] border border-accent rounded-xl focus:outline-none focus:ring-2 focus:ring-accent px-3"
                    value={alternativeNames}
                    onChange={(e) => setAlternativeNames(e.target.value)}
                />
                <p className="text-sm text-gray-500 text-right">Separate multiple names with commas</p>
                </div>

                {/* Description */}
                <div className="col-span-2">
                <label className="block mb-1 font-medium text-gray-700">Description</label>
                <textarea
                    className="w-full h-[100px] border border-accent rounded-xl focus:outline-none focus:ring-2 focus:ring-accent px-3 py-2 resize-none"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                </div>

                {/* Price & Labeled Price */}
                <div>
                <label className="block mb-1 font-medium text-gray-700">Price</label>
                <input
                    type="number"
                    className="w-full h-[42px] border border-accent rounded-xl focus:outline-none focus:ring-2 focus:ring-accent px-3"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                </div>
                <div>
                <label className="block mb-1 font-medium text-gray-700">Labeled Price</label>
                <input
                    type="number"
                    className="w-full h-[42px] border border-accent rounded-xl focus:outline-none focus:ring-2 focus:ring-accent px-3"
                    value={labeledPrice}
                    onChange={(e) => setLabeledPrice(e.target.value)}
                />
                </div>

                {/* Images */}
                <div className="col-span-2">
                <label className="block mb-1 font-medium text-gray-700">Images</label>
                <input
                    type="text"
                    className="w-full h-[42px] border border-accent rounded-xl focus:outline-none focus:ring-2 focus:ring-accent px-3"
                    value={images}
                    onChange={(e) => setImages(e.target.value)}
                />
                <p className="text-sm text-gray-500 text-right">Add image URLs separated by commas</p>
                </div>

                {/* Category */}
                <div>
                <label className="block mb-1 font-medium text-gray-700">Category</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-[42px] border border-accent rounded-xl focus:outline-none focus:ring-2 focus:ring-accent px-3"
                >
                    <option value="CPU">CPU</option>
                    <option value="Graphic Card">Graphic Card</option>
                    <option value="RAM">RAM</option>
                    <option value="Motherboard">Motherboard</option>
                    <option value="Storage Device">Storage Device</option>
                    <option value="Mouse/Keyboard">Mouse/Keyboard</option>
                    <option value="Power Supply">Power Supply</option>
                    <option value="Desktop Computer">Desktop Computer</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Cable">Cable</option>
                    <option value="Monitor">Monitor</option>
                    <option value="Headphone/Speaker">Headphone/Speaker</option>
                    <option value="Other">Other</option>
                </select>
                </div>

                {/* Brand */}
                <div>
                <label className="block mb-1 font-medium text-gray-700">Brand</label>
                <input
                    type="text"
                    className="w-full h-[42px] border border-accent rounded-xl focus:outline-none focus:ring-2 focus:ring-accent px-3"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                />
                </div>

                {/* Model */}
                <div>
                <label className="block mb-1 font-medium text-gray-700">Model</label>
                <input
                    type="text"
                    className="w-full h-[42px] border border-accent rounded-xl focus:outline-none focus:ring-2 focus:ring-accent px-3"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                />
                </div>

                {/* Stock */}
                <div>
                <label className="block mb-1 font-medium text-gray-700">Stock</label>
                <input
                    type="number"
                    className="w-full h-[42px] border border-accent rounded-xl focus:outline-none focus:ring-2 focus:ring-accent px-3"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                />
                </div>

                {/* Availability */}
                <div>
                <label className="block mb-1 font-medium text-gray-700">Availability</label>
                <select
                    value={isAvailable}
                    onChange={(e) => setIsAvailable(e.target.value)}
                    className="w-full h-[42px] border border-accent rounded-xl focus:outline-none focus:ring-2 focus:ring-accent px-3"
                >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
                </div>
            </div>

            {/* Submit button */}
            <div className="w-full flex gap-4 mt-8">
                <button
                    className="w-1/2 h-[45px] bg-gray-300 text-gray-800 font-semibold rounded-xl shadow-md hover:bg-gray-400 transition"
                    onClick={() => navigate(-1)}
                >
                    Cancel
                </button>

                <button
                    className="w-1/2 h-[45px] bg-accent text-white font-semibold rounded-xl shadow-md hover:bg-accent/80 transition"
                    onClick={addProduct}
                >
                    Add Product
                </button>
            </div>
            </div>
        </div>
    )
}
