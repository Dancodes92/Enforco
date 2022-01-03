import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "/auth", // should this be http://localhost:3001/api
    prepareHeaders: headers => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", token);
        console.log("token", token);
      }

      return headers;
    },
  }),
  endpoints: builder => ({
    auth: builder.query({
      query: () => "/me",
    }),
    clear: builder.query({
      query: () => "auth/clear",
  }),
  }),
});

export const { useAuthQuery } = apiSlice;
