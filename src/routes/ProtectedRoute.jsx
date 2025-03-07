import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "@/hooks/UseAuth.jsx";

export function ProtectedRoute({ allowedRoles = [] }) {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        return (
            <div className="text-center p-4">
                <p>У вас нет доступа к этой странице.</p>
            </div>
        );
    }

    return <Outlet />;
}

ProtectedRoute.propTypes = {
    allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};