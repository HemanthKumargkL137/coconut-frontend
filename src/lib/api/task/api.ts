import axios from "axios";
import apiEndpoints from "../../utils/apiEndPoints/apiEndPoints";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getTasks = async (token: string) => {
    try{

        const response = await axios.get(
            `${API_BASE_URL}${apiEndpoints.GET_TASKS}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
               console.log(response.data,"hello");

         
        return response.data;
     

    }catch(error){
        console.log("Get Tasks Failed", error);

        throw error;

    }

}

export const createTask = async (
    taskData: any,
    token: string
) => {
    try{
        const response = await axios.post(`${API_BASE_URL}${apiEndpoints.CREATE_TASK}`,
            taskData,
            {
                headers: {
                    Authorization : `Bearer ${token}`,
                },
            }
        );

        return response;
    } catch (error){
        console.log("create Task Failed", error);

        throw error;
    }
};

export const deleteTask = async (id:number,token:string) => {
    try{
        const response = await axios.delete(`${API_BASE_URL}${apiEndpoints.DELETE_TASK}/${id}`,
            {
                headers: {
                    Authorization : `Bearer ${token}`,
                }
            }
        );
        return response;
    }
    
    catch (error){
        console.log("Delete failed",error);
        throw error;

    }
};

export const updateTask = async (
    id:number,
    taskData: any,
    token: string
) =>{

    try{
    const response = await axios.put(`${API_BASE_URL}${apiEndpoints.UPDATE_TASK}/${id}`,
    taskData,

    {
        headers:{
            Authorization : `Bearer ${token}`,
        },
    }
);
return response;
    }catch (error){
          console.log("Update failed", error);

    throw error;
    }
}

export const getPaginatedTasks = async (
    offset: number,
    limit: number,
    token: string
) => {
    try{
        console.log("URL",`${API_BASE_URL}${apiEndpoints.PAGIATED}?offset=${offset}&limit=${limit}`)
        const response = await axios.get(`${API_BASE_URL}${apiEndpoints.PAGIATED}?offset=${offset}&limit=${limit}`,{
         headers: {
    Authorization: `Bearer ${token}`
  }
    })
    return response;

    }catch(error){
        console.log("Failed to get paginatedTasks",error);
    }
    
}

export const uploadImage = async (
  id: number,
  image: File,
  token: string
) => {

  const formData = new FormData();

  formData.append("image", image);

  try {


    console.log("URL2",`${API_BASE_URL}${apiEndpoints.GET_TASKS}/${id}/image`);
    const response = await axios.post(
      `${API_BASE_URL}${apiEndpoints.GET_TASKS}/${id}/image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
           "Authorization": `Bearer ${token}`,
        },
      }
    );
console.log(response,"qwert");
    return response.data;

    

  } catch (error) {
    console.log(error);
  }
};


// export const searchTasks = async (
//     search: string,
//     status: string,
//     offset: number,
//     limit: number,
//     token: string
// ) => {
//     try{
//         console.log({
//   search,
//   status,
//   offset,
//   limit,
// });
//         console.log(`${API_BASE_URL}${apiEndpoints.SEARCH}?search=${search}&status=${status}&offset=${offset}&limit=${limit}`,"i am searchTaskURL");
//         const response = await axios.get(`${API_BASE_URL}${apiEndpoints.SEARCH}?search=${search}&status=${status}&offset=${offset}&limit=${limit}`,
//             {
//                 params:{
//                     search,
//                     status,
//                     offset,
//                     limit,
//                 },
//                 headers:{
//                     Authorization: `Bearer ${token}`,
//                 },
//             }
//         );

//         return response.data;
//     } catch (error){
//         console.log(error);
//     }
// };


export const searchTasks = async (
  search: string,
  status: string,
  offset: number,
  limit: number,
  token: string
) => {
  try {

    console.log("Sending:", {
      search,
      status,
      offset,
      limit,
    });

    const response = await axios.get(
      `${API_BASE_URL}${apiEndpoints.SEARCH}`,
      {
        params: {
          search,
          status,
          offset,
          limit,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Success:", response.data);

    return response.data;

  } catch (error: any) {

    console.log("Error Response:", error.response?.data);
    console.log("Status Code:", error.response?.status);

  }
};


export const getTaskStats = async (
    token :string
) => {
    try{
        const response = await axios.get(
            `${API_BASE_URL}${apiEndpoints.TOTAL_TASKS}`,
            {
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    }catch (error){
        console.log(" Get task status failed", error);

        throw error;
    }
};
