import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminReviewsPage() {

    const [productId, setProductId] = useState("");
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fetchReviews() {
        if (!productId) {
            toast.error("Please enter a Product ID");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/review/${productId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            setReviews(res.data);

        } catch (error) {
            toast.error("Failed to fetch reviews");
            console.error(error);

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full min-h-screen p-6 bg-primary text-text">

            <h1 className="text-3xl font-semibold mb-6 text-secondary">
                Product Reviews (Admin)
            </h1>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Enter Product ID"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    className="w-full sm:w-[300px] px-4 py-2 border rounded-md
                               border-accent focus:outline-none focus:ring-2 focus:ring-accent"
                />

                <button
                    onClick={fetchReviews}
                    className="px-6 py-2 bg-accent text-black font-semibold
                               rounded-md hover:bg-accent/90 transition"
                >
                    Load Reviews
                </button>
            </div>

            {/* Reviews List */}
            {loading && <p className="text-secondary">Loading reviews...</p>}

            {!loading && reviews.length === 0 && (
                <p className="text-gray-500">No reviews found.</p>
            )}

            {!loading && reviews.length > 0 && (
                <div className="w-full overflow-x-auto shadow-lg rounded-xl bg-white">
                    <table className="w-full border border-secondary/30 rounded-lg">
                        <thead className="bg-secondary text-primary">
                            <tr>
                                <th className="px-4 py-2 text-left">User Email</th>
                                <th className="px-4 py-2 text-left">Rating</th>
                                <th className="px-4 py-2 text-left">Comment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((review, index) => (
                                <tr
                                    key={index}
                                    className="border-t border-secondary/20 hover:bg-secondary/5"
                                >
                                    <td className="px-4 py-2">
                                        {review.email}
                                    </td>
                                    <td className="px-4 py-2 font-semibold text-accent">
                                        ⭐ {review.rating}
                                    </td>
                                    <td className="px-4 py-2">
                                        {review.comment}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}