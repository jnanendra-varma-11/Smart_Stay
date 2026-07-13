import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function AdminDashboard() {

    const { token } = useAuth();

    const [hotels, setHotels] = useState([]);
    const [rooms, setRooms] = useState([]);

    const fetchHotels = async () => {

    try {

        const response = await api.get(
            "/hotels/my-hotels",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        setHotels(response.data);

    } catch (error) {

        console.log(error);

    }

};

    const fetchRooms = async () => {

    try {

        const response = await api.get(
            "/rooms/my-rooms",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        setRooms(response.data);

    } catch (error) {

        console.log(error);

    }

};
    useEffect(() => {

        fetchHotels();
        fetchRooms();

    }, []);

    const deleteHotel = async (id) => {

        if (!window.confirm("Delete this hotel?")) return;

        try {

            await api.delete(`/hotels/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert("Hotel Deleted Successfully");

            fetchHotels();
            fetchRooms();

        } catch (error) {

            alert(error.response?.data?.message || "Delete Failed");

        }

    };

    const deleteRoom = async (id) => {

        if (!window.confirm("Delete this room?")) return;

        try {

            await api.delete(`/rooms/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert("Room Deleted Successfully");

            fetchRooms();

        } catch (error) {

            alert(error.response?.data?.message || "Delete Failed");

        }

    };

    return (

        <div className="min-h-screen bg-gray-50">

            <div className="mx-auto max-w-7xl px-8 py-12">

                {/* Header */}

                <div className="mb-12">

                    <h1 className="text-5xl font-bold text-gray-900">

                        Admin Dashboard

                    </h1>

                    <p className="mt-3 text-lg text-gray-500">

                        Manage hotels and rooms from one place.

                    </p>

                </div>

                {/* Statistics */}

<div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

    <div className="rounded-3xl bg-white p-8 shadow">

        <p className="text-gray-500">

            Hotels

        </p>

        <h2 className="mt-3 text-5xl font-bold text-rose-500">

            {hotels.length}

        </h2>

    </div>

    <div className="rounded-3xl bg-white p-8 shadow">

        <p className="text-gray-500">

            Rooms

        </p>

        <h2 className="mt-3 text-5xl font-bold text-rose-500">

            {rooms.length}

        </h2>

    </div>

    <div className="rounded-3xl bg-white p-8 shadow">

        <p className="text-gray-500">

            Total Capacity

        </p>

        <h2 className="mt-3 text-5xl font-bold text-green-600">

            {rooms.reduce(
                (total, room) => total + room.capacity,
                0
            )}

        </h2>

    </div>

    <div className="rounded-3xl bg-white p-8 shadow">

        <p className="text-gray-500">

            Average Price

        </p>

        <h2 className="mt-3 text-5xl font-bold text-blue-600">

            ₹
            {
                rooms.length
                    ? Math.round(
                        rooms.reduce(
                            (sum, room) => sum + room.price,
                            0
                        ) / rooms.length
                    )
                    : 0
            }

        </h2>

    </div>

</div>

                {/* Quick Actions */}

                <div className="mb-14 flex flex-wrap gap-5">

                    <Link
                        to="/admin/add-hotel"
                        className="rounded-full bg-rose-500 px-8 py-4 text-lg font-semibold text-white transition hover:bg-rose-600"
                    >

                        + Add Hotel

                    </Link>

                    <Link
                        to="/admin/add-room"
                        className="rounded-full bg-gray-900 px-8 py-4 text-lg font-semibold text-white transition hover:bg-black"
                    >

                        + Add Room

                    </Link>

                </div>

                {/* Hotels */}

                <h2 className="mb-8 text-4xl font-bold">

                    Manage Hotels

                </h2>

                <div className="space-y-6">

                    {

                        hotels.map((hotel) => (

                            <div
                                key={hotel._id}
                                className="rounded-3xl bg-white p-8 shadow transition hover:shadow-xl"
                            >

                                <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

                                    <div>

                                        <h3 className="text-3xl font-bold">

                                            {hotel.name}

                                        </h3>

                                        <p className="mt-3 text-gray-500">

                                            📍 {hotel.location}

                                        </p>

                                        <h4 className="mt-4 text-2xl font-bold text-rose-500">

                                            ₹ {hotel.startingPrice}

                                        </h4>

                                    </div>

                                    <div className="flex gap-4">

                                        <Link
                                            to={`/admin/edit-hotel/${hotel._id}`}
                                            className="rounded-full bg-yellow-500 px-6 py-3 font-semibold text-white hover:bg-yellow-600"
                                        >

                                            Edit

                                        </Link>

                                        <button
                                            onClick={() => deleteHotel(hotel._id)}
                                            className="rounded-full bg-red-500 px-6 py-3 font-semibold text-white hover:bg-red-600"
                                        >

                                            Delete

                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))

                    }

                </div>

                {/* Rooms */}

                <h2 className="mb-8 mt-20 text-4xl font-bold">

                    Manage Rooms

                </h2>

                <div className="space-y-6">

                    {

                        rooms.map((room) => (

                            <div
                                key={room._id}
                                className="rounded-3xl bg-white p-8 shadow transition hover:shadow-xl"
                            >

                                <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

                                    <div>

                                        <h3 className="text-3xl font-bold">

                                            Room {room.roomNumber}

                                        </h3>

                                        <p className="mt-3 text-gray-500">

                                            Hotel : {room.hotel?.name}

                                        </p>

                                        <p className="mt-2 text-gray-500">

                                            {room.roomType}

                                        </p>

                                        <h4 className="mt-4 text-2xl font-bold text-rose-500">

                                            ₹ {room.price}

                                        </h4>

                                    </div>

                                    <div className="flex gap-4">

                                        <Link
                                            to={`/admin/edit-room/${room._id}`}
                                            className="rounded-full bg-yellow-500 px-6 py-3 font-semibold text-white hover:bg-yellow-600"
                                        >

                                            Edit

                                        </Link>

                                        <button
                                            onClick={() => deleteRoom(room._id)}
                                            className="rounded-full bg-red-500 px-6 py-3 font-semibold text-white hover:bg-red-600"
                                        >

                                            Delete

                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))

                    }

                </div>

            </div>

        </div>

    );

}

export default AdminDashboard;