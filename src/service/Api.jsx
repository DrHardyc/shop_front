import axios from "axios";
import UserService from "@/service/UserService.jsx";

// Используем import.meta.env вместо process.env
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/",
    headers: {
        "Content-Type": "application/json",
    },
});

// Интерцептор запроса — добавляем токен
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Интерцептор ответа — обработка 401
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            const newTokenData = await UserService.refreshToken();
            if (newTokenData.token) {
                localStorage.removeItem("token");
                localStorage.setItem("user", newTokenData);
                error.config.headers.Authorization = `Bearer ${newTokenData.token}`;
                return api.request(error.config())
            } else {
                localStorage.clear();
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);
