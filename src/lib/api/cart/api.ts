import axios from "axios";
import API_BASE_URL from "../apiBaseUrl";

export const fetchCartApi = async (userId: number) => {
  const response = await axios.get(`${API_BASE_URL}/api/cart`, {
    params: { userId },
  });

  return response.data;
};

export const addToCartApi = async (data: {
  userId: number;
  productId: number;
  quantity: number;
}) => {
  const response = await axios.post(`${API_BASE_URL}/api/cart/add`, data);

  return response.data;
};

export const updateCartQuantityApi = async (data: {
  userId: number;
  cartItemId: number;
  quantity: number;
}) => {
  const response = await axios.put(
    `${API_BASE_URL}/api/cart/${data.cartItemId}`,
    {
      userId: data.userId,
      quantity: data.quantity,
    }
  );

  return response.data;
};

export const removeCartItemApi = async (data: {
  userId: number;
  cartItemId: number;
}) => {
  const response = await axios.delete(
    `${API_BASE_URL}/api/cart/${data.cartItemId}`,
    {
      data: { userId: data.userId },
    }
  );

  return response.data;
};

export const clearCartApi = async (userId: number) => {
  const response = await axios.delete(`${API_BASE_URL}/api/cart`, {
    data: { userId },
  });

  return response.data;
};
