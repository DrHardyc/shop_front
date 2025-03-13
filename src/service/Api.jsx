import axios from "axios";

// Используем import.meta.env вместо process.env
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/",
});

// Интерцептор запроса — добавляем токен
api.interceptors.request.use(
    (config) => {
        const userData = localStorage.getItem("user");
        if (userData) {
            const { token } = JSON.parse(userData);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
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
            localStorage.clear();
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

// Добавляем интерceptor для ошибки 404
api.interceptors.response.use(
    response => response,
    error => {
        // Проверяем код статуса
        if (error.response && error.response.status === 404) {
            // Обрабатываем ошибку 404
            console.error('Страница не найдена');
            // Можно также перенаправить на страницу 404
            // window.location.href = '/404';

            // Возвращаем промис с ошибкой
            return Promise.reject(error);
        }

        // Для других ошибок просто возвращаем ошибку
        return Promise.reject(error);
    }
);

