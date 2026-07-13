import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function SuperAdminDashboard() {

    const { token } = useAuth();

    const [requests, setRequests] = useState([]);

    const [loading, setLoading] = useState(true);

    const fetchRequests = async () => {

        try {

            const response = await api.get(

                "/admin-requests/pending",

                {

                    headers: {

                        Authorization: `Bearer ${token}`,

                    },

                }

            );

            setRequests(response.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchRequests();

    }, []);

    const approveRequest = async (id) => {

        try {

            const response = await api.put(

                `/admin-requests/approve/${id}`,

                {},

                {

                    headers: {

                        Authorization: `Bearer ${token}`,

                    },

                }

            );

            alert(response.data.message);

            fetchRequests();

        } catch (error) {

            alert(

                error.response?.data?.message ||

                "Approval Failed"

            );

        }

    };

    const rejectRequest = async (id) => {

        try {

            const response = await api.put(

                `/admin-requests/reject/${id}`,

                {},

                {

                    headers: {

                        Authorization: `Bearer ${token}`,

                    },

                }

            );

            alert(response.data.message);

            fetchRequests();

        } catch (error) {

            alert(

                error.response?.data?.message ||

                "Rejection Failed"

            );

        }

    };

    if (loading) {

        return (

            <h1 className="mt-20 text-center text-3xl font-bold">

                Loading...

            </h1>

        );

    }

    return (

        <div className="min-h-screen bg-gray-100">

            <div className="mx-auto max-w-7xl p-10">

                <h1 className="mb-10 text-center text-5xl font-bold">

                    Super Admin Dashboard

                </h1>

                {

                    requests.length === 0 ? (

                        <div className="rounded-2xl bg-white p-12 text-center shadow">

                            <h2 className="text-2xl font-bold">

                                No Pending Requests

                            </h2>

                        </div>

                    ) : (

                        <div className="space-y-6">

                            {

                                requests.map((request) => (

                                    <div
                                        key={request._id}
                                        className="rounded-2xl bg-white p-8 shadow"
                                    >

                                        <h2 className="text-2xl font-bold">

                                            {request.user.name}

                                        </h2>

                                        <p className="mt-2">

                                            <strong>Email :</strong>{" "}

                                            {request.user.email}

                                        </p>

                                        <p>

                                            <strong>Business :</strong>{" "}

                                            {request.businessName}

                                        </p>

                                        <p>

                                            <strong>Phone :</strong>{" "}

                                            {request.phone}

                                        </p>

                                        <p>

                                            <strong>Address :</strong>{" "}

                                            {request.address}

                                        </p>

                                        <div className="mt-6 flex gap-4">

                                            <button
                                                onClick={() => approveRequest(request._id)}
                                                className="rounded-xl bg-green-600 px-6 py-3 text-white hover:bg-green-700"
                                            >

                                                Approve

                                            </button>

                                            <button
                                                onClick={() => rejectRequest(request._id)}
                                                className="rounded-xl bg-red-600 px-6 py-3 text-white hover:bg-red-700"
                                            >

                                                Reject

                                            </button>

                                        </div>

                                    </div>

                                ))

                            }

                        </div>

                    )

                }

            </div>

        </div>

    );

}

export default SuperAdminDashboard;