import { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import toast from "react-hot-toast";

export default function ViewOrderInfo({ order, onStatusUpdated }) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(order.status);
    const [currentStatus, setCurrentStatus] = useState(order.status);

    async function updateOrderStatus() {
        try {
            const token = localStorage.getItem("token");

            await axios.put(
                `http://localhost:3000/api/orders/${order.orderId}/status`,
                { status: selectedStatus },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Order status updated");
            setCurrentStatus(selectedStatus);
            onStatusUpdated(order.orderId, selectedStatus);

        } catch (error) {
            toast.error("Failed to update order status");
        }
    }

    return (
        <>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                overlayClassName="fixed inset-0 bg-black/40 flex items-center justify-center p-4"
                className="bg-white rounded-2xl shadow-2xl outline-none flex flex-col w-full max-w-3xl"
                style={{
                    content: {
                        maxHeight: "90vh",
                        inset: "auto",
                    },
                }}
            >
                <div className="pb-4 border-b px-6 pt-6">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Order Details
                        </h2>
                        <button
                            className="text-gray-500 hover:text-gray-800 text-xl"
                            onClick={() => setIsModalOpen(false)}
                        >
                            ✕
                        </button>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto py-4 pr-2 px-6">
                    {/* Order Info */}
                    <div className="space-y-3 text-gray-700">
                        <div className="flex justify-between">
                            <span className="font-medium">Order ID</span>
                            <span>{order.orderId}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-medium">Customer Email</span>
                            <span>{order.email}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-medium">Customer Name</span>
                            <span>{order.name}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-medium">Date</span>
                            <span>
                                {new Date(order.date).toLocaleDateString()}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-medium">Contact</span>
                            <span>{order.phone}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-medium">Delivery Address</span>
                            <span>{order.address}</span>
                        </div>

                        {/* Notes */}
                        {order.notes && (
                            <div className="mb-6">
                                <h3 className="font-semibold mb-2">Notes</h3>
                                <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200 text-sm text-gray-700">
                                    {order.notes}
                                </div>
                            </div>
                        )}


                        <div className="flex justify-between items-center">
                            <span className="font-medium">Status</span>
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-semibold transition
                                    ${currentStatus === "COMPLETED"
                                        ? "bg-green-100 text-green-700"
                                        : currentStatus === "PENDING"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : currentStatus === "PROCESSING"
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {currentStatus}
                            </span>
                        </div>


                        <div className="flex justify-between border-t pt-3 mt-3">
                            <span className="font-semibold text-lg">Total Amount</span>
                            <span className="font-bold text-lg text-accent">
                                LKR {order.total.toLocaleString()}
                            </span>
                        </div>
                    </div>
                    
                    {/* Ordered Items */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                            Ordered Items
                        </h3>

                        <div className="space-y-3 max-h-[260px] overflow-y-auto pr-2">
                            {order.items.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 p-3 rounded-lg border
                                            bg-gray-50 hover:bg-gray-100 transition"
                                >
                                    {/* Product Image */}
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-14 h-14 object-cover rounded-md"
                                    />

                                    {/* Product Info */}
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-800 truncate">
                                            {item.name}
                                        </p>
                                        <p className="italic text-sm text-gray-500">
                                            Product ID: {item.productId}
                                        </p>
                                    </div>

                                    {/* Quantity */}
                                    <div className="text-center min-w-[60px]">
                                        <p className="text-sm text-gray-500">Qty</p>
                                        <p className="font-semibold">{item.quantity}</p>
                                    </div>

                                    {/* Price */}
                                    <div className="text-right min-w-[90px]">
                                        <p className="text-sm text-gray-500">Total</p>
                                        <p className="font-semibold text-accent">
                                            LKR {(item.price * item.quantity).toLocaleString("en-LK", {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Admin Controls */}
                    <div className="mt-6 border-t pt-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                            Admin Controls
                        </h3>

                        <div className="flex items-center gap-4">
                            {/* Status Selector */}
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
                            >
                                <option value="PENDING">Pending</option>
                                <option value="PROCESSING">Processing</option>
                                <option value="COMPLETED">Completed</option>
                                <option value="CANCELLED">Cancelled</option>
                            </select>

                            {/* Update Button */}
                            <button
                                className="px-6 py-2 rounded-lg bg-accent text-white font-medium hover:bg-accent/90 transition disabled:opacity-50 cursor-pointer"
                                onClick={updateOrderStatus}
                                disabled={selectedStatus === currentStatus}
                            >
                                Update Status
                            </button>
                        </div>

                        {/* Helper text */}
                        <p className="text-sm text-gray-500 mt-2">
                            Changing status will immediately affect order visibility for the customer.
                        </p>
                    </div>
                </div>
                <div className="px-6 pt-4 pb-6 border-t flex justify-end gap-3">
                    {/* Footer */}
                    <div className="mt-6 flex justify-end">
                        <button
                            className="px-6 py-2 rounded-lg bg-accent text-white
                                    hover:bg-accent/90 transition"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Trigger Button */}
            <button
                className="inline-flex w-[120px] bg-accent/85 text-primary
                           justify-center items-center p-2 rounded-lg
                           cursor-pointer hover:bg-accent transition"
                onClick={() => setIsModalOpen(true)}
            >
                View Order
            </button>
        </>
    );
}
