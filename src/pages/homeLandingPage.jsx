import { Link } from "react-router-dom";

export default function HomeLandingPage() {
    return (
        <div className="w-full min-h-[calc(100vh-100px)] 
                        bg-[url(/login.jpg)] bg-cover bg-center bg-no-repeat
                        flex flex-col lg:flex-row">

            {/* LEFT SECTION */}
            <div className="w-full lg:w-1/2 min-h-[50vh] lg:min-h-full
                            flex flex-col justify-center items-center
                            bg-black/50 px-6 text-center">

                <img
                    src="/logo.png"
                    alt="iComputers Logo"
                    className="w-[140px] sm:w-[180px] mb-6 drop-shadow-2xl"
                />

                <h1 className="text-4xl sm:text-5xl lg:text-6xl
                               font-extrabold text-accent tracking-wide">
                    iComputers
                </h1>

                <p className="text-primary text-sm sm:text-base italic mt-2">
                    (Pvt.) Ltd.
                </p>

                <p className="mt-6 text-lg sm:text-xl lg:text-2xl
                              text-primary font-semibold italic max-w-xl">
                    Plug In. Power Up. Perform.
                </p>

                <p className="mt-4 text-primary/80 max-w-xl text-sm sm:text-base">
                    Sri Lanka’s growing online destination for computers, laptops,
                    mobile phones and accessories.
                </p>

                {/* CTA Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Link
                        to="/products"
                        className="px-8 py-3 rounded-lg bg-accent text-black
                                   font-bold hover:bg-accent/80 transition shadow-lg text-center"
                    >
                        Browse Products
                    </Link>

                    <Link
                        to="/login"
                        className="px-8 py-3 rounded-lg border-2 border-accent
                                   text-accent font-bold hover:bg-accent hover:text-black
                                   transition shadow-lg text-center"
                    >
                        Login / Register
                    </Link>
                </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="w-full lg:w-1/2 min-h-[50vh] lg:min-h-full
                            flex justify-center items-center p-6">

                <div className="w-full max-w-lg backdrop-blur
                                bg-white/10 rounded-2xl shadow-2xl
                                p-6 sm:p-8 text-primary">

                    <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-accent">
                        Why iComputers?
                    </h2>

                    <ul className="space-y-3 text-sm sm:text-base">
                        <li>🚀 Modern & fast online shopping experience</li>
                        <li>🖥️ Computers, laptops, mobiles & accessories</li>
                        <li>🔐 Secure authentication & checkout</li>
                        <li>📦 Smart cart & order tracking</li>
                        <li>⚙️ Built with scalable modern technologies</li>
                    </ul>

                    <p className="mt-6 text-xs sm:text-sm italic text-primary/70">
                        * Website is currently under development — base functionality implemented.
                    </p>
                </div>
            </div>
        </div>
    );
}