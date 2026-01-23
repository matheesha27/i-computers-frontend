import { useState } from "react"
import { addToCart, getCart, getCartTotal } from "../utils/cart"
import { CgChevronUp } from "react-icons/cg";
import { Link } from "react-router-dom";

export default function CartPage() {

    const [cart, setCart] = useState(getCart());

    return(
        <div className="w-full flex flex-col items-center p-[20px]">
            {
                cart.map(
                    (item, index) => {
                        return(
                            <div key={index} className="w-full lg:w-[50%] lg:h-[120px] rounded-xl pt-[20px] overflow-hidden shadow-2xl my-1 flex justify-center items-center gap-4 relative" >
                                <h1 className="lg:hidden w-full overflow-hidden h-[20px] font-semibold absolute top-[0px]">{item.name}</h1>
                                <div className="h-full flex flex-col">
                                    <img
                                        src={item.image}
                                        className="h-[80px] lg:h-full aspect-square object-cover"
                                    />
                                    <span className="lg:hidden text-sm font-semibold min-w-[110px] text-right">
                                        LKR {(item.price).toFixed(2)}
                                    </span>
                                </div>
                                <div className="hidden lg:flex flex-col justify-center pl-4 leading-tight">
                                    <h1 className="text-xl text-secondary font-semibold lg:my-1 relative hover:[&_.tooltip]:opacity-100 leading-tight">
                                        <span className="opacity-0 tooltip italic text-sm absolute bottom-[-20px] bg-accent text-white px-2 rounded-full">{item.name}</span>
                                        {
                                            item.name.length > 30 ? item.name.substring(0,30) + "..." : item.name
                                        }
                                    </h1>
                                    <h2 className="text-lg text-accent font-semibold lg:my-1 leading-tight">LKR {item.price.toFixed(2)}</h2>
                                    <h3 className="italic text-base lg:my-1 text-gray-500 leading-tight">{item.productId}</h3>
                                </div>

                                <div className="ml-auto flex items-center gap-6 text-right mr-5">
                                    <div className="flex flex-col items-center">
                                        <CgChevronUp className="text-2xl cursor-pointer hover:text-gray-900 transition"
                                        onClick={() => {
                                            addToCart(item, 1)
                                            const newCart = getCart()
                                            setCart(newCart)
                                        }}/>
                                        <span className="font-medium">{item.quantity}</span>
                                        <CgChevronUp className="rotate-180 text-2xl cursor-pointer hover:text-gray-900 transition"
                                        onClick={() => {
                                            addToCart(item, -1)
                                            const newCart = getCart()
                                            setCart(newCart)
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
            <div className="w-full lg:w-[50%] h-[120px] rounded-xl overflow-hidden shadow-2xl my-1 flex items-center px-6 bg-accent justify-between">
                <Link
                    to="/checkout"
                    className="self center ml-4 px-6 py-3 rounded bg-secondary italic text-primary font-bold border-2 border-secondary hover:bg-secondary/90 transition shadow"
                    state={cart}>
                        Checkout
                </Link>
                <span className="italic text-primary font-bold text-sm text-right lg:text-2xl mr-5 shadow-2xl">
                    Total = LKR {getCartTotal().toLocaleString()}
                </span>
            </div>
        </div>
    )
}