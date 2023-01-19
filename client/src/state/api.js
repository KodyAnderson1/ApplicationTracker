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
      query: () => "general/dashboard",
      providesTags: "Dashboard",
    }),
    getApplications: build.query({
      query: () => `client/applications`, // !  query: (id) => `client/applications/${id}`,
      providesTags: "Applications",
    }),
  }),
});

export const { useGetUserQuery, useGetDashboardQuery, useGetApplicationsQuery } = api;
