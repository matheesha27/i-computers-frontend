import { Link, NavLink } from "react-router-dom";
import { BiShoppingBag } from "react-icons/bi";
import { LuListCollapse } from "react-icons/lu";
import { useState } from "react";
import UserData from "./userData";

export default function Header() {

    const [sideBarOpen, setSideBarOpen] = useState(false);

    const navLinkClass = ({ isActive }) =>
        `relative px-2 py-1 transition
         ${isActive ? "text-accent after:w-full" : "text-primary after:w-0"}
         after:absolute after:left-0 after:-bottom-1 after:h-[2px]
         after:bg-accent after:transition-all after:duration-300`;

    return (
        <header className="w-full h-[100px] bg-secondary shadow-lg sticky top-0 z-30">
            <div className="max-w-7xl mx-auto h-full flex items-center px-6 relative">

                {/* Mobile Menu Icon */}
                <LuListCollapse
                    onClick={() => setSideBarOpen(true)}
                    className="text-primary text-3xl mr-4 lg:hidden cursor-pointer hover:text-accent transition"
                />

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <img
                        src="/logo.png"
                        className="h-[70px] object-contain"
                        alt="iComputers logo"
                    />
                    <div className="hidden sm:block">
                        <p className="text-primary font-bold text-lg leading-none">
                            iComputers
                        </p>
                        <span className="text-xs text-primary/70">
                            (Pvt.) Ltd.
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex flex-1 justify-center items-center gap-10 text-lg">
                    <NavLink to="/" className={navLinkClass}>Home</NavLink>
                    <NavLink to="/products" className={navLinkClass}>Products</NavLink>
                    <NavLink to="/about" className={navLinkClass}>About</NavLink>
                    <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
                </nav>

                {/* Right Icons */}
                <div className="flex items-center gap-6 ml-auto">
                    <UserData />

                    <Link
                        to="/cart"
                        className="relative text-primary text-2xl ml-4 hover:text-accent transition"
                    >
                        <BiShoppingBag />
                    </Link>
                </div>
            </div>

            {/* Mobile Sidebar */}
            {sideBarOpen && (
                <div className="fixed inset-0 bg-black/40 z-40">
                    <div className="w-[260px] h-full bg-secondary shadow-2xl
                                    transform translate-x-0 transition-transform duration-500">

                        {/* Sidebar Header */}
                        <div className="h-[100px] flex items-center px-4 border-b border-primary/10">
                            <img src="/logo.png" className="h-[70px]" alt="logo" />
                            <LuListCollapse
                                onClick={() => setSideBarOpen(false)}
                                className="text-primary text-2xl ml-auto rotate-180 cursor-pointer"
                            />
                        </div>

                        {/* Sidebar Links */}
                        <div className="flex flex-col text-lg text-primary">
                            {[
                                { to: "/", label: "Home" },
                                { to: "/products", label: "Products" },
                                { to: "/about", label: "About" },
                                { to: "/contact", label: "Contact" },
                            ].map(({ to, label }) => (
                                <Link
                                    key={label}
                                    to={to}
                                    onClick={() => setSideBarOpen(false)}
                                    className="px-6 py-4 hover:bg-accent/20 hover:text-accent transition"
                                >
                                    {label}
                                </Link>
                            ))}

                            <div className="mt-auto p-4 border-t border-primary/10">
                                <UserData />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}