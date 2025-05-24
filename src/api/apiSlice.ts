import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Pizzas", "Order"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://react-fast-pizza-api.onrender.com/api",
  }),
  endpoints: (builder) => ({
    fetchAllPizzas: builder.query({
      query: () => "/menu",
      providesTags: ["Pizzas"],
    }),
    postOrder: builder.mutation({
      query: (body) => ({
        url: "/order",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const { useFetchAllPizzasQuery, usePostOrderMutation } = apiSlice;
