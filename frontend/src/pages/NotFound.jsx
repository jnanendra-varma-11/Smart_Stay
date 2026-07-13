import { Link } from "react-router-dom";

function NotFound() {

    return (

        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6">

            <div className="text-center">

                <h1 className="text-8xl font-bold text-rose-500">

                    404

                </h1>

                <h2 className="mt-5 text-4xl font-bold">

                    Page Not Found

                </h2>

                <p className="mt-4 text-gray-600">

                    The page you are looking for doesn't exist.

                </p>

                <Link
                    to="/"
                    className="mt-8 inline-block rounded-full bg-rose-500 px-8 py-3 font-semibold text-white hover:bg-rose-600"
                >

                    Back to Home

                </Link>

            </div>

        </div>

    );

}

export default NotFound;