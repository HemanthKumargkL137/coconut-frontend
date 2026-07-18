import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type AddressPayload = {
  userId: number;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  isDefault?: boolean;
};

export const fetchAddressesApi = async (userId: number) => {
  const response = await axios.get(`${API_BASE_URL}/api/addresses`, {
    params: { userId },
  });

  return response.data;
};

export const createAddressApi = async (data: AddressPayload) => {
  const response = await axios.post(`${API_BASE_URL}/api/addresses`, data);

  return response.data;
};
