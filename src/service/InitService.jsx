
import { api } from "./Api.jsx";

export default class InitService {

    static async menu(userData) {
        const response = await api.post('/init/menu', userData)
        return response.data;
    }
}
