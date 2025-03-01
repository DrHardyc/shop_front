import { api } from "./Api.jsx"; // Здесь api — это общий конфиг для запросов

export const fetchVendorProfile = async () => {
    const response = await api.get("/vendor");
    return response.data;
};

export const createVendor = async (productData) => {
    const response = await api.post("/vendor", productData);
    return response.data;
};

export const updateVendor = async (id, productData) => {
    const response = await api.put(`/vendor/${id}`, productData);
    return response.data;
};

export const deleteVendor = async (id) => {
    await api.delete(`/vendor/products/${id}`);
};
