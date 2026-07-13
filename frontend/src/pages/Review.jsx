import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

function Review() {

    const { bookingId } = useParams();

    const navigate = useNavigate();

    const { token } = useAuth();

    const [rating, setRating] = useState(5);

    const [comment, setComment] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post(

                "/reviews",

                {

                    bookingId,

                    rating,

                    comment,

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

                "Failed to submit review."

            );

        }

    };

    return (

        <div className="min-h-screen bg-gray-100 py-12">

            <div className="mx-auto max-w-2xl rounded-3xl bg-white p-10 shadow-lg">

                <h1 className="mb-8 text-center text-4xl font-bold">

                    Review Your Stay

                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-8"
                >

                    <div>

                        <label className="mb-3 block text-lg font-semibold">

                            Rating

                        </label>

                        <div className="flex gap-3">

                            {

                                [1, 2, 3, 4, 5].map((star) => (

                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        className={`text-4xl transition ${
                                            rating >= star
                                                ? "text-yellow-400"
                                                : "text-gray-300"
                                        }`}
                                    >

                                        ★

                                    </button>

                                ))

                            }

                        </div>

                    </div>

                    <div>

                        <label className="mb-3 block text-lg font-semibold">

                            Review

                        </label>

                        <textarea
                            rows="6"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Tell others about your stay..."
                            className="w-full rounded-2xl border p-4 outline-none focus:border-rose-500"
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-full bg-rose-500 py-4 text-lg font-semibold text-white transition hover:bg-rose-600"
                    >

                        Submit Review

                    </button>

                </form>

            </div>

        </div>

    );

}

export default Review;