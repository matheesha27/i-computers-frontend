import { Link } from "react-router-dom";
import UserData from "./userData";

export default function Header() {

    return(
        <header className="w-full h-[100px] bg-secondary flex">
            <img src="/logo.png" className="h-full" alt="logo"/>
            <div className="w-full h-full flex">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact Us</Link>
            </div>
        </header>
    )
}