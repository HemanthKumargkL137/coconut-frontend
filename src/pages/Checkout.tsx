import { type FormEvent, useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import {
  createAddressApi,
  fetchAddressesApi,
  type AddressPayload,
} from "../lib/api/address/api";
import { placeOrderApi } from "../lib/api/order/api";
import { fetchCart, resetCart } from "../redux/features/cartSlice";
import type { AppDispatch, RootState } from "../redux/store";

type Address = AddressPayload & {
  id: number;
};

const emptyAddress = {
  fullName: "",
  email: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  country: "India",
  pincode: "",
};

const formatPrice = (value: number | string) => `Rs. ${Number(value).toFixed(0)}`;

const formatAddress = (address: Address) =>
  `${address.street}, ${address.city}, ${address.state} - ${address.pincode}, ${address.country}`;

const Checkout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const { items, totalAmount } = useSelector((state: RootState) => state.cart);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [formData, setFormData] = useState(emptyAddress);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [placedOrderAddress, setPlacedOrderAddress] = useState<Address | null>(
    null
  );
  const [placingOrder, setPlacingOrder] = useState(false);

  useEffect(() => {
    const loadCheckoutData = async () => {
      if (!user?.id) return;

      dispatch(fetchCart(user.id));

      const response = await fetchAddressesApi(user.id);
      const addressList = response.data || [];

      setAddresses(addressList);
      setSelectedAddressId(addressList[0]?.id || null);
    };

    loadCheckoutData();
  }, [dispatch, user?.id]);

  const handleInputChange = (
    field: keyof typeof emptyAddress,
    value: string
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleCreateAddress = async () => {
    if (!user?.id) return null;

    const newAddressFields = [
      formData.fullName,
      formData.phone,
      formData.street,
      formData.city,
      formData.state,
      formData.pincode,
    ];

    const requiredFields = [
      formData.fullName,
      formData.phone,
      formData.street,
      formData.city,
      formData.state,
      formData.country,
      formData.pincode,
    ];

    const hasNewAddress = newAddressFields.some(Boolean);

    if (!hasNewAddress) {
      return addresses.find((address) => address.id === selectedAddressId) || null;
    }

    if (requiredFields.some((field) => !field)) {
      throw new Error("Please fill all address fields");
    }

    const response = await createAddressApi({
      userId: user.id,
      fullName: formData.fullName,
      phone: formData.phone,
      street: formData.street,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      pincode: formData.pincode,
      isDefault: addresses.length === 0,
    });

    const createdAddress = response.data;

    setAddresses((current) => [createdAddress, ...current]);
    setSelectedAddressId(createdAddress.id);

    return createdAddress;
  };

  const handlePlaceOrder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setPlacedOrderAddress(null);

    if (!user?.id) return;

    try {
      setPlacingOrder(true);

      const orderAddress = await handleCreateAddress();

      if (!orderAddress) {
        throw new Error("Please select or add an address");
      }

      await placeOrderApi({
        userId: user.id,
        addressId: orderAddress.id,
      });

      dispatch(resetCart());
      setPlacedOrderAddress(orderAddress);
      setSuccessMessage("Your order has been successfully placed");
      setFormData(emptyAddress);
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to place order");
    } finally {
      setPlacingOrder(false);
    }
  };

  const shipping = items.length > 0 ? 40 : 0;
  const grandTotal = totalAmount + shipping;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-8">
        <h1 className="mb-7 text-2xl font-semibold">Checkout</h1>

        <form
          onSubmit={handlePlaceOrder}
          className="grid gap-8 lg:grid-cols-[1fr_330px]"
        >
          <section className="space-y-4">
            <div className="rounded border border-gray-200 bg-white p-5">
              <div className="mb-5 flex items-center gap-3 text-sm font-semibold">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-800 text-xs text-white">
                  1
                </span>
                Shipping Information
              </div>

              {addresses.length > 0 && (
                <div className="mb-5 space-y-3">
                  {addresses.map((address) => (
                    <label
                      key={address.id}
                      className={`block cursor-pointer rounded border p-4 text-sm ${
                        selectedAddressId === address.id
                          ? "border-green-700 bg-green-50"
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        checked={selectedAddressId === address.id}
                        onChange={() => setSelectedAddressId(address.id)}
                        className="mr-2"
                      />
                      <span className="font-semibold">{address.fullName}</span>
                      <p className="mt-1 text-gray-600">
                        {address.street}, {address.city}, {address.state} -{" "}
                        {address.pincode}
                      </p>
                      <p className="text-gray-600">{address.phone}</p>
                    </label>
                  ))}
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  value={formData.fullName}
                  onChange={(event) =>
                    handleInputChange("fullName", event.target.value)
                  }
                  placeholder="Enter your name"
                  className="h-11 rounded border border-gray-200 px-3 text-sm outline-none"
                />
                <input
                  value={formData.email}
                  onChange={(event) =>
                    handleInputChange("email", event.target.value)
                  }
                  placeholder="Enter your email"
                  className="h-11 rounded border border-gray-200 px-3 text-sm outline-none"
                />
                <input
                  value={formData.street}
                  onChange={(event) =>
                    handleInputChange("street", event.target.value)
                  }
                  placeholder="Enter your address"
                  className="h-11 rounded border border-gray-200 px-3 text-sm outline-none md:col-span-2"
                />
                <input
                  value={formData.city}
                  onChange={(event) =>
                    handleInputChange("city", event.target.value)
                  }
                  placeholder="Enter city"
                  className="h-11 rounded border border-gray-200 px-3 text-sm outline-none"
                />
                <input
                  value={formData.pincode}
                  onChange={(event) =>
                    handleInputChange("pincode", event.target.value)
                  }
                  placeholder="Enter pincode"
                  className="h-11 rounded border border-gray-200 px-3 text-sm outline-none"
                />
                <input
                  value={formData.phone}
                  onChange={(event) =>
                    handleInputChange("phone", event.target.value)
                  }
                  placeholder="Enter phone number"
                  className="h-11 rounded border border-gray-200 px-3 text-sm outline-none"
                />
                <input
                  value={formData.state}
                  onChange={(event) =>
                    handleInputChange("state", event.target.value)
                  }
                  placeholder="Enter state"
                  className="h-11 rounded border border-gray-200 px-3 text-sm outline-none"
                />
              </div>
            </div>

            <div className="rounded border border-gray-200 bg-white p-5">
              <div className="flex items-center gap-3 text-sm font-semibold">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-800 text-xs text-white">
                  2
                </span>
                Payment Method
              </div>
              <div className="mt-4 rounded border border-green-700 bg-green-50 p-4 text-sm font-semibold text-green-800">
                Cash on Delivery
              </div>
            </div>

            {successMessage && (
              <div className="rounded border border-green-200 bg-green-50 p-4 text-sm text-green-800">
                <div className="flex items-center gap-3 font-semibold">
                  <FaCheckCircle />
                  {successMessage}
                </div>

                {placedOrderAddress && (
                  <div className="mt-4 rounded border border-green-200 bg-white p-4 text-gray-700">
                    <p className="font-semibold text-gray-900">
                      Order placed for this address
                    </p>
                    <p className="mt-2 font-medium">
                      {placedOrderAddress.fullName}
                    </p>
                    <p className="mt-1">{formatAddress(placedOrderAddress)}</p>
                    <p className="mt-1">Phone: {placedOrderAddress.phone}</p>
                  </div>
                )}
              </div>
            )}

            {errorMessage && (
              <div className="rounded border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
                {errorMessage}
              </div>
            )}
          </section>

          <aside className="h-fit rounded border border-gray-200 bg-white p-6">
            <h2 className="mb-6 text-lg font-semibold">Order Summary</h2>

            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 text-sm">
                  <img
                    src={item.product.thumbnailImage}
                    alt={item.product.productName}
                    className="h-14 w-12 rounded border border-gray-100 object-contain"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">
                      {item.product.productName}
                    </p>
                    <p className="text-xs text-gray-500">{item.product.weight}</p>
                  </div>
                  <span className="text-xs">x{item.quantity}</span>
                  <span className="font-medium">
                    {formatPrice(Number(item.product.price) * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-4 border-t border-gray-200 pt-5 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatPrice(totalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>{formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-4 text-base font-semibold">
                <span>Total</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={items.length === 0 || placingOrder}
              className="mt-6 h-11 w-full rounded bg-green-800 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {placingOrder ? "Placing Order..." : "Place Order"}
            </button>
          </aside>
        </form>
      </main>
    </div>
  );
};

export default Checkout;
