import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Loader from "../components/loader";
import ImageSlider from "../components/imageSlider";
import { CgChevronRight } from "react-icons/cg";
import { addToCart, getCart } from "../utils/cart";

export default function ProductOverviewPage() {

    const navigate = useNavigate();
    const params = useParams();
    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("loading"); //loading, error, success

    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState("5.0");
    const [comment, setComment] = useState("");
    const [loadingReviews, setLoadingReviews] = useState(false);

    const { productId } = useParams();

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`)
            .then((response) => {
                setProduct(response.data);
                setStatus("success");
            })
            .catch(() => {
                setStatus("error");
                toast.error("Product Not Found");
            });
    }, [productId]);

    async function fetchReviews() {
        if (!productId) return;

        try {
            setLoadingReviews(true);
            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/review/${productId}`
            );
            setReviews(res.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load reviews");
        } finally {
            setLoadingReviews(false);
        }
    } useEffect(() => {
        fetchReviews();
    }, [productId]);

    async function submitReview() {
        if (!comment.trim()) {
            toast.error("Please write a comment");
            return;
        }

        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/review`,
                {
                    email: JSON.parse(
                        atob(localStorage.getItem("token").split(".")[1])
                    ).email,
                    productId: productId,
                    rating,
                    comment
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            toast.success("Review submitted!");
            setComment("");
            setRating("5.0");
            fetchReviews();

        } catch (error) {
            console.error(error);
            toast.error("Failed to submit review");
        }
    }

    return (
        <>
            {
                status == "loading" && <Loader />
            }
            {
                status == "error" && <h1 className="text center mt-10 text-2xl">Error loading product</h1>
            }
            {
                status == "success" &&
                <div className="w-full h-[calc(100vh-100px)] flex flex-col lg:flex-row">
                    <h1 className="lg:hidden m-2 text-3xl font-semibold text-gray-900 text-center sticky top-0 bg-white">
                        {product.name}
                    </h1>
                    <div className="lg:w-1/2 w-full h-full flex justify-center items-center">
                        <ImageSlider images={product.images} />
                    </div>
                    <div className="m-4 mt-5 flex flex-col gap-6">
                        <div>
                            <h1 className="hidden lg:block text-4xl font-semibold text-gray-900">
                                {product.name}
                            </h1>

                            <p className="italic text-sm text-gray-500 mt-1">
                                Product ID: {product.productId}
                            </p>

                            <div className="flex items-center gap-1 text-gray-600 mt-2">
                                <CgChevronRight className="text-lg" />
                                <span className="text-sm">{product.category}</span>
                            </div>
                        </div>

                        {/* Alternative Names */}
                        {product.alternativeNames && product.alternativeNames.length > 0 && (
                            <h3 className="text-md text-gray-500">
                                {product.alternativeNames.join(" | ")}
                            </h3>
                        )}

                        <p className="text-gray-700 leading-relaxed text-justify">
                            {product.description}
                        </p>

                        <div className="flex flex-col gap-1">
                            {product.labeledPrice > product.price && (
                                <span className="text-xl line-through text-gray-500">
                                    LKR {product.labeledPrice.toLocaleString()}
                                </span>
                            )}
                            <span className="text-3xl font-bold text-amber-600">
                                LKR {product.price.toLocaleString()}
                            </span>
                        </div>

                        {/*Add to Cart & Buy Now section */}
                        <div className="w-[400px] flex gap-4 mt-4 mb-4">
                            <button className="flex-1 bg-secondary text-white py-3 rounded-lg font-medium
                                           hover:bg-secondary/80 transition" onClick={() => {
                                    addToCart(product, 1)
                                }}>
                                Add to Cart
                            </button>

                            <button className="flex-1 border-2 border-secondary text-secondary/90 py-3 rounded-lg font-medium
                                           hover:bg-secondary hover:text-white transition"
                                onClick={() => {
                                    navigate("/checkout", {
                                        state: [{
                                            productId: product.productId,
                                            name: product.name,
                                            price: product.price,
                                            labeledPrice: product.labeledPrice,
                                            image: product.image,
                                            quantity: 1
                                        }]
                                    })
                                }}>
                                Buy Now
                            </button>
                        </div>

                        <div className="hidden lg:block text-2xl font-semibold text-secondary">
                            <div className="w-full bg-white/10 backdrop-blur rounded-xl">

                                <h2 className="text-2xl font-semibold text-secondary mb-4">
                                    Customer Reviews
                                </h2>

                                {/* Review List */}
                                {loadingReviews && <p>Loading reviews...</p>}

                                {!loadingReviews && reviews.length === 0 && (
                                    <p className="text-gray-400">No reviews yet. Be the first!</p>
                                )}

                                <div className="space-y-4">
                                    {reviews.map((review, index) => (
                                        <div
                                            key={index}
                                            className="p-4 rounded-lg border border-secondary/20 bg-secondary/5"
                                        >
                                            <div className="flex justify-between items-center mb-1">
                                                <p className="font-semibold text-text">
                                                    {review.email}
                                                </p>
                                                <p className="text-accent font-bold">
                                                    ⭐ {review.rating}
                                                </p>
                                            </div>
                                            <p className="text-text/90">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Submit Review */}
                                {localStorage.getItem("token") && (
                                    <div className="mt-8 border-t border-secondary/20 pt-6">
                                        <h3 className="text-xl font-semibold mb-3 text-secondary">
                                            Write a Review
                                        </h3>

                                        <div className="flex flex-col sm:flex-row gap-4 mb-4">
                                            <select
                                                value={rating}
                                                onChange={(e) => setRating(e.target.value)}
                                                className="w-full sm:w-[120px] px-3 py-2 rounded-md border border-secondary focus:ring-2 focus:ring-accent"
                                            >
                                                <option value="5.0">5 ⭐</option>
                                                <option value="4.0">4 ⭐</option>
                                                <option value="3.0">3 ⭐</option>
                                                <option value="2.0">2 ⭐</option>
                                                <option value="1.0">1 ⭐</option>
                                            </select>

                                            <textarea
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                placeholder="Write your review..."
                                                className="w-full px-4 py-2 rounded-md border border-secondary focus:ring-2 focus:ring-accent resize-none"
                                                rows={3}
                                            />
                                        </div>

                                        <button
                                            onClick={submitReview}
                                            className="px-6 py-2 mb-4 bg-accent text-primary text-lg rounded-md hover:bg-accent/90 transition"
                                        >
                                            Submit Review
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}