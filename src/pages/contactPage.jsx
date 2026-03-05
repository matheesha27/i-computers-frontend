import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function ContactPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    async function submitForm(e) {
        e.preventDefault();

        if (!name || !email || !message) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            const res = await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/api/support/send-support-message",
                {
                    senderEmail: email,
                    senderName: name,
                    senderMessage: message
                }
            );

            console.log(res);
            toast.success("Message sent successfully!");

        } catch (error) {
            toast.error("Message sending failed!");
            console.log(error);
        }

        setName("");
        setEmail("");
        setMessage("");
    }

    return (
        <div className="w-full min-h-[calc(100vh-100px)] bg-[url(/login.jpg)] bg-center bg-cover bg-no-repeat flex flex-col lg:flex-row">

            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 lg:px-10 py-10 bg-black/40 text-center">

                <img
                    src="/logo.png"
                    alt="logo"
                    className="w-[120px] h-[120px] lg:w-[180px] lg:h-[180px] object-contain mb-6"
                />

                <h1 className="text-3xl lg:text-5xl font-semibold text-accent mb-4">
                    Contact Us
                </h1>

                <p className="text-lg lg:text-2xl text-gray-100 italic max-w-xl">
                    Have questions? Need help choosing the right tech?
                    We’re here to help.
                </p>

                <div className="mt-8 text-gray-200 text-base lg:text-lg space-y-2">
                    <p>📍 Colombo, Sri Lanka</p>
                    <p>📞 +94 77 539 9695</p>
                    <p>✉️ matheesha27@gmail.com</p>
                </div>

            </div>

            <div className="w-full lg:w-1/2 flex justify-center items-center px-4 py-10">

                <form
                    onSubmit={submitForm}
                    className="w-full max-w-md backdrop-blur-md bg-white/10 shadow-2xl
                               rounded-2xl p-8 flex flex-col items-center"
                >

                    <h2 className="text-2xl lg:text-3xl font-light text-primary mb-6 text-center">
                        Send Us a Message
                    </h2>

                    <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-[50px] mb-4 rounded-lg border border-accent
                                   p-3 text-lg text-primary placeholder:text-primary/70
                                   focus:outline-none focus:ring-2 focus:ring-accent"
                    />

                    <input
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-[50px] mb-4 rounded-lg border border-accent
                                   p-3 text-lg text-primary placeholder:text-primary/70
                                   focus:outline-none focus:ring-2 focus:ring-accent"
                    />

                    <textarea
                        rows="5"
                        placeholder="Your message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full mb-6 rounded-lg border border-accent
                                   p-3 text-lg text-primary placeholder:text-primary/70
                                   focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                    />

                    <button
                        type="submit"
                        className="w-full h-[50px] rounded-lg bg-accent text-black
                                   font-bold text-lg border border-accent
                                   hover:bg-transparent hover:text-primary
                                   transition-all duration-200 cursor-pointer"
                    >
                        Send Message
                    </button>

                </form>
            </div>
        </div>
    );
}