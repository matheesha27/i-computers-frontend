import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"

export default function ProductDeleteButton(props) {
    
    const productId = props.productId
    const reload = props.reload
    const [isMessageOpen, setIsMessageOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    async function handleDelete() {
        setIsDeleting(true)
        const token = localStorage.getItem("token");
        axios
            .delete(
                "http://localhost:3000/api/products/" + productId,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            )
            .then(() => {
                toast.success("Product deleted successfully");
                setIsDeleting(false)
                setIsMessageOpen(false)
                reload()
            }).catch(() => {
                toast.error("Error in product delete");
                setIsDeleting(false)
            });
        // toast.success("Product deleted successfully: " + productId)
    }
    return (
        <>
        <button className="w-[55px] bg-red-500 text-primary flex justify-center items-center p-2 rounded-lg cursor-pointer hover:bg-red-600"
                onClick={() => {
                    setIsMessageOpen(true)
                }}>
                    Delete
        </button>
        {
        isMessageOpen
        &&
        <div className="w-[100vw] h-screen fixed top-0 left-0 bg-black/40 flex justify-center items-center">

            <div className="w-[500px] h-[250px] bg-primary rounded-3xl relative flex flex-col justify-center items-center">
                <button onClick={() => {setIsMessageOpen(false)}} className="w-[30px] h-[30px] rounded-full text-primary bg-red-600 cursor-pointer absolute right-[-22px] top-[-22px]">
                    x
                </button>
                <h1 className="text-2xl mb-6 text-center">Are you sure you want to delete this product {productId}?</h1>
                <div className="w-full flex justify-center gap-10">
                    <button className="w-[80px] bg-red-500 text-primary px-4 py-2 rounded-lg cursor-pointer hover:bg-red-600"
                            disabled={isDeleting}
                            onClick={handleDelete}>
                        Delete
                    </button>

                    <button className="w-[80px] bg-gray-500 text-primary px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-600"
                            onClick={() => {
                                setIsMessageOpen(false)
                            }}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
        }
        </>
    )
}

{/* <button
    className="w-[100px] bg-red-500 text-primary flex justify-center items-center p-2 rounded-lg cursor-pointer hover:bg-red-600"
    onClick={() => {
        const token = localStorage.getItem("token");
        axios
            .delete(
                "http://localhost:3000/api/products/" + item.productId,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            )
            .then(() => {
                toast.success("Product deleted successfully");
                setLoaded(false);
            });
    }}
>
    Delete
</button> */}