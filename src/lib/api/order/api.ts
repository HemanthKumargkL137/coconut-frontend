import axios from "axios";
import API_BASE_URL from "../apiBaseUrl";

export const placeOrderApi = async (data: {
  userId: number;
  addressId: number;
}) => {
  const response = await axios.post(`${API_BASE_URL}/api/orders/place`, data);

  return response.data;
};
