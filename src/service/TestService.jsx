import {api} from "./Api.jsx";

export const test = async (id, productData) => {
    const response = await api.put(`/test`, productData);
    return response.data;
};