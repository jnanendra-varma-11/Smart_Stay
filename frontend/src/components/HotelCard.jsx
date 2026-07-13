import { Link } from "react-router-dom";

function HotelCard({ hotel }) {

    return (

        <div className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl">

            {/* Hotel Image */}

            <div className="relative overflow-hidden">

                <img
                    src={
                        hotel.images?.[0] ||
                        "https://via.placeholder.com/600x400?text=Hotel"
                    }
                    alt={hotel.name}
                    className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
                />

                <span className="absolute left-4 top-4 rounded-full bg-white px-4 py-1 text-sm font-semibold text-gray-800 shadow">

                    ⭐ 4.8

                </span>

            </div>

            {/* Content */}

            <div className="p-6">

                <div className="flex items-start justify-between">

                    <div>

                        <h2 className="text-2xl font-bold text-gray-900">

                            {hotel.name}

                        </h2>

                        <p className="mt-2 text-gray-500">

                            📍 {hotel.location}

                        </p>

                    </div>

                </div>

                <p className="mt-5 line-clamp-2 text-gray-600">

                    {hotel.description}

                </p>

                {/* Amenities */}

                <div className="mt-5 flex flex-wrap gap-2">

                    {

                        hotel.amenities?.slice(0, 3).map((item, index) => (

                            <span
                                key={index}
                                className="rounded-full bg-rose-50 px-3 py-1 text-sm font-medium text-rose-600"
                            >

                                {item}

                            </span>

                        ))

                    }

                </div>

                {/* Price */}

                <div className="mt-6 flex items-center justify-between">

                    <div>

                        <p className="text-sm text-gray-500">

                            Starting From

                        </p>

                        <h3 className="text-3xl font-bold text-rose-500">

                            ₹ {hotel.startingPrice}

                        </h3>

                        <span className="text-gray-500">

                            / night

                        </span>

                    </div>

                </div>

                {/* Button */}

                <Link to={`/hotels/${hotel._id}`}>

                    <button className="mt-7 w-full rounded-full bg-rose-500 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-rose-600">

                        View Details →

                    </button>

                </Link>

            </div>

        </div>

    );

}

export default HotelCard;