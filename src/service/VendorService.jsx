import {api} from "./Api.jsx";

export const fetchVendorProfile = async () => {
    const response = await api.get(`/vendor/profile`);
    return response.data;
};

export const createVendor = async (data) => {
    const response = await api.post(`/vendor`, data);
    return response.data;
};

export const updateVendor = async (data) => {
    await api.put(`/vendor`, data);
};

export const deleteVendor = async (id) => {
    await api.delete(`/vendor/products/${id}`);
};
