import { Link } from "react-router-dom";
import UserData from "./userData";
import { BiShoppingBag } from "react-icons/bi";

export default function Header() {

    return(
        <header className="w-full h-[100px] bg-secondary flex relative">
            <img src="/logo.png" className="h-full" alt="logo"/>
            <div className="w-full h-full flex justify-center items-center gap-[40px] text-primary text-xl">
                <Link to="/" className="hover:text-accent">Home</Link>
                <Link to="/products" className="hover:text-accent">Products</Link>
                <Link to="/about" className="hover:text-accent">About</Link>
                <Link to="/contact" className="hover:text-accent">Contact Us</Link>
            </div>
            <Link to="cart" className="absolute right-4 top-1/2 translate-y-1/2 text-primary text-2xl">
                <BiShoppingBag/>
            </Link>
        </header>
    )
}