import { Link } from "react-router-dom";

export default function ProductCard(props) {

    const product = props.product

    return(
        <div className="w-64 bg-amber-50 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col">
            
            {/* Product Image */}
            <div className="h-40 w-full overflow-hidden bg-gray-100">
                <img
                    src={product.images?.[0] || "/placeholder.png"}
                    alt={product.name}
                    className="h-full w-full object-cover hover:scale-105 transition-transform-300"
                />
            </div>

            {/* Product Details */}
            <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {product.name}
                </h2>

                <p className="mt-1 text-sm line-through text-secondary/70">
                    LKR {product.labeledPrice?.toLocaleString()}
                </p>
                <p className="mt-1 text-md text-amber-600 font-bold">
                    LKR {product.price?.toLocaleString()}
                </p>
                <p className="text-sm text-gray-800 line-clamp-2">
                    {product.description}
                </p>

                <Link to={"/overview/" + product.productId} className="mt-auto w-full rounded-lg bg-amber-600 text-white py-2 text-sm font-medium
                                   hover:bg-amber-500 transition flex items-center justify-center">
                    View Details
                </Link>
            </div>
        </div>
    );
}