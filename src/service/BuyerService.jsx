

import { api } from "./Api.jsx"; // Здесь api — это общий конфиг для запросов

export const fetchBuyerProfile = async () => {
    const response = await api.get("/buyer/profile");
    return response.data;
};

export const updateBuyer = async (data) => {
    await api.put("/buyer", data);
};