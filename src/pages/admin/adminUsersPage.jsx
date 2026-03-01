import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsPlus } from "react-icons/bs";
import { Link } from "react-router-dom";
import Loader from "../../components/loader";

export default function AdminUsersPage() {

    const [users, setUsers] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!loaded) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/user/all",
                {
                    headers: {
                        Authorization:`Bearer ${token}`
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
                            <th className="p-4">Staus</th>
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

                                <td className="p-4">
                                    {item.email}
                                </td>

                                <td className="p-4 text-accent font-semibold">
                                    {item.firstName}
                                </td>

                                <td className="p-4 text-secondary/70">
                                    {item.lastName}
                                </td>

                                <td className="p-4">
                                    {item.role}
                                </td>

                                <td className="p-4">
                                    {item.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <Loader />
            )}
        </div>

        {/* Floating Add Button */}
        <Link
            to="/admin/add-product"
            className="fixed right-6 bottom-6 w-[55px] h-[55px] flex justify-center items-center 
                      text-5xl rounded-full border-2 border-secondary
                      text-secondary bg-primary shadow-xl
                      hover:bg-secondary hover:text-primary transition-all"
        >
            <BsPlus />
        </Link>
    </div>
);

}