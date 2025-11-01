import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    async function login() {
        console.log("Login button clicked")
        console.log(import.meta.env.VITE_BACKEND_URL + "/user/login")

        //check adding the URL part into .env
        try {
            const res = await axios.post("http://localhost:3000/api/user/login", {
                email: email,
                password: password
            })
            console.log(res)

            // Navigating
            if (res.data.role == "admin") {
                // window.location.href = "/admin"
                navigate("/admin")
            } else {
                // window.location.href = "/"
                navigate("/")
            }

            toast.success("Login Successfull! Welcome back!")

        } catch(error) {
            toast.error("Login Failed! Please check your credentials and try again.")
            console.log("Login error: ")
            console.log(error)
        }

    }

    return(
        <div className="w-full h-screen bg-[url(/login.jpg)] bg-center bg-cover bg-no-repeat flex">
            <div className="w-[50%] h-full flex flex-col justify-center items-center"> {/*Left half*/}
                <img src="logo.png" alt="logo" className="w-[200px] h-[200px] object-cover"/>
                <h1 className="text-5xl font-semibold text-accent shadow-4xl">
                    Plug In. Power Up. Plugin.
                </h1>
                <p className="text-[30px] text-[#F9FAFB] font-semibold italic m-[30px]">
                    Your Ultimate Destination for Computers
                </p>
            </div>

            <div className="w-[50%] h-full flex justify-center items-center"> {/*Right half*/}
                <div className="w-[450px] h-[600px] backdrop-blur shadow-2xl rounded-xl flex flex-col justify-center items-center"> {/*Blured area*/}
                    <h1 className="text-[40px] font-light text-primary text-shadow-amber-600 text-shadow-[5px]">
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
                    <button
                        onClick={login}
                        className="w-[80%] h-[50px] mt-[20px] rounded-lg border bg-accent border-accent p-[10px] text-[20px] text-black font-bold focus:outline-none focus:ring-2 focus:ring-accent hover:bg-transparent hover:text-primary">
                            Login
                    </button>
                    <p
                        className="w-full mr-[20%] text-primary text-right not-italic">
                            Forgot password?
                            <Link to="/register" className="text-accent italic">
                                Reset here
                            </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}