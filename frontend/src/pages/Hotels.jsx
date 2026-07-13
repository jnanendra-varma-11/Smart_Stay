import { useEffect, useState } from "react";
import HotelCard from "../components/HotelCard";
import api from "../services/api";

function Hotels() {

    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [location, setLocation] = useState("");

    const [minPrice, setMinPrice] = useState("");

    const [maxPrice, setMaxPrice] = useState("");

    const [amenity, setAmenity] = useState("");

    const [sort, setSort] = useState("");

    const fetchHotels = async () => {

        try {

            setLoading(true);

            const response = await api.get("/hotels");

            setHotels(response.data.hotels || response.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchHotels();

    }, []);

    const handleSearch = async () => {

        try {

            setLoading(true);

            if (search.trim() === "") {

                fetchHotels();

                return;

            }

            const response = await api.get(

                `/hotels/search?name=${search}`

            );

            setHotels(response.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const handleFilter = async () => {

        try {

            setLoading(true);

            const response = await api.get(

                `/hotels/filter?location=${location}&minPrice=${minPrice}&maxPrice=${maxPrice}&amenity=${amenity}`

            );

            let filteredHotels = response.data;

            if (sort === "price_asc") {

                filteredHotels.sort(

                    (a, b) => a.startingPrice - b.startingPrice

                );

            }

            else if (sort === "price_desc") {

                filteredHotels.sort(

                    (a, b) => b.startingPrice - a.startingPrice

                );

            }

            else if (sort === "newest") {

                filteredHotels.sort(

                    (a, b) =>

                        new Date(b.createdAt) -

                        new Date(a.createdAt)

                );

            }

            else if (sort === "oldest") {

                filteredHotels.sort(

                    (a, b) =>

                        new Date(a.createdAt) -

                        new Date(b.createdAt)

                );

            }

            setHotels(filteredHotels);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const resetFilters = () => {

        setSearch("");

        setLocation("");

        setMinPrice("");

        setMaxPrice("");

        setAmenity("");

        setSort("");

        fetchHotels();

    };

    if (loading) {

        return (

            <div className="flex min-h-[80vh] items-center justify-center">

                <div className="text-center">

                    <div className="mx-auto mb-5 h-14 w-14 animate-spin rounded-full border-4 border-gray-200 border-t-rose-500"></div>

                    <h2 className="text-3xl font-bold text-gray-800">

                        Loading Hotels...

                    </h2>

                    <p className="mt-3 text-gray-500">

                        Finding the best places for you.

                    </p>

                </div>

            </div>

        );

    }

    return (

        <div className="min-h-screen bg-gray-50">

            {/* Hero */}

            <section className="bg-gradient-to-r from-rose-500 via-red-500 to-pink-500 py-20">

                <div className="mx-auto max-w-7xl px-8 text-center text-white">

                    <h1 className="text-6xl font-bold">

                        Explore Hotels

                    </h1>

                    <p className="mx-auto mt-6 max-w-3xl text-xl text-white/90">

                        Discover premium hotels, luxury resorts and
                        budget-friendly stays across India.

                    </p>

                </div>

            </section>

            {/* Search & Filters */}

            <section className="mx-auto -mt-12 max-w-7xl px-8">

                <div className="rounded-3xl bg-white p-8 shadow-xl">

                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                        <input
                            type="text"
                            placeholder="Search Hotel Name"
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            className="rounded-xl border p-3"
                        />

                        <input
                            type="text"
                            placeholder="Location"
                            value={location}
                            onChange={(e) =>
                                setLocation(e.target.value)
                            }
                            className="rounded-xl border p-3"
                        />

                        <input
                            type="number"
                            placeholder="Min Price"
                            value={minPrice}
                            onChange={(e) =>
                                setMinPrice(e.target.value)
                            }
                            className="rounded-xl border p-3"
                        />

                        <input
                            type="number"
                            placeholder="Max Price"
                            value={maxPrice}
                            onChange={(e) =>
                                setMaxPrice(e.target.value)
                            }
                            className="rounded-xl border p-3"
                        />

                        <input
                            type="text"
                            placeholder="Amenity (WiFi)"
                            value={amenity}
                            onChange={(e) =>
                                setAmenity(e.target.value)
                            }
                            className="rounded-xl border p-3"
                        />

                        <select
                            value={sort}
                            onChange={(e) =>
                                setSort(e.target.value)
                            }
                            className="rounded-xl border p-3"
                        >

                            <option value="">

                                Sort By

                            </option>

                            <option value="price_asc">

                                Price Low → High

                            </option>

                            <option value="price_desc">

                                Price High → Low

                            </option>

                            <option value="newest">

                                Newest

                            </option>

                            <option value="oldest">

                                Oldest

                            </option>

                        </select>

                    </div>

                    <div className="mt-6 flex flex-wrap gap-4">
                                            <button
                            onClick={handleSearch}
                            className="rounded-xl bg-rose-500 px-6 py-3 font-semibold text-white transition hover:bg-rose-600"
                        >
                            Search
                        </button>

                        <button
                            onClick={handleFilter}
                            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                        >
                            Apply Filters
                        </button>

                        <button
                            onClick={resetFilters}
                            className="rounded-xl bg-gray-200 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-300"
                        >
                            Reset
                        </button>

                    </div>

                </div>

            </section>

            {/* Hotels */}

            <section className="mx-auto max-w-7xl px-8 py-16">

                {

                    hotels.length === 0 ? (

                        <div className="rounded-3xl bg-white py-20 text-center shadow">

                            <div className="text-7xl">

                                🏨

                            </div>

                            <h2 className="mt-6 text-3xl font-bold text-gray-800">

                                No Hotels Found

                            </h2>

                            <p className="mt-4 text-gray-500">

                                Try changing your search or filters.

                            </p>

                            <button
                                onClick={resetFilters}
                                className="mt-8 rounded-full bg-rose-500 px-8 py-3 font-semibold text-white transition hover:bg-rose-600"
                            >
                                View All Hotels
                            </button>

                        </div>

                    ) : (

                        <>

                            <div className="mb-8 flex items-center justify-between">

                                <h2 className="text-3xl font-bold text-gray-800">

                                    {hotels.length} Hotel{hotels.length !== 1 ? "s" : ""} Found

                                </h2>

                            </div>

                            <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">

                                {

                                    hotels.map((hotel) => (

                                        <HotelCard
                                            key={hotel._id}
                                            hotel={hotel}
                                        />

                                    ))

                                }

                            </div>

                        </>

                    )

                }

            </section>

        </div>

    );

}

export default Hotels;