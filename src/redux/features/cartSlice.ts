import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCartApi,
  clearCartApi,
  fetchCartApi,
  removeCartItemApi,
  updateCartQuantityApi,
} from "../../lib/api/cart/api";

export type CartItem = {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  product: {
    id: number;
    productName: string;
    price: string;
    thumbnailImage: string;
    weight?: string;
  };
};

type CartState = {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
  loading: boolean;
  error: string | null;
};

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  loading: false,
  error: null,
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await fetchCartApi(userId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart"
      );
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    data: { userId: number; productId: number; quantity: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await addToCartApi(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add product to cart"
      );
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async (
    data: { userId: number; cartItemId: number; quantity: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateCartQuantityApi(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update cart"
      );
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (
    data: { userId: number; cartItemId: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await removeCartItemApi(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove cart item"
      );
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await clearCartApi(userId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to clear cart"
      );
    }
  }
);

const applyCart = (state: CartState, cart: CartState) => {
  state.items = cart.items || [];
  state.totalQuantity = cart.totalQuantity || 0;
  state.totalAmount = Number(cart.totalAmount || 0);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        applyCart(state, action.payload);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        applyCart(state, action.payload);
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        applyCart(state, action.payload);
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        applyCart(state, action.payload);
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        applyCart(state, action.payload);
      });
  },
});

export const { resetCart } = cartSlice.actions;

export default cartSlice.reducer;
