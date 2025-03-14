
import { api } from "./Api.jsx"; // Здесь api — это общий конфиг для запросов

export const fetchCart = async () => {
    const response = await api.get("/cart");
    return response.data;
};

export const setToCart = async (data) => {
    await api.post("/cart", data);
};