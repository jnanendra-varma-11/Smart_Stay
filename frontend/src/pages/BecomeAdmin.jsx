import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function BecomeAdmin() {

    const navigate = useNavigate();

    const { token } = useAuth();

    const [formData, setFormData] = useState({

        businessName: "",

        phone: "",

        address: "",

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

            const response = await api.post(

                "/admin-requests",

                formData,

                {

                    headers: {

                        Authorization: `Bearer ${token}`,

                    },

                }

            );

            alert(response.data.message);

            navigate("/");

        } catch (error) {

            alert(

                error.response?.data?.message ||

                "Failed to submit request."

            );

        }

    };

    return (

        <div className="min-h-screen bg-gray-50 py-16">

            <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 shadow-xl">

                <h1 className="mb-3 text-center text-5xl font-bold">

                    Become an Admin

                </h1>

                <p className="mb-10 text-center text-gray-500">

                    Submit your business details for verification.

                    A Super Admin will review your application.

                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-7"
                >

                    <div>

                        <label className="mb-2 block font-semibold">

                            Business Name

                        </label>

                        <input
                            type="text"
                            name="businessName"
                            value={formData.businessName}
                            onChange={handleChange}
                            className="w-full rounded-2xl border p-4"
                            required
                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-semibold">

                            Phone Number

                        </label>

                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full rounded-2xl border p-4"
                            required
                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-semibold">

                            Business Address

                        </label>

                        <textarea
                            rows="4"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full rounded-2xl border p-4"
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-full bg-rose-500 py-4 text-lg font-semibold text-white transition hover:bg-rose-600"
                    >

                        Submit Request

                    </button>

                </form>

            </div>

        </div>

    );

}

export default BecomeAdmin;