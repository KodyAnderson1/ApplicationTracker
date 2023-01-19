import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),

  reducerPath: "adminAPI",
  tagTypes: ["User", "Dashboard", "Applications"],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getDashboard: build.query({
      query: (id) => `client/dashboard/${id}`,
      providesTags: "Dashboard",
    }),
    getApplications: build.query({
      query: () => `client/applications`, // !  query: (id) => `client/applications/${id}`,
      providesTags: "Applications",
    }),
    addNewApplication: build.mutation({
      query: (payload) => ({
        url: `client/applications/post`,
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Applications"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetDashboardQuery,
  useGetApplicationsQuery,
  useAddNewApplicationMutation,
} = api;
