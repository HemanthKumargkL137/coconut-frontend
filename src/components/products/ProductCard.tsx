import type { Product } from "../../types/Product";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/features/cartSlice";
import type { AppDispatch, RootState } from "../../redux/store";

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.auth.user);

    const handleAddToCart = () => {
        if (!user?.id) return;

        dispatch(
            addToCart({
                userId: user.id,
                productId: product.id,
                quantity: 1,
            })
        );
    };

    // console.log(product.thumbnailImage);
    return (
        <div  className="rounded-xl border p-5 flex flex-col h-full">
            {/* <p>{product.image}</p> */}
            <Link to={`/product/${product.id}`}>
  <img
    src={product.thumbnailImage}
    alt={product.productName}
    className="w-full h-44 object-contain"
  />
</Link>

            <h3 className="mt-4 min-h-[56px] text-lg font-medium">
                {product.productName}
            </h3>

            <p className="mt-2 font-bold">
                ₹{product.price}
            </p>

            <button
                type="button"
                onClick={handleAddToCart}
                className="w-full mt-4 bg-green-700 text-white py-2 rounded-lg"
            >
                Add to Cart
            </button>

        </div>
    );
};

export default ProductCard;
