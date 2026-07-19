import axios from "axios";
import apiEndpoints from "../../utils/apiEndPoints/apiEndPoints";
import API_BASE_URL from "../apiBaseUrl";

// export const getAllProducts = async () => {
//     try {

//         const response = await axios.get(
//             `${API_BASE_URL}${apiEndpoints.GET_PRODUCTS}`
//         );

//         console.log("getallproducts:", response.data);

//         return response.data;

//     } catch (error) {

//         console.log("Get Products Failed", error);

//         throw error;

//     }
// };

export const getAllProducts = async (categoryId?: number,search?:string) => {
    try{
        console.log("category id", categoryId);

        const response = await axios.get(
            `${API_BASE_URL}${apiEndpoints.GET_PRODUCTS}`,
            {
                params: {
          ...(categoryId !== undefined && { categoryId }),
          ...(search !== undefined && { search }),
        },

               
            }
        );

        console.log("getallproducts", response.data);

        return response.data;
    }
    catch(error){

        console.log("Get Products Failed", error);
    throw error;

    }
}


export const getProductsByPriceSort = (
    order: "ASC" | "DESC",
    categoryId?: number | null,
    search?: string
) => {
    return axios.get(`${API_BASE_URL}${apiEndpoints.GET_PRODUCTS}`,{
        params : {
            categoryId,
            search,
            sortBy: "price",
            order,
        }
    })
};

export const getProductById = async (id: string | number) => {
    const response = await axios.get(`${API_BASE_URL}${apiEndpoints.GET_PRODUCT_BY_ID}/${id}`);
    console.log("single product", response.data);

    return response.data;
}
