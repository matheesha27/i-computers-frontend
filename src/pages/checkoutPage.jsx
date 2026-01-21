import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CgChevronUp } from "react-icons/cg";
import toast from "react-hot-toast";
import axios from "axios";

export default function CheckoutPage() {

    const location = useLocation();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [cart, setCart] = useState(location.state);

    if (location.state == null) {
        navigate("/products")
    }

    function getCartTotal() {
    
        let total = 0;
        cart.forEach(
            (item) => {
                total += item.price * item.quantity
            }
        )
        return total
    }

    async function submitOrder() {
        const token = localStorage.getItem("token");
        if (token == null) {
            toast.error("You must log in to place an order")
            navigate("/login");
            return
        }
    

    const orderItems = []

    cart.forEach((item) => {
        orderItems.push(
            {
                productId: item.productId,
                quantity: item.quantity
            }
        )
    });

    axios.post("http://localhost:3000/api/orders", {
        name: name,
        address: address,
        phone: phone,
        items: orderItems
    }, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then((response) => {
        toast.success("Order placed successfully");
        navigate("/orders");
    }).catch((error) => {
        toast.error("Error placing the order");
    })
}
    
    return(
        <div className="w-full flex flex-col items-center p-[20px]">
            {
                cart.map(
                    (item, index) => {
                        return(
                            <div className="w-[50%] h-[120px] rounded-xl overflow-hidden shadow-2xl my-1 flex items-center gap-4" >
                                <img src={item.image} className="h-full aspect-square object-cover"/>
                                <div className="flex flex-col justify-center pl-4">
                                    <h1 className="text-2xl text-secondary font-semibold m-2 mt-2 relative hover:[&_.tooltip]:opacity-100">
                                        <span className="opacity-0 tooltip italic text-sm absolute bottom-[-20px] bg-accent text-white px-2 rounded-full">{item.name}</span>
                                        {
                                            item.name.length > 30 ? item.name.substring(0,30) + "..." : item.name
                                        }
                                    </h1>
                                    <h2 className="text-xl text-accent font-semibold m-2">LKR {item.price.toFixed(2)}</h2>
                                    <h3 className="italic text-lg m-2">{item.productId}</h3>
                                </div>

                                <div className="ml-auto flex items-center gap-6 text-right mr-5">
                                    <div className="flex flex-col items-center">
                                        <CgChevronUp className="text-2xl cursor-pointer hover:text-gray-900 transition"
                                        onClick={() => {
                                            const copiedCart = [...cart] // getting a copy of the currently having cart
                                            copiedCart[index].quantity += 1
                                            setCart(copiedCart)
                                        }}/>
                                        <span className="font-medium">{item.quantity}</span>
                                        <CgChevronUp className="rotate-180 text-2xl cursor-pointer hover:text-gray-900 transition"
                                        onClick={() => {
                                            const copiedCart = [...cart]
                                            copiedCart[index].quantity -= 1
                                            if (copiedCart[index] < 1) {
                                                copiedCart.splice(index, 1) // delete "1" element from the cart from index "index"
                                            }
                                            setCart(copiedCart)
                                        }}/>
                                    </div>
                                    <span className="text-lg font-semibold min-w-[110px] text-right">
                                        LKR {(item.price * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        )
                    }
                )
            }
            <div className="w-[50%] h-[240px] p-4 rounded-xl overflow-hidden shadow-2xl my-1 flex flex-wrap items-center px-6 bg-accent/25 justify-between">
                <div className="w-full flex gap-x-6">
                    <div className="w-[50%] flex flex-col">
                        <label className="text-md font-semibold">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => {setName(e.target.value)}}
                            className="px-6 py-3 rounded border-2 border-accent/60 focus:border-accent focus:border-3 outline-none"    
                        />
                    </div>
                    <div className="w-[50%] flex flex-col">
                        <label className="text-md font-semibold">Contact</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => {setPhone(e.target.value)}}
                            className="px-6 py-3 rounded border-2 border-accent/60 focus:border-accent focus:border-3 outline-none"    
                        />
                    </div>
                </div>
                <div className="w-full flex flex-col">
                    <label className="text-md font-semibold">Address</label>
                    <textarea
                        type="text"
                        value={address}
                        onChange={(e) => {setAddress(e.target.value)}}
                        className="px-6 py-3 rounded border-2 border-accent/60 focus:border-accent focus:border-3 outline-none"    
                    />
                </div>
            </div>
            <div className="w-[50%] h-[120px] rounded-xl overflow-hidden shadow-2xl my-1 flex items-center px-6 bg-accent justify-between">
                <button
                    className="self center ml-4 px-6 py-3 rounded bg-secondary italic text-primary font-bold border-2 border-secondary hover:bg-secondary/90 transition shadow"
                    onClick={submitOrder}>
                        Order Now
                </button>
                <span className="italic text-primary font-bold text-2xl mr-5 shadow-2xl">
                    Total = LKR {getCartTotal().toLocaleString()}
                </span>
            </div>
        </div>
    )
}