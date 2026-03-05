import axios from "axios";
import { useState } from "react";
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
        try {
            await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/user/send-otp/" + email);
            toast.success("OTP sent to your email");
            setOtpSent(true);
        } catch (error) {
            console.log(error);
            toast.error("Error sending the OTP");
        } finally {
            setLoading(false);
        }
    }

    async function resetPassword() {
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/validate-otp/", {
                email,
                otp,
                newPassword
            });

            toast.success("Password reset successfully");
            navigate("/login");

        } catch (error) {
            console.log(error);
            toast.error("Error resetting password");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full min-h-screen flex justify-center items-center px-4">

            {loading && <Loader />}

            <div className="w-full max-w-md bg-accent/10 rounded-xl shadow-lg p-6 sm:p-8 flex flex-col">

                {otpSent ? (
                    <>
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
                            Enter OTP & New Password
                        </h2>

                        <input
                            type="text"
                            placeholder="Enter OTP"
                            className="w-full h-12 mt-3 bg-primary rounded-lg border border-accent px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                            onChange={(e) => setOtp(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="New Password"
                            className="w-full h-12 mt-3 bg-primary rounded-lg border border-accent px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                            onChange={(e) => setNewPassword(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full h-12 mt-3 bg-primary rounded-lg border border-accent px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <button
                            onClick={resetPassword}
                            className="w-full h-12 mt-5 rounded-lg bg-accent text-black font-semibold hover:bg-accent/80 transition"
                        >
                            Reset Password
                        </button>
                    </>
                ) : (
                    <>
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
                            Reset Your Password
                        </h2>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full h-12 mt-3 bg-primary rounded-lg border border-accent px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <button
                            onClick={sendOtp}
                            className="w-full h-12 mt-5 rounded-lg bg-accent text-black font-semibold hover:bg-accent/80 transition"
                        >
                            Send OTP
                        </button>
                    </>
                )}

            </div>
        </div>
    );
}