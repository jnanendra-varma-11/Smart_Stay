import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Hotels from "./pages/Hotels";
import HotelDetails from "./pages/HotelDetails";

// User Pages
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";
import BecomeAdmin from "./pages/BecomeAdmin";
import Review from "./pages/Review";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import AddHotel from "./pages/admin/AddHotel";
import EditHotel from "./pages/admin/EditHotel";
import AddRoom from "./pages/admin/AddRoom";
import EditRoom from "./pages/admin/EditRoom";

// Super Admin
import SuperAdminDashboard from "./pages/SuperAdminDashboard";

// Error Pages
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

function App() {

    return (

        <MainLayout>

            <Routes>

                {/* Public Routes */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/hotels"
                    element={<Hotels />}
                />

                <Route
                    path="/hotels/:id"
                    element={<HotelDetails />}
                />

                {/* User Routes */}

                <Route
                    path="/booking/:roomId"
                    element={
                        <ProtectedRoute>
                            <Booking />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/my-bookings"
                    element={
                        <ProtectedRoute>
                            <MyBookings />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/review/:bookingId"
                    element={
                        <ProtectedRoute>
                            <Review />
                        </ProtectedRoute>
                    }
                />

                {/* Become Admin */}

                <Route
                    path="/become-admin"
                    element={
                        <ProtectedRoute
                            allowedRoles={["user"]}
                        >
                            <BecomeAdmin />
                        </ProtectedRoute>
                    }
                />

                {/* Admin Routes */}

                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute
                            allowedRoles={["admin", "superadmin"]}
                        >
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/add-hotel"
                    element={
                        <ProtectedRoute
                            allowedRoles={["admin", "superadmin"]}
                        >
                            <AddHotel />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/edit-hotel/:id"
                    element={
                        <ProtectedRoute
                            allowedRoles={["admin", "superadmin"]}
                        >
                            <EditHotel />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/add-room"
                    element={
                        <ProtectedRoute
                            allowedRoles={["admin", "superadmin"]}
                        >
                            <AddRoom />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/edit-room/:id"
                    element={
                        <ProtectedRoute
                            allowedRoles={["admin", "superadmin"]}
                        >
                            <EditRoom />
                        </ProtectedRoute>
                    }
                />

                {/* Super Admin */}

                <Route
                    path="/super-admin"
                    element={
                        <ProtectedRoute
                            allowedRoles={["superadmin"]}
                        >
                            <SuperAdminDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Error Pages */}

                <Route
                    path="/unauthorized"
                    element={<Unauthorized />}
                />

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>

        </MainLayout>

    );

}

export default App;