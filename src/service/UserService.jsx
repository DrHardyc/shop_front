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
        localStorage.clear(); // Очищаем локальное хранилище
        // window.location.href = "/"; // Перенаправляем на страницу входа
    }

}
