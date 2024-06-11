import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import counterReducer from "../redux/counterSlice";
import cartReducer from "../redux/cartSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
