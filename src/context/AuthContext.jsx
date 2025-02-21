import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        const checkSession = () => {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            if (storedUser?.expiresAt && new Date() > new Date(storedUser.expiresAt)) {
                logout();
            }
        };
        checkSession();
    }, []);

    const login = (authUser, expiresInMinutes = 60) => {
        const expiresAt = new Date(Date.now() + expiresInMinutes * 60000);
        const userData = { ...authUser, expiresAt };
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
