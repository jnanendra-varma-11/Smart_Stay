import { Link } from "react-router-dom";

function Unauthorized() {

    return (

        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6">

            <div className="text-center">

                <h1 className="text-8xl font-bold text-yellow-500">

                    403

                </h1>

                <h2 className="mt-5 text-4xl font-bold">

                    Unauthorized

                </h2>

                <p className="mt-4 text-gray-600">

                    You don't have permission to access this page.

                </p>

                <Link
                    to="/"
                    className="mt-8 inline-block rounded-full bg-rose-500 px-8 py-3 font-semibold text-white hover:bg-rose-600"
                >

                    Go Home

                </Link>

            </div>

        </div>

    );

}

export default Unauthorized;