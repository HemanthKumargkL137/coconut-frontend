import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const placeOrderApi = async (data: {
  userId: number;
  addressId: number;
}) => {
  const response = await axios.post(`${API_BASE_URL}/api/orders/place`, data);

  return response.data;
};
