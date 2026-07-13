import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function AddRoom() {

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

    }, []);

    const fetchHotels = async () => {

        try {

            const response = await api.get("/hotels");

            setHotels(response.data.hotels || response.data);

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

            await api.post(
                "/rooms",
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

            alert("Room Added Successfully");

            navigate("/admin");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to Add Room"
            );

        }

    };

    return (

        <div className="min-h-screen bg-gray-100 py-10">

            <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow-lg">

                <h1 className="mb-8 text-center text-4xl font-bold">

                    Add Room

                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <select
                        name="hotel"
                        value={formData.hotel}
                        onChange={handleChange}
                        className="w-full rounded-lg border p-3"
                        required
                    >

                        <option value="">

                            Select Hotel

                        </option>

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

                    <input
                        type="text"
                        name="roomNumber"
                        placeholder="Room Number"
                        value={formData.roomNumber}
                        onChange={handleChange}
                        className="w-full rounded-lg border p-3"
                        required
                    />

                    <select
                        name="roomType"
                        value={formData.roomType}
                        onChange={handleChange}
                        className="w-full rounded-lg border p-3"
                    >

                        <option>Standard</option>

                        <option>Deluxe</option>

                        <option>Suite</option>

                        <option>Luxury</option>

                    </select>

                    <input
                        type="number"
                        name="price"
                        placeholder="Room Price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full rounded-lg border p-3"
                        required
                    />

                    <input
                        type="number"
                        name="capacity"
                        placeholder="Capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                        className="w-full rounded-lg border p-3"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-green-700 py-3 text-lg font-semibold text-white hover:bg-green-800"
                    >

                        Add Room

                    </button>

                </form>

            </div>

        </div>

    );

}

export default AddRoom;