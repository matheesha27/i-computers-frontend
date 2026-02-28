import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import Loader from "../components/loader";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {

    const [otpSent, setOtpSent] = useState(false);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    async function sendOtp() {
        setLoading(true);
        console.log(import.meta.env.VITE_BACKEND_URL);
        try {
            await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/user/send-otp/" + email);
            toast.success("OTP sent to your email");
            setLoading(false);
            setOtpSent(true);

        } catch(error) {
            console.log(error)
            toast.error("Error sending the OTP");
        }
    }

    async function resetPassword() {
        if (newPassword != confirmPassword) {
            toast.error("Passwords do not match");
            return
        }
        setLoading(true);
        try {
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/validate-otp/",
                {
                    email: email,
                    otp: otp,
                    newPassword: newPassword
                }
            );
            toast.success("Passwords reset successfully");
            setLoading(false);
            navigate("/login");
        } catch(error) {
            console.log(error)
            toast.error("Error resetting the password. Try again later.");
            setLoading(false);
        }
    }

    return(
        <div className="w-full h-full flex flex-col justify-center items-center">
            {
                loading && (
                    <Loader/>
                )
            }
            {
                otpSent ?
                    <div className="w-[400px] h-[400px] flex flex-col justify-center items-center bg-accent/10 rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-bold mb-4">Enter OTP and a New Password</h2>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            className="w-full h-[50px] mt-[20px] bg-primary rounded-lg border border-accent p-[10px] text-[15px] text-black font-light placeholder:text-black/80 focus:outline-none focus:ring-2 focus:ring-accent"
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="New Password"
                            className="w-full h-[50px] mt-[20px] bg-primary rounded-lg border border-accent p-[10px] text-[15px] text-black font-light placeholder:text-black/80 focus:outline-none focus:ring-2 focus:ring-accent"
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Confirm Password"
                            className="w-full h-[50px] mt-[20px] bg-primary rounded-lg border border-accent p-[10px] text-[15px] text-black font-light placeholder:text-black/80 focus:outline-none focus:ring-2 focus:ring-accent"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                            onClick={resetPassword}
                            className="w-full h-[50px] mt-[20px] rounded-lg border bg-accent border-accent p-[10px] text-[20px] text-black font-bold focus:outline-none focus:ring-1 focus:ring-accent hover:bg-accent/70 cursor-pointer transition-all duration-200"
                        >
                            Reset Password
                        </button>
                    </div> :
                    <div className="w-[400px] h-[400px] flex flex-col justify-center items-center bg-accent/10 rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full h-[50px] mt-[20px] bg-primary rounded-lg border border-accent p-[10px] text-[15px] text-black font-light placeholder:text-black/80 focus:outline-none focus:ring-2 focus:ring-accent"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            onClick={sendOtp}
                            className="w-full h-[50px] mt-[20px] rounded-lg border bg-accent border-accent p-[10px] text-[20px] text-black font-bold focus:outline-none focus:ring-1 focus:ring-accent hover:bg-accent/70 cursor-pointer transition-all duration-200"
                        >
                            Send OTP
                        </button>
                    </div>
            }
        </div>
    )
}