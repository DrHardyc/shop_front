import { api } from "./Api.jsx";

export default class UserService{

    static async login(userData){
        const response = await api.post('/auth/login', userData)
        return response.data;
    }

    static async register(userData){
        const response = await api.post('/auth/register', userData)
        return response.data;
    }

    static async logout(){
        const refreshToken = JSON.parse(localStorage.getItem("user"))?.refreshToken;
        if (!refreshToken) return;

        try {
            await api.post("/auth/logout", { refreshToken });
        } catch (error) {
            console.error("Ошибка при выходе", error);
        }

        localStorage.clear(); // Очищаем локальное хранилище
        window.location.href = "/login"; // Перенаправляем на страницу входа
    }
    static async refreshToken() {
        const refreshToken = JSON.parse(localStorage.getItem("user"))?.refreshToken;
        if (!refreshToken) return null;

        try {
            const response = await api.post('/auth/refresh', { refreshToken });
            return response.data;
        } catch (error) {
            console.error("Ошибка обновления токена", error);
            return null;
        }
    }
}
