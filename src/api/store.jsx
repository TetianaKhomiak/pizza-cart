import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import counterReducer from "../redux/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
