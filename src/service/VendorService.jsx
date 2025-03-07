import {api} from "./Api.jsx";
import axios from "axios";

export const fetchVendorProfile = async () => {
    const response = await api.get("/vendor/profile");
    return response.data;
};

export const createVendor = async (data) => {
    const response = await api.post("/vendor", data);
    return response.data;
};

export const updateVendor = async (id, data) => {
    const response = await api.put(`/vendor/${id}`, data);
    return response.data;
};

export const updateVendorLogo = async (id, data) => {
    const response = await api.put(`/vendor/logo/${id}`, data);
    return response.data;
};

export const fetchVendorLogo = async () => {
    try {
        const response = await api.get('/vendor/logo', { responseType: 'blob' });

        // Получаем данные из ответа
        const data = response.data;

        // Проверяем тип данных и возвращаем соответствующий формат
        if (data instanceof Blob) {
            return URL.createObjectURL(data);
        } else if (typeof data === 'string' && data.startsWith('blob:')) {
            return data;
        } else {
            throw new Error('Некорректный формат данных логотипа');
        }
    } catch (error) {
        console.error('Ошибка при получении логотипа:', error);
        throw error;
    }
};


export const deleteVendor = async (id) => {
    await api.delete(`/vendor/products/${id}`);
};
