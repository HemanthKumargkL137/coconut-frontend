import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import type { AuthState } from "./features/authSlice";
import cartReducer from "./features/cartSlice";

const storage = {
  getItem: (key: string) => {
    return Promise.resolve(typeof window !== "undefined" ? localStorage.getItem(key) : null);
  },
  setItem: (key: string, value: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
    }
    return Promise.resolve();
  },
  removeItem: (key: string) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
    return Promise.resolve();
  },
};

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token"],
};

const rootReducer = combineReducers({
  auth: persistReducer<AuthState>(authPersistConfig, authReducer),
  cart: cartReducer,
});

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;