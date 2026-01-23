import { Link, Route, Routes } from "react-router-dom";
import { LuClipboardList } from "react-icons/lu";
import { LuBoxes } from "react-icons/lu";
import { TbUsers } from "react-icons/tb";
import { MdOutlineRateReview } from "react-icons/md";
import AdminProductsPage from "./admin/adminProductsPage";
import AdminAddProductPage from "./admin/adminAddProductPage";
import AdminUpdateProductPage from "./admin/adminUpdateProductPage";
import AdminOrdersPage from "./admin/adminOrdersPage";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/loader";

export default function AdminPage() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token == null) {
            window.location.href = "/login";
            return
        }
        axios.get("http://localhost:3000/api" + "/user",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        ).then((response) => {
            console.log(response.data);
            if (response.data.role == "admin") {
                setUser(response.data);
            } else {
                window.location.href = "/"
            }
        }).catch(() => {
            window.location.href = "/"
        })
    }, [])

    return(
        <div className="w-full h-full flex bg-secondary">
            {user ? 
            <>
                <div className="w-[300px] h-full bg-secondary text-primary"> {/* Sidebar */}
                    {/* <h1>Admin Panel</h1> */}
                    <div className="w-full h-[100px] flex items-center text-2xl"> {/* Sidebar-topLogoDiv */}
                        <img src="logo.png" className="h-full"/>
                        <h1>Admin</h1>
                    </div>
                    <div className="w-full h-[400px] text-primary text-xl flex flex-col gap-[10px] pl-[20px] pt-[20px]"> {/* Sidebar-bottomMenuDiv */}
                        <Link to="/admin" className="hover:text-accent w-full h-[40px] gap-[10px] flex items-center"><LuClipboardList />Orders</Link>
                        <Link to="/admin/products" className="hover:text-accent w-full h-[40px] gap-[10px] flex items-center"><LuBoxes />Products</Link>
                        <Link to="/admin/users" className="hover:text-accent w-full h-[40px] gap-[10px] flex items-center"><TbUsers />Users</Link>
                        <Link to="/admin/reviews" className="hover:text-accent w-full h-[40px] gap-[10px] flex items-center"><MdOutlineRateReview />Reviews</Link>
                    </div>
                </div>

                <div className="w-[calc(100%-300px)] h-full max-h-full bg-primary border-[8px] rounded-3xl overflow-y-scroll border-secondary"> {/* Right section - Body*/}
                    <Routes>
                        <Route path="/" element={<AdminOrdersPage/>}/>
                        <Route path="/products" element={<AdminProductsPage/>}/>
                        <Route path="/add-product" element={<AdminAddProductPage/>}/>
                        <Route path="/update-product" element={<AdminUpdateProductPage/>}/>
                        <Route path="/users" element={<h1>User Details</h1>}/>
                        <Route path="/reviews" element={<h1>Reviews Posted</h1>}/>
                    </Routes>
                </div>
            </> : <Loader/>
}
        </div>
    )
}