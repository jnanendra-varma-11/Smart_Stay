import { Link } from "react-router-dom";

function Footer() {

    return (

        <footer className="mt-20 border-t border-gray-200 bg-white">

            <div className="mx-auto max-w-7xl px-8 py-14">

                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

                    {/* Logo */}

                    <div>

                        <div className="flex items-center gap-3">

                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500 text-2xl text-white">

                                🏨

                            </div>

                            <h2 className="text-3xl font-bold text-gray-900">

                                SmartStay

                            </h2>

                        </div>

                        <p className="mt-5 leading-7 text-gray-600">

                            SmartStay helps travelers discover premium hotels,
                            book rooms securely, and enjoy memorable stays
                            across India.

                        </p>

                    </div>

                    {/* Quick Links */}

                    <div>

                        <h3 className="mb-5 text-xl font-bold">

                            Quick Links

                        </h3>

                        <div className="space-y-3">

                            <Link
                                to="/"
                                className="block text-gray-600 hover:text-rose-500"
                            >

                                Home

                            </Link>

                            <Link
                                to="/hotels"
                                className="block text-gray-600 hover:text-rose-500"
                            >

                                Hotels

                            </Link>

                            <Link
                                to="/my-bookings"
                                className="block text-gray-600 hover:text-rose-500"
                            >

                                My Bookings

                            </Link>

                        </div>

                    </div>

                    {/* Support */}

                    <div>

                        <h3 className="mb-5 text-xl font-bold">

                            Support

                        </h3>

                        <div className="space-y-3 text-gray-600">

                            <p>Help Center</p>

                            <p>FAQs</p>

                            <p>Privacy Policy</p>

                            <p>Terms & Conditions</p>

                        </div>

                    </div>

                    {/* Contact */}

                    <div>

                        <h3 className="mb-5 text-xl font-bold">

                            Contact

                        </h3>

                        <div className="space-y-3 text-gray-600">

                            <p>📧 support@smartstay.com</p>

                            <p>📞 +91 99599 74411</p>

                            <p>📍 India</p>

                        </div>

                    </div>

                </div>

                <hr className="my-10" />

                <div className="flex flex-col items-center justify-between gap-4 text-gray-500 md:flex-row">

                    <p>

                        © {new Date().getFullYear()} SmartStay. All Rights Reserved.

                    </p>

                    <div className="flex gap-5 text-2xl">

                        <span className="cursor-pointer transition hover:scale-110">

                            🌐

                        </span>

                        <span className="cursor-pointer transition hover:scale-110">

                            📘

                        </span>

                        <span className="cursor-pointer transition hover:scale-110">

                            📸

                        </span>

                        <span className="cursor-pointer transition hover:scale-110">

                            💼

                        </span>

                    </div>

                </div>

            </div>

        </footer>

    );

}

export default Footer;