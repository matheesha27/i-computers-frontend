import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/loader";

export default function RegisterPage() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState();
    const navigate = useNavigate();

    async function register() {

        if (firstName.trim() == "") {
            toast.error("First Name is required");
            return
        }
        if (lastName.trim() == "") {
            toast.error("Last Name is required");
            return
        }
        if (email.trim() == "") {
            toast.error("Email is required");
            return
        }
        if (password.trim() == "") {
            toast.error("Password is required");
            return
        }
        if (password != confirmPassword) {
            toast.error("Passwords do not match");
            return
        }

        console.log("Sign Up button clicked")

        setIsLoading(true);

        //check adding the URL part into .env
        try {
            const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/", {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim(),
                password: password.trim()
            })
            console.log(res)

            toast.success("Sign Up successfull! Explore!")
            navigate("/login");
            setIsLoading(false);
        } catch(error) {
            toast.error("Sign Up Failed!")
            console.log("Sign Up error: " + error)
        }

    }

    return(
        <div className="w-full h-screen bg-[url(/login.jpg)] bg-center bg-cover bg-no-repeat flex">
            <div className="w-[50%] h-full flex flex-col justify-center items-center"> {/*Left half*/}
                <img src="logo.png" alt="logo" className="w-[200px] h-[200px] object-cover"/>
                <h1 className="text-5xl font-semibold text-accent shadow-4xl">
                    Plug In. Power Up. Plugin.
                </h1>
                <p className="text-[28px] text-[#F9FAFB] font-semibold italic m-[30px]">
                    Your Ultimate Destination for Computers
                </p>
            </div>

            <div className="w-[50%] h-full flex justify-center items-center"> {/*Right half*/}
                <div className="w-[450px] h-[600px] backdrop-blur shadow-2xl rounded-xl flex flex-col justify-center items-center"> {/*Blured area*/}
                    <h1 className="text-3xl font-light text-primary text-shadow-amber-600 text-shadow-[5px]">
                        Register
                    </h1>
                    <input
                        onChange={
                            (e) =>{
                                setFirstName(e.target.value)
                            }
                        }
                        type="text"
                        placeholder="First Name"
                        className="w-[80%] h-[50px] mt-[20px] rounded-lg border border-accent p-[10px] text-[20px] text-primary font-light placeholder:text-primary/80 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <input
                        onChange={
                            (e) =>{
                                setLastName(e.target.value)
                            }
                        }
                        type="text"
                        placeholder="Last Name"
                        className="w-[80%] h-[50px] mt-[20px] rounded-lg border border-accent p-[10px] text-[20px] text-primary font-light placeholder:text-primary/80 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <input
                        onChange={
                            (e) =>{
                                setEmail(e.target.value)
                            }
                        }
                        type="email"
                        placeholder="Email"
                        className="w-[80%] h-[50px] mt-[20px] rounded-lg border border-accent p-[10px] text-[20px] text-primary font-light placeholder:text-primary/80 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <input
                        onChange={
                            (e) => {
                                setPassword(e.target.value)
                            }
                        }
                        type="password"
                        placeholder="Password"
                        className="w-[80%] h-[50px] mt-[20px] rounded-lg border border-accent p-[10px] text-[20px] text-primary font-light placeholder:text-primary/80 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <input
                        onChange={
                            (e) => {
                                setConfirmPassword(e.target.value)
                            }
                        }
                        type="password"
                        placeholder="Confirm Password"
                        className="w-[80%] h-[50px] mt-[20px] rounded-lg border border-accent p-[10px] text-[20px] text-primary font-light placeholder:text-primary/80 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <button
                        onClick={register}
                        className="w-[80%] h-[50px] mt-[20px] rounded-lg border bg-accent border-accent p-[10px] text-[20px] text-black font-bold focus:outline-none focus:ring-2 focus:ring-accent hover:bg-transparent hover:text-primary transition-all duration-300 cursor-pointer">
                            Sign Up
                    </button>
                    <p
                        className="w-full mr-[20%] text-primary text-right not-italic mt-2">
                            Already have an account?
                            <Link to="/login" className="text-accent italic font-semibold">
                                Sign In
                            </Link>
                    </p>
                </div>
            </div>
            {isLoading && <Loader/>}
        </div>
    )
}