import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/", // should this be http://localhost:3001/api
    prepareHeaders: headers => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", token);
      }

      return headers;
    },
  }),
  tagTypes: ["POST", "GET"],
  endpoints: builder => ({
    auth: builder.query({
      query: () => "/auth/me",
    }),
    addTask: builder.mutation({
      query: task => ({
        url: "api/tasks",
        method: "POST",
        // Include the entire post object as the body of the request
        body: task,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["POST"],
    }),
    getTasks: builder.query({
      query: () => "api/tasks",
      providesTags: ["POST"],
    }),
    getTask: builder.query({
      query: id => ({
        url: `api/tasks/${id}`,
        method: "GET",
      }),
    }),
    getTasksWhereUserIsEnforcer: builder.query({
      query: () => ({
        url: "api/tasks/enforcer",
        method: "GET",
      }),
    }),
    acceptTask: builder.mutation({
      query: accept => ({
        url: `api/tasks/acceptorcomplete`,
        method: "PUT",
        body: accept,
      }),
    }),
  }),
});

export const {
  useAuthQuery,
  useAddTaskMutation,
  useGetTasksQuery,
  useGetTaskQuery,
  useGetTasksWhereUserIsEnforcerQuery,
  useAcceptTaskMutation,
} = apiSlice;
