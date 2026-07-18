import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaCheckCircle, FaStar } from "react-icons/fa";
import { getProductById } from "../lib/api/product/api";
import type { Product } from "../types/Product";
import type { AppDispatch, RootState } from "../redux/store";
import { addToCart } from "../redux/features/cartSlice";
import Navbar from "../components/Navbar";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        if (!id) return;

        const response = await getProductById(id);
        const productData = response.data;

        setProduct(productData);
        setSelectedImage(productData.thumbnailImage || "");
      } catch (error) {
        console.log("Product details fetch failed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <div className="p-10 text-sm text-gray-600">Loading...</div>;
  }

  if (!product) {
    return <div className="p-10 text-sm text-gray-600">Product not found</div>;
  }

  const galleryImages = [
    product.thumbnailImage,
    ...(product.productImages || []).map((image) => image.imageUrl),
  ]
    .filter(Boolean)
    .slice(0, 4);

  const tags =
    product.productTagNames && product.productTagNames.length > 0
      ? product.productTagNames
      : (product.tags || []).map((tag) => tag.tagName);

  const visibleTags = tags.slice(0, 4);

  const decreaseQuantity = () => {
    setQuantity((currentQuantity) => Math.max(1, currentQuantity - 1));
  };

  const increaseQuantity = () => {
    setQuantity((currentQuantity) => currentQuantity + 1);
  };

  const handleAddToCart = async () => {
    if (!user?.id) return;

    await dispatch(
      addToCart({
        userId: user.id,
        productId: product.id,
        quantity,
      })
    );
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    navigate("/cart");
  };

  return (
    <div className="bg-white text-gray-900">
      <Navbar />

      <main className="mx-auto max-w-[760px] px-5 py-5">
      <nav className="mb-5 flex items-center gap-2 text-[11px] text-gray-500">
        <span>Home</span>
        <span>&gt;</span>
        <span>Shop</span>
        <span>&gt;</span>
        <span className="text-gray-700">{product.productName}</span>
      </nav>

      <section className="grid grid-cols-1 gap-8 md:grid-cols-[410px_1fr]">
        <div className="grid grid-cols-[70px_1fr] gap-4">
          <div className="flex flex-col gap-4">
            {galleryImages.map((imageUrl, index) => (
              <button
                key={`${imageUrl}-${index}`}
                type="button"
                onClick={() => setSelectedImage(imageUrl)}
                className={`h-[74px] w-[64px] rounded-md border bg-white p-2 shadow-sm transition ${
                  selectedImage === imageUrl
                    ? "border-green-700"
                    : "border-gray-200 hover:border-green-500"
                }`}
              >
                <img
                  src={imageUrl}
                  alt={`${product.productName} ${index + 1}`}
                  className="h-full w-full object-contain"
                />
              </button>
            ))}
          </div>

          <div className="flex h-[430px] items-center justify-center rounded-lg border border-gray-100 bg-gray-50 p-6">
            <img
              src={selectedImage || product.thumbnailImage}
              alt={product.productName}
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        <div className="pt-3">
          <h1 className="text-[25px] font-semibold leading-tight text-gray-950">
            {product.productName}
          </h1>

          <p className="mt-2 text-[24px] font-bold leading-none text-green-700">
            ₹{product.price}
          </p>

          <div className="mt-5 flex items-center gap-3">
            <div className="flex gap-1 text-[18px] text-orange-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar key={star} />
              ))}
            </div>
            <span className="text-[12px] text-gray-600">(128 reviews)</span>
          </div>

          {product.description && (
            <p className="mt-5 max-w-[300px] text-[15px] leading-7 text-gray-700">
              {product.description}
            </p>
          )}

          {visibleTags.length > 0 && (
            <div className="mt-5 space-y-3">
              {visibleTags.map((tagName) => (
                <div
                  key={tagName}
                  className="flex items-center gap-3 text-[14px] text-gray-700"
                >
                  <FaCheckCircle className="text-[16px] text-green-600" />
                  <span>{tagName}</span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-7 flex items-center gap-4">
            <div className="flex h-10 w-[126px] items-center justify-between rounded border border-gray-200 bg-white px-3">
              <button
                type="button"
                onClick={decreaseQuantity}
                className="text-lg font-medium text-gray-700"
              >
                -
              </button>
              <span className="text-sm font-semibold">{quantity}</span>
              <button
                type="button"
                onClick={increaseQuantity}
                className="text-lg font-medium text-gray-700"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="h-10 flex-1 rounded bg-green-800 px-6 text-sm font-semibold text-white"
            >
              Add to Cart
            </button>
          </div>

          <button
            type="button"
            onClick={handleBuyNow}
            className="mt-4 h-11 w-full rounded border border-green-800 bg-white text-sm font-semibold text-green-800"
          >
            Buy Now
          </button>
        </div>
      </section>

      <section className="mt-12 border-t border-gray-200">
        <div className="flex gap-12 border-b border-gray-200 text-[12px]">
          <button className="border-b-2 border-green-700 py-4 font-semibold text-green-800">
            Description
          </button>
          
          
        </div>

        <div className="py-6 text-[20px] leading-7 text-gray-700">
          <p>{product.description}</p>

          <p className="mt-5">
            <span className="font-semibold text-gray-800">Categories:</span>{" "}
            {product.category?.name}
          </p>

          {tags.length > 0 && (
            <p className="mt-2">
              <span className="font-semibold text-gray-800">Tags:</span>{" "}
              {tags.join(", ")}
            </p>
          )}
        </div>
      </section>
      </main>
    </div>
  );
};

export default ProductDetails;
