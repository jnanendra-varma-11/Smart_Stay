import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

function HotelDetails() {

    const { id } = useParams();

    const [hotel, setHotel] = useState(null);
    const [rooms, setRooms] = useState([]);

    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);

    useEffect(() => {

        const fetchHotel = async () => {

            try {

                const hotelResponse = await api.get(`/hotels/${id}`);

                setHotel(hotelResponse.data.hotel);

                setRooms(hotelResponse.data.rooms);

                const reviewResponse = await api.get(
                    `/reviews/hotel/${id}`
                );

                setReviews(reviewResponse.data.reviews);

                setAverageRating(
                    reviewResponse.data.averageRating
                );

                setTotalReviews(
                    reviewResponse.data.totalReviews
                );

            } catch (error) {

                console.log(error);

            }

        };

        fetchHotel();

    }, [id]);

    if (!hotel) {

        return (

            <h1 className="mt-20 text-center text-3xl">

                Loading...

            </h1>

        );

    }

    return (

        <div className="mx-auto max-w-7xl p-8">

            <img
                src={hotel.images?.[0]}
                alt={hotel.name}
                className="h-96 w-full rounded-3xl object-cover shadow-lg"
            />

            <h1 className="mt-8 text-5xl font-bold">

                {hotel.name}

            </h1>

            <p className="mt-3 text-xl text-gray-600">

                📍 {hotel.location}

            </p>

            <div className="mt-5 flex items-center gap-4">

                <span className="rounded-full bg-yellow-100 px-4 py-2 font-semibold text-yellow-700">

                    ⭐ {averageRating}

                </span>

                <span className="text-gray-600">

                    {totalReviews} Review{totalReviews !== 1 ? "s" : ""}

                </span>

            </div>

            <p className="mt-6 leading-8 text-gray-700">

                {hotel.description}

            </p>

            <h2 className="mt-12 text-3xl font-bold">

                Amenities

            </h2>

            <div className="mt-5 flex flex-wrap gap-3">

                {hotel.amenities.map((item, index) => (

                    <span
                        key={index}
                        className="rounded-full bg-rose-100 px-5 py-2 text-rose-600"
                    >

                        {item}

                    </span>

                ))}

            </div>

            <h2 className="mt-14 mb-8 text-3xl font-bold">

                Available Rooms

            </h2>

            <div className="grid gap-8 md:grid-cols-2">

                {

                    rooms.length === 0 ? (

                        <div className="rounded-2xl border border-dashed p-8 text-center text-gray-500">

                            No Rooms Available

                        </div>

                    ) : (

                        rooms.map((room) => (

                            <div
                                key={room._id}
                                className="rounded-3xl border bg-white p-6 shadow-md transition hover:shadow-xl"
                            >

                                <h3 className="text-2xl font-bold">

                                    {room.roomType}

                                </h3>

                                <p className="mt-3">

                                    Room Number : {room.roomNumber}

                                </p>

                                <p>

                                    Capacity : {room.capacity}

                                </p>

                                <p className="mt-4 text-3xl font-bold text-rose-500">

                                    ₹ {room.price}

                                </p>

                                <Link
                                    to={`/booking/${room._id}`}
                                >

                                    <button
                                        className="mt-6 w-full rounded-full bg-rose-500 py-3 font-semibold text-white transition hover:bg-rose-600"
                                    >

                                        Book Now

                                    </button>

                                </Link>

                            </div>

                        ))

                    )

                }

            </div>

            <h2 className="mt-16 mb-8 text-3xl font-bold">

                Customer Reviews

            </h2>

            {

                reviews.length === 0 ? (

                    <div className="rounded-3xl border border-dashed p-10 text-center text-gray-500">

                        No Reviews Yet

                    </div>

                ) : (

                    <div className="space-y-6">

                        {

                            reviews.map((review) => (

                                <div
                                    key={review._id}
                                    className="rounded-3xl bg-white p-6 shadow-md"
                                >

                                    <div className="flex items-center justify-between">

                                        <h3 className="text-xl font-bold">

                                            {review.user.name}

                                        </h3>

                                        <span className="rounded-full bg-yellow-100 px-4 py-2 font-semibold text-yellow-700">

                                            ⭐ {review.rating}/5

                                        </span>

                                    </div>

                                    <p className="mt-5 leading-8 text-gray-700">

                                        {review.comment}

                                    </p>

                                    <p className="mt-5 text-sm text-gray-400">

                                        {new Date(
                                            review.createdAt
                                        ).toLocaleDateString()}

                                    </p>

                                </div>

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

}

export default HotelDetails;