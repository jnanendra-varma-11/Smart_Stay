import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function AddHotel() {

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

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post(
                "/hotels",
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

            alert("Hotel Added Successfully");

            navigate("/admin");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to Add Hotel"
            );

        }

    };

    return (

        <div className="min-h-screen bg-gray-50 py-16">

            <div className="mx-auto max-w-4xl">

                <div className="mb-10 text-center">

                    <h1 className="text-5xl font-bold text-gray-900">

                        Add New Hotel

                    </h1>

                    <p className="mt-4 text-lg text-gray-500">

                        Fill in the details below to list a new hotel on SmartStay.

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
                                placeholder="Enter hotel name"
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
                                placeholder="City, State"
                                className="w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-rose-500"
                                required
                            />

                        </div>

                        <div>

                            <label className="mb-2 block text-lg font-semibold text-gray-700">

                                Description

                            </label>

                            <textarea
                                name="description"
                                rows="5"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Write a detailed description..."
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
                                    placeholder="2500"
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
                                    placeholder="https://..."
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
                                placeholder="WiFi, Swimming Pool, Restaurant, Gym"
                                className="w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-rose-500"
                                required
                            />

                            <p className="mt-2 text-sm text-gray-500">

                                Separate amenities using commas.

                            </p>

                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-full bg-rose-500 py-4 text-lg font-semibold text-white transition hover:bg-rose-600"
                        >

                            Add Hotel

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default AddHotel;