import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/", // should this be http://localhost:3001/api
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
      query: () => "/auth/me",
    }),
    addTask: builder.mutation({
      query: task => ({
        url: 'api/task',
        method: 'POST',
        // Include the entire post object as the body of the request
        body: task,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    })
  }),
});

export const { useAuthQuery, useAddTaskMutation } = apiSlice;
