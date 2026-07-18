// apistep3
import apiEndpoints from "../../utils/apiEndPoints/apiEndPoints";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type SignupPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export const signupApi = async (data: SignupPayload) => {
  const response = await axios.post(
    `${API_BASE_URL}${apiEndpoints.SIGNUP}`,
    data
  );

  return response.data;
}

export const loginApi = async (data: LoginPayload) => {
  const response = await axios.post(
    `${API_BASE_URL}${apiEndpoints.LOGIN}`,
    data
  );

  return response.data;
}
