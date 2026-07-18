import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaPhoneAlt,
  FaSeedling,
  FaUser,
} from "react-icons/fa";
import heroImage from "../assets/hero.png";
import { signupUser } from "../redux/features/authSlice";
import type { AppDispatch, RootState } from "../redux/store";

const Signup = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(signupUser(formData));

    if (signupUser.fulfilled.match(result)) {
      navigate("/login");
    }
  };

  return (
    <>
      {/* <Navbar /> */}

      <main className="min-h-[calc(100vh-80px)] bg-[#f7fbf5] px-5 py-8">
        <section className="mx-auto grid max-w-7xl overflow-hidden rounded-2xl border border-green-100 bg-white shadow-xl shadow-green-900/5 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="flex min-h-[680px] items-center justify-center px-5 py-10 sm:px-10 lg:px-14">
            <div className="w-full max-w-xl">
              <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-green-700">
                  Create Account
                </p>
                <h1 className="mt-3 text-4xl font-bold text-gray-950">
                  Join Tiptur Coconut
                </h1>
                <p className="mt-3 text-base leading-7 text-gray-600">
                  Create your customer profile for faster checkout, saved
                  delivery details, and a smoother shopping experience.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-gray-800">
                      First name
                    </span>
                    <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 px-4 transition focus-within:border-green-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-green-100">
                      <FaUser className="text-green-700" />
                      <input
                        name="firstName"
                        placeholder="firstname"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="h-12 w-full border-0 bg-transparent px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0"
                      />
                    </div>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-gray-800">
                      Last name
                    </span>
                    <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 px-4 transition focus-within:border-green-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-green-100">
                      <FaUser className="text-green-700" />
                      <input
                        name="lastName"
                        placeholder="lastname"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="h-12 w-full border-0 bg-transparent px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0"
                      />
                    </div>
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-gray-800">
                    Email address
                  </span>
                  <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 px-4 transition focus-within:border-green-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-green-100">
                    <FaEnvelope className="text-green-700" />
                    <input
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="h-12 w-full border-0 bg-transparent px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-gray-800">
                    Phone number
                  </span>
                  <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 px-4 transition focus-within:border-green-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-green-100">
                    <FaPhoneAlt className="text-green-700" />
                    <input
                      name="phone"
                      placeholder="9876543210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="h-12 w-full border-0 bg-transparent px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-gray-800">
                    Password
                  </span>
                  <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 px-4 transition focus-within:border-green-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-green-100">
                    <FaLock className="text-green-700" />
                    <input
                      name="password"
                      type="password"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleChange}
                      className="h-12 w-full border-0 bg-transparent px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0"
                    />
                  </div>
                </label>

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="h-12 w-full rounded-xl bg-green-700 font-semibold text-white shadow-lg shadow-green-700/20 transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-green-400"
                >
                  {loading ? "Creating account..." : "Create account"}
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-green-700 hover:text-green-900"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>

          <div className="relative hidden min-h-[680px] lg:block">
            <img
              src={heroImage}
              alt="Coconut products"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-green-950/80 via-green-900/50 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-between p-12 text-white">
              <div className="inline-flex w-fit items-center gap-3 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
                <FaSeedling />
                Natural products from Tiptur
              </div>

              <div className="max-w-lg">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-green-100">
                  Premium Coconut Store
                </p>
                <h2 className="text-5xl font-bold leading-tight">
                  Build your account for a better shopping experience.
                </h2>
                <p className="mt-5 text-lg leading-8 text-green-50">
                  Save your profile now and keep every order, delivery, and
                  product discovery neatly connected.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Signup;
