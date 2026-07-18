import axios from "axios";
import apiEndpoints from "../../utils/apiEndPoints/apiEndPoints";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllCategories = async () => {
    try {

        const response = await axios.get(
            `${API_BASE_URL}${apiEndpoints.GET_CATEGORIES}`
        );

        console.log("Categories:", response.data);

        return response.data;

    } catch (error) {

        console.log("Get Categories Failed", error);

        throw error;
    }
};