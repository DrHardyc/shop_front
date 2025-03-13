import { api } from "./Api.jsx"; // Здесь api — это общий конфиг для запросов

export const fetchVendorProducts = async () => {
    const response = await api.get("/vendor/products");
    return response.data;
};

export const createProduct = async (productData) => {
    const response = await api.post("/vendor/products", productData);
    return response.data;
};

export const updateProduct = async (productData) => {
    const response = await api.put(`/vendor/products`, productData);
    return response.data;
};

export const deleteProduct = async (id) => {
    await api.delete(`/vendor/products/${id}`);
};

export const testproduct = async (productData) => {
    await api.post("http://localhost:8080/test", productData,{
        headers: {
            // Не указываем Content-Type вручную!
            // Axios сам проставит multipart/form-data с правильным boundary
        },
    });
}
