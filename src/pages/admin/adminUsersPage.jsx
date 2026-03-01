import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsPlus } from "react-icons/bs";
import { Link } from "react-router-dom";
import Loader from "../../components/loader";
import { MdVerifiedUser } from "react-icons/md";

export default function AdminUsersPage() {

    const [users, setUsers] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/user/all",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                })
                .then((response) => {
                    setUsers(response.data);
                    console.log(response.data);
                    setLoaded(true);
                });
        }
    }, [loaded]);


    return (
        <div className="w-full max-h-full flex justify-center p-10 relative bg-primary text-text">

            <div className="w-full overflow-x-auto shadow-lg rounded-xl bg-white">
                {loaded ? (
                    <table className="w-full max-h-full text-left border-collapse">
                        <thead className="bg-secondary sticky top-0 border-b border-secondary/20">
                            <tr className="text-primary">
                                <th className="p-4">Image</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">First Name</th>
                                <th className="p-4">Last Name</th>
                                <th className="p-4">Role</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((item, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-accent/10 transition-all border-b border-secondary/10"
                                >
                                    <td className="p-4">
                                        <img
                                            src={item.image}
                                            className="w-12 h-12 object-cover rounded-lg border border-secondary/20"
                                        />
                                    </td>

                                    <td className="p-4 flex flex-row">
                                        {item.email} {item.isEmailVerified ? <MdVerifiedUser className="text-green-500 mt-1 ml-2" /> : ""}
                                    </td>

                                    <td className="p-4 text-secondary font-semibold">
                                        {item.firstName}
                                    </td>

                                    <td className="p-4 text-secondary font-semibold">
                                        {item.lastName}
                                    </td>

                                    <td className="p-4">
                                        {item.role}
                                    </td>

                                    <td className="p-4">
                                        {item.status}
                                    </td>

                                    <td className="p-4 flex items-center">
                                        <button
                                            className={`w-[120px] text-primary flex justify-center items-center p-2 rounded-lg cursor-pointer transition-all
                                                ${item.isBlocked
                                                    ? "bg-green-500 hover:bg-green-600"
                                                    : "bg-red-500 hover:bg-red-600"
                                                }
                                                    `}
                                            onClick={
                                                async () => {
                                                    await axios.put(import.meta.env.VITE_BACKEND_URL + `/api/user/toggle-block/${item.email}`, {
                                                        isBlocked: !item.isBlocked
                                                    },
                                                        {
                                                            headers: {
                                                                Authorization: `Bearer ${localStorage.getItem("token")}`
                                                            }
                                                        });
                                                    setLoaded(false);
                                                }
                                            }
                                        >
                                            {
                                                item.isBlocked ? "Unblock User" : "Block User"
                                            }

                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <Loader />
                )}
            </div>
        </div>
    );

}