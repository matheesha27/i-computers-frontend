import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { GrGoogle } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/loader";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const googleLogin = useGoogleLogin({
        onSuccess: (response) => {
            console.log(response);
            setIsLoading(true);
            axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/google-login", {
                token: response.access_token,
            }).then((res) => {
                localStorage.setItem("token", res.data.token);
                if (res.data.role == "admin") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
                console.log("Google Access Token sent")
                toast.success("Login successfull!");
                setIsLoading(false);
            }).catch((error) => {
                console.log(error)
            });
            setIsLoading(false);
        },
        onError: () => {toast.error("Google login failed!")},
        onNonOAuthError: () => {toast.error("Authorization error. Google login failed!")}
    });

    async function login() {

        console.log("Login button clicked")
        setIsLoading(true);

        //check adding the URL part into .env
        try {
            const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/login", {
                email: email,
                password: password
            })
            console.log(res)

            localStorage.setItem("token", res.data.token)

            const token = localStorage.getItem("token")

            // Navigating
            if (res.data.role == "admin") {
                // window.location.href = "/admin"
                navigate("/admin")
            } else {
                // window.location.href = "/"
                navigate("/")
            }
            toast.success("Login Successfull! Welcome!")
            setIsLoading(false);
        } catch(error) {
            toast.error("Login Failed! Please check your credentials and try again.")
            console.log("Login error: " + error)
            setIsLoading(false);
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
                        Login
                    </h1>
                    <input
                        onChange={
                            (e) =>{
                                // console.log(e.target.value)
                                setEmail(e.target.value)
                            }
                        }
                        type="email"
                        placeholder="Your email"
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
                    <p
                        className="w-full mr-[20%] text-primary text-right not-italic mt-2">
                            Forgot your password?
                            <Link to="/forgot-password" className="text-accent italic font-semibold">
                                Reset password
                            </Link>
                    </p>
                    <button
                        onClick={login}
                        className="w-[80%] h-[50px] mt-[20px] rounded-lg border bg-accent border-accent p-[10px] text-[20px] text-black font-bold focus:outline-none focus:ring-2 focus:ring-accent hover:bg-transparent hover:text-primary cursor-pointer transition-all duration-200">
                            Login
                    </button>
                    <button
                        onClick={googleLogin}
                        className="w-[80%] h-[50px] mt-[20px] rounded-lg border bg-accent border-accent p-[10px] text-[20px] text-black font-bold focus:outline-none focus:ring-2 focus:ring-accent hover:bg-transparent hover:text-primary cursor-pointer transition-all duration-200">
                            Login with <GrGoogle className="inline ml-2 mb-1"/>
                    </button>
                    <p
                        className="w-full mr-[20%] text-primary text-right not-italic mt-2">
                            Don't have an account?
                            <Link to="/register" className="text-accent italic font-semibold">
                                Sign Up here
                            </Link>
                    </p>
                </div>
            </div>
            {isLoading && <Loader/>}
        </div>
    )
}