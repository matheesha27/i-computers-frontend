import { Link } from "react-router-dom";
import UserData from "./userData";
import { BiShoppingBag } from "react-icons/bi";
import { CiMenuBurger } from "react-icons/ci";
import { useState } from "react";
import { LuListCollapse } from "react-icons/lu";

export default function Header() {

    const [sideBarOpen, setSideBarOpen] = useState(false);

    return(
        <header className="w-full h-[100px] bg-secondary flex relative">
            <LuListCollapse onClick={() => {setSideBarOpen(true)}} className="text-white my-auto text-3xl ml-6 lg:hidden z-10"/>
            <img src="/logo.png" className="h-full" alt="logo"/>
            <div className="w-full h-full hidden lg:flex justify-center items-center gap-[40px] text-primary text-xl">
                <Link to="/" className="hover:text-accent">Home</Link>
                <Link to="/products" className="hover:text-accent">Products</Link>
                <Link to="/about" className="hover:text-accent">About</Link>
                <Link to="/contact" className="hover:text-accent">Contact Us</Link>
            </div>
            <Link to="cart" className="absolute right-4 top-1/2 translate-y-1/2 text-primary text-2xl">
                <BiShoppingBag/>
            </Link>
            {sideBarOpen&&<div className="fixed w-[100vw] h-screen top-0 left-0 bg-black/40 z-20 transition-all duration-300">
                <div className="w-[250px] h-screen flex flex-col relative">
                    <div className="absolute w-full h-full bg-secondary/90 left-[-250px] transform-flat translate-x-[250px] transition-transform duration-700 flex flex-col">
                        <div className="w-full h-[100px] bg-secondary flex justify-center items-center">
                            <img src="/logo.png" className="h-full" alt="logo"/>
                            <LuListCollapse onClick={() => {setSideBarOpen(false)}} className="text-white my-auto text-2xl ml-6 lg:hidden rotate-180"/>
                        </div>
                        <div className="w-full h-full flex flex-col text-xl text-primary justify-start items-start">
                            <a href="/" onClick={() => {setSideBarOpen(false)}} className="w-full px-4 py-4 hover:bg-secondary transition">Home</a>
                            <a href="/products" onClick={() => {setSideBarOpen(false)}} className="w-full px-4 py-4 hover:bg-secondary transition">Products</a>
                            <a href="/about" onClick={() => {setSideBarOpen(false)}} className="w-full px-4 py-4 hover:bg-secondary transition">About</a>
                            <a href="/contact" onClick={() => {setSideBarOpen(false)}} className="w-full px-4 py-4 hover:bg-secondary transition">Contact</a>
                        </div>
                    </div>
                </div>
            </div>}
        </header>
    )
}