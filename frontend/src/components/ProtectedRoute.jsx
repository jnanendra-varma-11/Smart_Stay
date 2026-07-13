import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({

    children,

    allowedRoles = [],

}) {

    const {

        isLoggedIn,

        loading,

        user,

    } = useAuth();

    if (loading) {

        return (

            <h1 className="mt-20 text-center text-2xl">

                Loading...

            </h1>

        );

    }

    // User is not logged in

    if (!isLoggedIn) {

        return <Navigate to="/login" replace />;

    }

    // Check role if required

    if (

        allowedRoles.length > 0 &&

        !allowedRoles.includes(user?.role)

    ) {

        return <Navigate to="/unauthorized" replace />;

    }

    return children;

}

export default ProtectedRoute;