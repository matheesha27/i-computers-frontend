import { use, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function UserData() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token != null) {
            axios.get("http://localhost:3000/api" + "/user",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            ).then((response) => {
                setUser(response.data);
            }).catch(() => {
                setUser(null);
            })
        }
    }, [])

    const [selectedOption, setSelectedOption] = useState("user")

    return(
        <>
            {
                user ?
                <div className="w-[150px] flex flex-row">
                    <img src={user.image} referrerPolicy="no-referrer" className="w-[50px] h-[50px] rounded-full"/>
                    <select className="bg-transparent outline-none ml-2 mt-2 text-md font-semibold text-primary"
                            onChange={
                                (e) => {
                                    if (e.target.value == "logout") {
                                        localStorage.removeItem("token");
                                        window.location.href = "/login";
                                    } else if (e.target.value == "my-orders") {
                                        window.location.href = "/orders";
                                    }
                                    setSelectedOption("user");
                                }
                            }>
                        <option className="bg-secondary text-sm font-semibold text-primary" defaultValue={true}>{user.firstName}</option>
                        <option className="bg-secondary text-sm font-semibold text-primary" value={"my-orders"}>My Orders</option>
                        <option className="bg-secondary text-sm font-semibold text-primary" value={"logout"}>Logout</option>
                    </select>
                </div> :
                <div className="w-[150px] flex flex-row">
                    <Link to="/login" className="mx-2 px-4 py-2 bg-white text-accent text-sm font-semibold rounded-full">Login</Link>
                    <Link to="/register" className="mx-2 px-4 py-2 bg-white text-accent text-sm font-semibold rounded-full">Register</Link>
                </div>
            }
        </>
    )
}