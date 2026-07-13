import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post(
                "/users/login",
                formData
            );

            login(
                response.data.token,
                response.data.user
            );

            alert(response.data.message);

            navigate("/");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Login Failed"
            );

        }

    };

    return (

        <div className="min-h-screen bg-gray-50">

            <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-2">

                {/* Left Side */}

                <div className="hidden items-center justify-center bg-gradient-to-br from-rose-500 via-red-500 to-pink-500 p-16 lg:flex">

                    <div className="text-white">

                        <h1 className="text-6xl font-bold leading-tight">

                            Welcome
                            <br />
                            Back!

                        </h1>

                        <p className="mt-8 max-w-md text-xl leading-9">

                            Login to continue exploring amazing hotels,
                            manage your bookings, and enjoy a seamless
                            travel experience with SmartStay.

                        </p>

                        <div className="mt-12 space-y-5">

                            <div className="flex items-center gap-4">

                                <span className="text-3xl">🏨</span>

                                <p className="text-lg">

                                    Premium Hotels

                                </p>

                            </div>

                            <div className="flex items-center gap-4">

                                <span className="text-3xl">💰</span>

                                <p className="text-lg">

                                    Best Price Guarantee

                                </p>

                            </div>

                            <div className="flex items-center gap-4">

                                <span className="text-3xl">⭐</span>

                                <p className="text-lg">

                                    Trusted by Travelers

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Right Side */}

                <div className="flex items-center justify-center p-8">

                    <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">

                        <div className="mb-10 text-center">

                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-rose-500 text-4xl text-white">

                                🏨

                            </div>

                            <h2 className="mt-6 text-4xl font-bold text-gray-900">

                                Login

                            </h2>

                            <p className="mt-2 text-gray-500">

                                Welcome back to SmartStay

                            </p>

                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >

                            <div>

                                <label className="mb-2 block font-semibold text-gray-700">

                                    Email Address

                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-rose-500"
                                    required
                                />

                            </div>

                            <div>

                                <label className="mb-2 block font-semibold text-gray-700">

                                    Password

                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    className="w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-rose-500"
                                    required
                                />

                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-full bg-rose-500 py-4 text-lg font-semibold text-white transition duration-300 hover:bg-rose-600"
                            >

                                Login

                            </button>

                        </form>

                        <div className="mt-8 text-center">

                            <p className="text-gray-600">

                                Don't have an account?

                            </p>

                            <Link
                                to="/register"
                                className="mt-3 inline-block font-semibold text-rose-500 hover:text-rose-600"
                            >

                                Create Account

                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;