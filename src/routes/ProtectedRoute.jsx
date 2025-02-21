import {Navigate, Outlet} from "react-router-dom";
import PropTypes from "prop-types";
import {useAuth} from "@/hooks/UseAuth.jsx"; // Контекст аутентификации

export function ProtectedRoute({ allowedRoles }) {
    const { user } = useAuth(); // Получаем пользователя из контекста

    if (!user) {
        return <Navigate to="/login" replace />; // Если не авторизован — редирект на /login
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />; // Если нет прав — редирект на главную
    }

    return <Outlet />;
}

ProtectedRoute.propTypes = {
    allowedRoles: PropTypes.array.isRequired,
}
