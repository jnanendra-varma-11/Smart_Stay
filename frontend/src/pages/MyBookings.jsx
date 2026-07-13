import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function MyBookings() {

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "/bookings/my-bookings",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setBookings(response.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const cancelBooking = async (bookingId) => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.delete(
                `/bookings/${bookingId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert(response.data.message);

            fetchBookings();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Cancellation Failed"
            );

        }

    };

    useEffect(() => {

        fetchBookings();

    }, []);

    if (loading) {

        return (

            <div className="flex min-h-screen items-center justify-center bg-gray-50">

                <div className="text-center">

                    <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-gray-200 border-t-rose-500"></div>

                    <h2 className="mt-5 text-3xl font-bold">

                        Loading Bookings...

                    </h2>

                </div>

            </div>

        );

    }

    return (

        <div className="min-h-screen bg-gray-50 py-16">

            <div className="mx-auto max-w-7xl px-8">

                <div className="mb-14 text-center">

                    <h1 className="text-5xl font-bold text-gray-900">

                        My Bookings

                    </h1>

                    <p className="mt-4 text-lg text-gray-500">

                        View and manage all your hotel reservations.

                    </p>

                </div>

                {

                    bookings.length === 0 ? (

                        <div className="rounded-3xl bg-white py-20 text-center shadow-lg">

                            <div className="text-7xl">

                                🧳

                            </div>

                            <h2 className="mt-6 text-4xl font-bold text-gray-900">

                                No Bookings Yet

                            </h2>

                            <p className="mt-4 text-lg text-gray-500">

                                Your booked hotels will appear here.

                            </p>

                            <Link to="/hotels">

                                <button className="mt-8 rounded-full bg-rose-500 px-8 py-3 text-lg font-semibold text-white transition hover:bg-rose-600">

                                    Explore Hotels

                                </button>

                            </Link>

                        </div>

                    ) : (

                        <div className="space-y-8">

                            {

                                bookings.map((booking) => (

                                    <div
                                        key={booking._id}
                                        className="rounded-3xl bg-white p-8 shadow-lg transition duration-300 hover:shadow-2xl"
                                    >

                                        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

                                            {/* Left */}

                                            <div>

                                                <h2 className="text-3xl font-bold text-gray-900">

                                                    {booking.hotel?.name || "Hotel Deleted"}

                                                </h2>

                                                <p className="mt-3 text-gray-600">

                                                    Room Number :

                                                    <span className="ml-2 font-semibold text-gray-900">

                                                        {booking.room?.roomNumber || "Room Deleted"}

                                                    </span>

                                                </p>

                                                <p className="mt-2 text-gray-600">

                                                    Room Type :

                                                    <span className="ml-2 font-semibold text-gray-900">

                                                        {booking.room?.roomType || "-"}

                                                    </span>

                                                </p>

                                                <p className="mt-2 text-gray-600">

                                                    Check-In :

                                                    <span className="ml-2 font-semibold text-gray-900">

                                                        {booking.checkIn.substring(0,10)}

                                                    </span>

                                                </p>

                                                <p className="mt-2 text-gray-600">

                                                    Check-Out :

                                                    <span className="ml-2 font-semibold text-gray-900">

                                                        {booking.checkOut.substring(0,10)}

                                                    </span>

                                                </p>

                                            </div>

                                            {/* Right */}

                                            <div className="text-center lg:text-right">

                                                <h2 className="text-4xl font-bold text-rose-500">

                                                    ₹ {booking.totalPrice}

                                                </h2>

                                                <p className="mt-2 text-gray-500">

                                                    Total Price

                                                </p>

                                                <div className="mt-5">

                                                    {

                                                        booking.status === "Cancelled" ? (

                                                            <span className="rounded-full bg-red-100 px-5 py-2 font-semibold text-red-600">

                                                                Cancelled

                                                            </span>

                                                        ) : (

                                                            <span className="rounded-full bg-green-100 px-5 py-2 font-semibold text-green-700">

                                                                Confirmed

                                                            </span>

                                                        )

                                                    }

                                                </div>

                                                <div className="mt-5 flex flex-wrap gap-3">

    <button
        onClick={() => cancelBooking(booking._id)}
        disabled={booking.status === "Cancelled"}
        className={`rounded-xl px-5 py-2 font-medium text-white transition ${
            booking.status === "Cancelled"
                ? "cursor-not-allowed bg-gray-400"
                : "bg-red-500 hover:bg-red-600"
        }`}
    >
        {booking.status === "Cancelled"
            ? "Already Cancelled"
            : "Cancel Booking"}
    </button>

    {
        booking.status !== "Cancelled" &&
        new Date() > new Date(booking.checkOut) && (

            <Link
                to={`/review/${booking._id}`}
                className="rounded-xl bg-rose-500 px-5 py-2 font-medium text-white transition hover:bg-rose-600"
            >
                ⭐ Write Review
            </Link>

        )
    }

</div>

                                            </div>

                                        </div>

                                    </div>

                                ))

                            }

                        </div>

                    )

                }

            </div>

        </div>

    );

}

export default MyBookings;