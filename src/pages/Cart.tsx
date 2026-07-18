import { useEffect } from "react";
import { FaArrowLeft, FaLeaf, FaShieldAlt, FaTruck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  fetchCart,
  removeCartItem,
  updateCartQuantity,
} from "../redux/features/cartSlice";
import type { AppDispatch, RootState } from "../redux/store";

const formatPrice = (value: number | string) => `Rs. ${Number(value).toFixed(0)}`;

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const { items, totalAmount, loading } = useSelector(
    (state: RootState) => state.cart
  );

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCart(user.id));
    }
  }, [dispatch, user?.id]);

  const handleQuantityChange = (
    cartItemId: number,
    currentQuantity: number,
    change: number
  ) => {
    if (!user?.id) return;

    const nextQuantity = currentQuantity + change;

    if (nextQuantity < 1) {
      dispatch(removeCartItem({ userId: user.id, cartItemId }));
      return;
    }

    dispatch(
      updateCartQuantity({
        userId: user.id,
        cartItemId,
        quantity: nextQuantity,
      })
    );
  };

  const shipping = items.length > 0 ? 40 : 0;
  const grandTotal = totalAmount + shipping;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-8">
        <h1 className="mb-7 text-2xl font-semibold">Your Cart</h1>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <section className="overflow-hidden rounded border border-gray-200 bg-white">
            <div className="grid grid-cols-[1.8fr_0.7fr_0.9fr_0.7fr] border-b border-gray-200 px-5 py-4 text-sm font-semibold text-gray-700">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Subtotal</span>
            </div>

            {loading && (
              <div className="px-5 py-8 text-sm text-gray-500">Loading cart...</div>
            )}

            {!loading && items.length === 0 && (
              <div className="px-5 py-12 text-center text-sm text-gray-500">
                Your cart is empty.
              </div>
            )}

            {items.map((item) => {
              const price = Number(item.product.price);
              const subtotal = price * item.quantity;

              return (
                <div
                  key={item.id}
                  className="grid grid-cols-[1.8fr_0.7fr_0.9fr_0.7fr] items-center border-b border-gray-100 px-5 py-5 text-sm last:border-b-0"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product.thumbnailImage}
                      alt={item.product.productName}
                      className="h-16 w-14 rounded border border-gray-100 object-contain"
                    />
                    <div>
                      <p className="font-medium text-gray-900">
                        {item.product.productName}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {item.product.weight}
                      </p>
                    </div>
                  </div>

                  <span>{formatPrice(price)}</span>

                  <div className="flex h-9 w-24 items-center justify-between rounded border border-gray-200 px-3">
                    <button
                      type="button"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity, -1)
                      }
                      className="text-lg text-gray-700"
                    >
                      -
                    </button>
                    <span className="text-sm font-semibold">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity, 1)
                      }
                      className="text-lg text-gray-700"
                    >
                      +
                    </button>
                  </div>

                  <span>{formatPrice(subtotal)}</span>
                </div>
              );
            })}
          </section>

          <aside className="h-fit rounded border border-gray-200 bg-white p-6">
            <h2 className="mb-6 text-lg font-semibold">Cart Summary</h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatPrice(totalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">{formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-4 text-base font-semibold">
                <span>Total</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <button
              type="button"
              disabled={items.length === 0}
              onClick={() => navigate("/checkout")}
              className="mt-6 h-11 w-full rounded bg-green-800 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              Proceed to Checkout
            </button>

            <div className="mt-6 grid grid-cols-3 gap-3 text-center text-[11px] text-green-800">
              <div className="flex flex-col items-center gap-2">
                <FaLeaf />
                <span>Secure Payment</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <FaTruck />
                <span>Easy Returns</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <FaShieldAlt />
                <span>100% Satisfaction</span>
              </div>
            </div>
          </aside>
        </div>

        <button
          type="button"
          onClick={() => navigate("/shop")}
          className="mt-10 inline-flex h-10 items-center gap-2 rounded border border-green-800 px-4 text-sm font-semibold text-green-800"
        >
          <FaArrowLeft />
          Continue Shopping
        </button>
      </main>
    </div>
  );
};

export default Cart;
