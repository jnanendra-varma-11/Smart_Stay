import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function EditHotel() {

    const { id } = useParams();

    const navigate = useNavigate();

    const { token } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        location: "",
        description: "",
        startingPrice: "",
        images: "",
        amenities: "",
    });

    useEffect(() => {

        fetchHotel();

    }, []);

    const fetchHotel = async () => {

        try {

            const response = await api.get(`/hotels/${id}`);

            const hotel = response.data.hotel;

            setFormData({

                name: hotel.name,

                location: hotel.location,

                description: hotel.description,

                startingPrice: hotel.startingPrice,

                images: hotel.images[0] || "",

                amenities: hotel.amenities.join(", "),

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

                `/hotels/${id}`,

                {

                    name: formData.name,

                    location: formData.location,

                    description: formData.description,

                    startingPrice: Number(formData.startingPrice),

                    images: [formData.images],

                    amenities: formData.amenities
                        .split(",")
                        .map(item => item.trim()),

                },

                {

                    headers: {

                        Authorization: `Bearer ${token}`,

                    },

                }

            );

            alert("Hotel Updated Successfully");

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

                        Edit Hotel

                    </h1>

                    <p className="mt-4 text-lg text-gray-500">

                        Update your hotel information below.

                    </p>

                </div>

                <div className="rounded-3xl bg-white p-10 shadow-xl">

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-7"
                    >

                        <div>

                            <label className="mb-2 block text-lg font-semibold text-gray-700">

                                Hotel Name

                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-rose-500"
                                required
                            />

                        </div>

                        <div>

                            <label className="mb-2 block text-lg font-semibold text-gray-700">

                                Location

                            </label>

                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-rose-500"
                                required
                            />

                        </div>

                        <div>

                            <label className="mb-2 block text-lg font-semibold text-gray-700">

                                Description

                            </label>

                            <textarea
                                rows="5"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-rose-500"
                                required
                            />

                        </div>

                        <div className="grid gap-6 md:grid-cols-2">

                            <div>

                                <label className="mb-2 block text-lg font-semibold text-gray-700">

                                    Starting Price (₹)

                                </label>

                                <input
                                    type="number"
                                    name="startingPrice"
                                    value={formData.startingPrice}
                                    onChange={handleChange}
                                    className="w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-rose-500"
                                    required
                                />

                            </div>

                            <div>

                                <label className="mb-2 block text-lg font-semibold text-gray-700">

                                    Hotel Image URL

                                </label>

                                <input
                                    type="text"
                                    name="images"
                                    value={formData.images}
                                    onChange={handleChange}
                                    className="w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-rose-500"
                                    required
                                />

                            </div>

                        </div>

                        <div>

                            <label className="mb-2 block text-lg font-semibold text-gray-700">

                                Amenities

                            </label>

                            <input
                                type="text"
                                name="amenities"
                                value={formData.amenities}
                                onChange={handleChange}
                                className="w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-rose-500"
                                required
                            />

                            <p className="mt-2 text-sm text-gray-500">

                                Separate multiple amenities using commas.

                            </p>

                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-full bg-rose-500 py-4 text-lg font-semibold text-white transition hover:bg-rose-600"
                        >

                            Update Hotel

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default EditHotel;