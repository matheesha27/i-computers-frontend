import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function AboutPage() {
    
    const [slide, setSlide] = useState(0);

    return (
        <div className="w-full h-[calc(100vh-100px)] bg-[url(/login.jpg)] bg-center bg-cover bg-no-repeat flex">

            <div className="w-1/2 h-full flex flex-col justify-center items-center px-10 bg-black/40 relative">
                <img
                    src="/logo.png"
                    alt="logo"
                    className="w-[180px] h-[180px] object-contain mb-6"
                />

                <h1 className="text-5xl font-semibold text-accent mb-4 text-center">
                    {slide === 0 ? "About iComputers (Pvt.) Ltd." : "About the Developer"}
                </h1>

                <div className="mt-8 text-gray-200 text-lg space-y-2 text-center">
                    <p>📍 Colombo, Sri Lanka</p>
                    <p>📞 +94 77 539 9695</p>
                    <p>✉️ matheesha27@gmail.com</p>
                </div>
            </div>

            <div className="w-1/2 h-full flex justify-center items-center p-6 backdrop-blur-xs relative overflow-hidden">
                <div
                    className="flex w-full transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${slide * 100}%)` }}
                >
                    <div className="min-w-full">
                        <div className="text-lg text-primary font-light bg-white/10 p-6 shadow-2xl rounded-xl">
                            <p className="mb-4">
                                iComputers (Pvt.) Ltd. is a modern online technology marketplace created
                                to deliver reliable and up-to-date computing solutions to customers
                                across Sri Lanka.
                            </p>

                            <p className="mb-4">
                                The platform focuses on offering computers, laptops, mobile phones,
                                and a wide range of accessories through a convenient and user-friendly
                                online experience.
                            </p>

                            <p>
                                This website is currently in its development stage and represents the
                                base functionality of the platform. More features and enhancements
                                will be introduced in future updates.
                            </p>
                        </div>
                    </div>

                    <div className="min-w-full">
                        <div className="text-lg text-primary font-light bg-white/10 p-6 shadow-2xl rounded-xl">
                            <p className="mb-4">
                                This platform was designed and developed entirely from scratch by
                                <span className="font-semibold text-accent shadow-2xl"> Matheesha Abeysekera</span>,
                                a Software and Telecommunication Engineering professional.
                            </p>

                            <p className="mb-4">
                                From frontend UI/UX design to backend APIs, authentication, database
                                integration, and deployment logic, every component of this system was
                                carefully engineered.
                            </p>

                            <p>
                                This project serves as both a functional e-commerce platform and a
                                foundation for future scalability, performance optimization, and
                                feature expansion.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Left Arrow */}
                {slide > 0 && (
                    <button
                        onClick={() => setSlide(slide - 1)}
                        className="absolute left-4 text-3xl text-accent hover:scale-110 transition"
                    >
                        <FaChevronLeft />
                    </button>
                )}

                {/* Right Arrow */}
                {slide < 1 && (
                    <button
                        onClick={() => setSlide(slide + 1)}
                        className="absolute right-4 text-3xl text-accent hover:scale-110 transition"
                    >
                        <FaChevronRight />
                    </button>
                )}
            </div>
        </div>
    );
}