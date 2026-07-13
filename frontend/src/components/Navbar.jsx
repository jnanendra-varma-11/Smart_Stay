import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {

    const navigate = useNavigate();

    const { isLoggedIn, logout, user } = useAuth();

    const handleLogout = () => {

        logout();

        navigate("/");

    };

    return (

        <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">

            <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

                <Link
                    to="/"
                    className="text-3xl font-bold text-rose-500"
                >

                    🏨 SmartStay

                </Link>

                <div className="flex items-center gap-7">

                    <Link
                        to="/"
                        className="font-medium text-gray-700 transition hover:text-rose-500"
                    >
                        Home
                    </Link>

                    <Link
                        to="/hotels"
                        className="font-medium text-gray-700 transition hover:text-rose-500"
                    >
                        Hotels
                    </Link>

                    {

                        isLoggedIn ? (

                            <>

                                <Link
                                    to="/my-bookings"
                                    className="font-medium text-gray-700 transition hover:text-rose-500"
                                >
                                    My Bookings
                                </Link>

                                {
                                    user?.role === "superadmin" && (

                                        <Link
                                            to="/super-admin"
                                            className="hover:text-rose-300 transition"
                                        >
                                            Super Admin
                                        </Link>

                                    )
                                }

                                {
    (user?.role === "admin" ||
        user?.role === "superadmin") && (

        <Link
            to="/admin"
            className="hover:text-gray-200 transition"
        >
            Admin Dashboard
        </Link>

    )
}

                                <Link
                                    to="/profile"
                                    className="font-medium text-gray-700 transition hover:text-rose-500"
                                >
                                    Profile
                                </Link>

                                <div className="rounded-full bg-rose-100 px-4 py-2 font-semibold text-rose-600">

                                    👋 {user?.name}

                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="rounded-full bg-rose-500 px-5 py-2 font-semibold text-white transition hover:bg-rose-600"
                                >

                                    Logout

                                </button>

                            </>

                        ) : (

                            <>

                                <Link
                                    to="/login"
                                    className="font-medium text-gray-700 transition hover:text-rose-500"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    className="rounded-full bg-rose-500 px-5 py-2 font-semibold text-white transition hover:bg-rose-600"
                                >
                                    Register
                                </Link>

                            </>

                        )

                    }

                </div>

            </div>

        </nav>

    );

}

export default Navbar;