import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/", // should this be http://localhost:3001/api
    prepareHeaders: (headers, { getState }) => {
      console.log(getState())
      const token = getState().authorization.token

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
    }
  }),
  endpoints: builder => ({
    auth: builder.query({
      query: () => "auth/me",
    }),
  }),
});

export const { useAuthQuery } = apiSlice;
