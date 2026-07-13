import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminRoute({ children }) {

    const { loading, isLoggedIn, user } = useAuth();

    if (loading) {

        return <h1 className="mt-20 text-center">Loading...</h1>;

    }

    if (!isLoggedIn) {

        return <Navigate to="/login" replace />;

    }

    if (user?.role !== "admin") {

        return <Navigate to="/" replace />;

    }

    return children;

}

export default AdminRoute;