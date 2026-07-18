import { FaSearch, FaShoppingCart, FaSignOutAlt, FaUser } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.png";
import { logout } from "../redux/features/authSlice";
import { fetchCart, resetCart } from "../redux/features/cartSlice";
import type { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";

interface NavbarProps {
    search?: string;
    handleSearch?: (value: string) => void;

}

const Navbar = ({ search = "", handleSearch, }: NavbarProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.auth.user);
    const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `cursor-pointer hover:text-green-700 ${isActive ? "text-green-700 font-semibold" : ""}`;

    useEffect(() => {
        if (user?.id) {
            dispatch(fetchCart(user.id));
        }
    }, [dispatch, user?.id]);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(resetCart());
        localStorage.removeItem("persist:auth");
        navigate("/login");
    };

    return (
        <nav className="w-full bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-8">

                {/* Left Section */}
                <div className="flex items-center gap-12">

                    {/* Logo */}
                    <div className="flex items-center">
                        <img
                            src={logo}
                            alt="Tiptur Coconut"
                            className="w-[250px] h-auto object-contain"

                        />
                    </div>

                    {/* Navigation Links */}
                    <ul className="flex items-center gap-8 text-gray-700 font-medium">

                        <NavLink to="/home" className="cursor-pointer hover:text-green-700">
                            Home
                        </NavLink>

                        <NavLink to="/shop" className={navLinkClass}>
                            Shop
                        </NavLink>




                        <NavLink to="/about-us" className={navLinkClass}>
                            About Us
                        </NavLink>

                        <NavLink to="/blog" className={navLinkClass}>
                            Blog
                        </NavLink>

                        

                        <NavLink to="/contact" className={navLinkClass}>
                            Contact
                        </NavLink>

                    </ul>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-6 text-xl text-green-700">

                    <div className="flex items-center gap-2 border rounded-lg px-3 py-2">


                        <input
                            type="text"
                            value={search}
                            onChange={(e) => handleSearch?.(e.target.value)}
                            placeholder="Search products..."
                            className="outline-none text-sm text-gray-700"
                        />
                        <FaSearch />


                    </div>

                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setIsProfileOpen((current) => !current)}
                            className="hover:scale-110 duration-200"
                            title="User details"
                        >
                            <FaUser />
                        </button>

                        {isProfileOpen && (
                            <div className="absolute right-0 top-9 z-50 w-72 rounded border border-gray-200 bg-white p-4 text-sm text-gray-700 shadow-lg">
                                <p className="text-base font-semibold text-gray-900">
                                    {user
                                        ? `${user.firstName} ${user.lastName}`
                                        : "Guest User"}
                                </p>
                                <div className="mt-3 space-y-2">
                                    <p>
                                        <span className="font-semibold">Email:</span>{" "}
                                        {user?.email || "Not available"}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Role:</span>{" "}
                                        {user?.role || "USER"}
                                    </p>
                                    <p>
                                        <span className="font-semibold">User ID:</span>{" "}
                                        {user?.id || "Not available"}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    <NavLink to="/cart" className="relative">

                        <FaShoppingCart className="cursor-pointer hover:scale-110 duration-200" />

                        {totalQuantity > 0 && (
                            <span
                                className="
                absolute
                -top-2
                -right-2
                w-5
                h-5
                rounded-full
                bg-green-700
                text-white
                text-xs
                flex
                items-center
                justify-center
              "
                            >
                                {totalQuantity}
                            </span>
                        )}

                    </NavLink>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="text-lg text-green-700 hover:scale-110 duration-200"
                        title="Logout"
                    >
                        <FaSignOutAlt />
                    </button>

                </div>

            </div>
        </nav>
    );
};

export default Navbar;
