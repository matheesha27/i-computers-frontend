import { Link } from "react-router-dom";

export default function HomeLandingPage() {
    return (
        <div className="w-full h-[calc(100vh-100px)] bg-[url(/login.jpg)] bg-center bg-cover bg-no-repeat flex">
            
            <div className="w-1/2 h-full flex flex-col justify-center items-center px-10 bg-black/40">
                <img
                    src="/logo.png"
                    alt="logo"
                    className="w-[200px] h-[200px] object-contain mb-6"
                />

                <h1 className="text-5xl font-semibold text-accent text-center mb-4">
                    Plug In. Power Up. Perform.
                </h1>

                <p className="text-2xl text-gray-100 italic text-center max-w-xl">
                    Your ultimate destination for computers, accessories, and
                    high-performance tech.
                </p>
            </div>

            <div className="w-1/2 h-full flex justify-center items-center">
                <div className="w-[420px] backdrop-blur-md bg-white/10 shadow-2xl rounded-2xl p-10 flex flex-col items-center">
                    
                    <h2 className="text-3xl font-light text-primary mb-6">
                        Get Started
                    </h2>

                    <Link
                        to="/products"
                        className="w-full text-center py-3 mb-4 rounded-lg bg-accent text-black font-bold
                                   hover:bg-transparent hover:text-primary border border-accent transition-all"
                    >
                        Browse Products
                    </Link>

                    <Link
                        to="/cart"
                        className="w-full text-center py-3 mb-4 rounded-lg bg-accent text-black font-bold
                                   hover:bg-transparent hover:text-primary border border-accent transition-all"
                    >
                        View Cart
                    </Link>

                    <Link
                        to="/login"
                        className="w-full text-center py-3 rounded-lg border border-primary text-primary
                                   hover:bg-accent hover:text-black transition-all"
                    >
                        Login / Register
                    </Link>

                    <p className="text-gray-300 text-sm mt-6 text-center">
                        Fast delivery • Secure payments • Trusted products
                    </p>
                </div>
            </div>
        </div>
    );
}