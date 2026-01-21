import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import ViewOrderInfo from "../../components/viewOrderInfo";

export default function AdminOrdersPage() {

    const [orders, setOrders] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
    if (!loaded) {
        axios.get("http://localhost:3000/api/orders", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                setOrders(response.data);
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
                            <th className="p-4">Order ID</th>
                            <th className="p-4">Customer Email</th>
                            <th className="p-4">Customer Name</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Total Amount</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order, index) => (
                            <tr
                                key={index}
                                className="hover:bg-accent/10 transition-all border-b border-secondary/10"
                            >
                                <td className="p-4">
                                    {order.orderId}
                                </td>
                                <td className="p-4">
                                    {order.email}
                                </td>
                                <td className="p-4">
                                    {order.name}
                                </td>
                                <td className="p-4">
                                    {new Date(order.date).toLocaleDateString()}
                                </td>
                                <td className="p-4">
                                    {order.status}
                                </td>
                                <td className="p-4">
                                    LKR {order.total.toLocaleString()}
                                </td>
                                <td className="p-4">
                                    <ViewOrderInfo order={order}/>
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