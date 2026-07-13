import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function Booking() {

    const { roomId } = useParams();

    const navigate = useNavigate();

    const [checkIn, setCheckIn] = useState("");

    const [checkOut, setCheckOut] = useState("");

    const handleBooking = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            const response = await api.post(
                "/bookings",
                {
                    room: roomId,
                    checkIn,
                    checkOut,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert(response.data.message);

            navigate("/my-bookings");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Booking Failed"
            );

        }

    };

    return (

        <div className="min-h-screen bg-gray-50 py-16">

            <div className="mx-auto max-w-6xl px-8">

                <div className="mb-14 text-center">

                    <h1 className="text-5xl font-bold text-gray-900">

                        Complete Your Booking

                    </h1>

                    <p className="mt-4 text-lg text-gray-500">

                        Select your check-in and check-out dates.

                    </p>

                </div>

                <div className="grid gap-10 lg:grid-cols-3">

                    {/* Booking Form */}

                    <div className="rounded-3xl bg-white p-8 shadow-lg lg:col-span-2">

                        <h2 className="mb-8 text-3xl font-bold">

                            Booking Details

                        </h2>

                        <form
                            onSubmit={handleBooking}
                            className="space-y-8"
                        >

                            <div>

                                <label className="mb-3 block text-lg font-semibold">

                                    Check-In Date

                                </label>

                                <input
                                    type="date"
                                    value={checkIn}
                                    onChange={(e) =>
                                        setCheckIn(e.target.value)
                                    }
                                    className="w-full rounded-2xl border border-gray-300 p-4 outline-none focus:border-rose-500"
                                    required
                                />

                            </div>

                            <div>

                                <label className="mb-3 block text-lg font-semibold">

                                    Check-Out Date

                                </label>

                                <input
                                    type="date"
                                    value={checkOut}
                                    onChange={(e) =>
                                        setCheckOut(e.target.value)
                                    }
                                    className="w-full rounded-2xl border border-gray-300 p-4 outline-none focus:border-rose-500"
                                    required
                                />

                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-full bg-rose-500 py-4 text-lg font-semibold text-white hover:bg-rose-600"
                            >

                                Confirm Booking

                            </button>

                        </form>

                    </div>

                    {/* Summary */}

                    <div>

                        <div className="sticky top-28 rounded-3xl bg-white p-8 shadow-lg">

                            <h2 className="mb-6 text-3xl font-bold">

                                SmartStay

                            </h2>

                            <div className="space-y-4 text-gray-600">

                                <p>✔ Secure Booking</p>

                                <p>✔ Instant Confirmation</p>

                                <p>✔ Best Price Guaranteed</p>

                                <p>✔ Free Cancellation*</p>

                            </div>

                            <div className="mt-8 rounded-2xl bg-rose-50 p-5">

                                <h3 className="text-xl font-bold text-rose-600">

                                    Note

                                </h3>

                                <p className="mt-3 text-gray-600">

                                    Your total booking amount will be
                                    calculated automatically based on the
                                    room price and the number of nights
                                    selected.

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Booking;