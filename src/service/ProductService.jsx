import { api } from "./Api.jsx"; // Здесь api — это общий конфиг для запросов

export const fetchAllProducts = async () => {
    const response = await api.get("/product");
    return response.data;
};