import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/", // should this be http://localhost:3001/api
    // prepareHeaders: (headers, { getState }) => {
    //   const token = getState().auth.token;
    //   if (token) {
    //     headers.set("authorization", `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  endpoints: builder => ({
    auth: builder.query({
      query: () => "/auth/me",
    }),
    getUsers: builder.query({
      query: () => "api/users",
    }),
    signUp: builder.mutation({
      query: initialSignUp => ({
        url: "auth/signup",
        method: "POST",
        body: initialSignUp,
      }),
    }),
  }),
});

export const { useAuthQuery, useGetUsersQuery, useSignUpMutation } = apiSlice;
