import { api } from "./Api.jsx"; // Здесь api — это общий конфиг для запросов

export const fetchVendorProducts = async () => {
    const response = await api.get("/vendor/products");
    return response.data;
};

export const createProduct = async (productData) => {
    const response = await api.post("/vendor/products", productData);
    return response.data;
};

export const updateProduct = async (id, productData) => {
    const response = await api.put(`/vendor/products/${id}`, productData);
    return response.data;
};

export const deleteProduct = async (id) => {
    await api.delete(`/vendor/products/${id}`);
};
