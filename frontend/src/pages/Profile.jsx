import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Profile() {

    const { user } = useAuth();

    if (!user) {

        return (

            <div className="flex min-h-screen items-center justify-center">

                <h1 className="text-3xl font-bold">

                    Loading...

                </h1>

            </div>

        );

    }

    return (

        <div className="min-h-screen bg-gray-50 py-16">

            <div className="mx-auto max-w-3xl">

                <div className="rounded-3xl bg-white p-10 shadow-xl">

                    <div className="text-center">

                        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-rose-100 text-6xl">

                            👤

                        </div>

                        <h1 className="mt-6 text-4xl font-bold">

                            {user.name}

                        </h1>

                        <p className="mt-2 text-gray-500">

                            {user.email}

                        </p>

                    </div>

                    <hr className="my-10" />

                    <div className="space-y-6">

                        <div className="flex items-center justify-between rounded-2xl bg-gray-100 p-5">

                            <span className="text-lg font-semibold">

                                Name

                            </span>

                            <span className="text-gray-700">

                                {user.name}

                            </span>

                        </div>

                        <div className="flex items-center justify-between rounded-2xl bg-gray-100 p-5">

                            <span className="text-lg font-semibold">

                                Email

                            </span>

                            <span className="text-gray-700">

                                {user.email}

                            </span>

                        </div>

                        <div className="flex items-center justify-between rounded-2xl bg-gray-100 p-5">

                            <span className="text-lg font-semibold">

                                Role

                            </span>

                            <span
                                className={`rounded-full px-4 py-2 font-semibold ${
                                    user.role === "admin"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                }`}
                            >

                                {user.role}

                            </span>

                        </div>

                    </div>

                    <div className="mt-10">

                        {

                            user.role === "admin" ? (

                                <Link
                                    to="/admin"
                                    className="block w-full rounded-full bg-rose-500 py-4 text-center text-lg font-semibold text-white transition hover:bg-rose-600"
                                >

                                    Go to Admin Dashboard

                                </Link>

                            ) : (

                                <Link
                                    to="/become-admin"
                                    className="block w-full rounded-full bg-rose-500 py-4 text-center text-lg font-semibold text-white transition hover:bg-rose-600"
                                >

                                    Become an Admin

                                </Link>

                            )

                        }

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Profile;