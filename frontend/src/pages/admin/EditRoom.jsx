import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function EditRoom() {

    const { id } = useParams();

    const navigate = useNavigate();

    const { token } = useAuth();

    const [hotels, setHotels] = useState([]);

    const [formData, setFormData] = useState({
        hotel: "",
        roomNumber: "",
        roomType: "Standard",
        price: "",
        capacity: "",
    });

    useEffect(() => {

        fetchHotels();

        fetchRoom();

    }, []);

    const fetchHotels = async () => {

        try {

            const response = await api.get("/hotels");

            setHotels(response.data.hotels || response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const fetchRoom = async () => {

        try {

            const response = await api.get("/rooms");

            const room = response.data.find(
                (r) => r._id === id
            );

            setFormData({

                hotel: room.hotel._id,

                roomNumber: room.roomNumber,

                roomType: room.roomType,

                price: room.price,

                capacity: room.capacity,

            });

        } catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.put(

                `/rooms/${id}`,

                {

                    hotel: formData.hotel,

                    roomNumber: formData.roomNumber,

                    roomType: formData.roomType,

                    price: Number(formData.price),

                    capacity: Number(formData.capacity),

                },

                {

                    headers: {

                        Authorization: `Bearer ${token}`,

                    },

                }

            );

            alert("Room Updated Successfully");

            navigate("/admin");

        } catch (error) {

            alert(

                error.response?.data?.message ||

                "Update Failed"

            );

        }

    };

    return (

        <div className="min-h-screen bg-gray-50 py-16">

            <div className="mx-auto max-w-4xl">

                <div className="mb-10 text-center">

                    <h1 className="text-5xl font-bold text-gray-900">

                        Edit Room

                    </h1>

                    <p className="mt-4 text-lg text-gray-500">

                        Update room information below.

                    </p>

                </div>

                <div className="rounded-3xl bg-white p-10 shadow-xl">

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-7"
                    >

                        <div>

                            <label className="mb-2 block text-lg font-semibold text-gray-700">

                                Select Hotel

                            </label>

                            <select
                                name="hotel"
                                value={formData.hotel}
                                onChange={handleChange}
                                className="w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-rose-500"
                            >

                                {

                                    hotels.map((hotel) => (

                                        <option
                                            key={hotel._id}
                                            value={hotel._id}
                                        >

                                            {hotel.name}

                                        </option>

                                    ))

                                }

                            </select>

                        </div>

                        <div className="grid gap-6 md:grid-cols-2">

                            <div>

                                <label className="mb-2 block text-lg font-semibold text-gray-700">

                                    Room Number

                                </label>

                                <input
                                    type="text"
                                    name="roomNumber"
                                    value={formData.roomNumber}
                                    onChange={handleChange}
                                    className="w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-rose-500"
                                    required
                                />

                            </div>

                            <div>

                                <label className="mb-2 block text-lg font-semibold text-gray-700">

                                    Room Type

                                </label>

                                <select
                                    name="roomType"
                                    value={formData.roomType}
                                    onChange={handleChange}
                                    className="w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-rose-500"
                                >

                                    <option>Standard</option>
                                    <option>Deluxe</option>
                                    <option>Suite</option>
                                    <option>Luxury</option>

                                </select>

                            </div>

                        </div>

                        <div className="grid gap-6 md:grid-cols-2">

                            <div>

                                <label className="mb-2 block text-lg font-semibold text-gray-700">

                                    Price Per Night (₹)

                                </label>

                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-rose-500"
                                    required
                                />

                            </div>

                            <div>

                                <label className="mb-2 block text-lg font-semibold text-gray-700">

                                    Capacity

                                </label>

                                <input
                                    type="number"
                                    name="capacity"
                                    value={formData.capacity}
                                    onChange={handleChange}
                                    className="w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-rose-500"
                                    required
                                />

                            </div>

                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-full bg-rose-500 py-4 text-lg font-semibold text-white transition hover:bg-rose-600"
                        >

                            Update Room

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default EditRoom;