import { Link } from "react-router-dom";
import UserData from "./userData";

export default function Header() {

    return(
        <header className="w-full h-[100px] bg-secondary flex">
            <img src="/logo.png" className="h-full" alt="logo"/>
            <div className="w-full h-full flex justify-center items-center gap-[40px] text-primary text-xl">
                <Link to="/" className="hover:text-accent">Home</Link>
                <Link to="/products" className="hover:text-accent">Products</Link>
                <Link to="/about" className="hover:text-accent">About</Link>
                <Link to="/contact" className="hover:text-accent">Contact Us</Link>
            </div>
        </header>
    )
}