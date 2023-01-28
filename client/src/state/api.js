import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "state";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    // credentials: "include",
  }),
  reducerPath: "adminAPI",
  tagTypes: ["User", "Dashboard", "Applications", "SingleApplication"],
  endpoints: (build) => ({
    getDashboard: build.query({
      query: (id) => `client/dashboard`,
      providesTags: ["Dashboard"],
      headers: {
        // "authorization": `${id}`,
      },
    }),
    getApplications: build.query({
      query: () => `client/applications`,
      providesTags: ["Applications"],
    }),
    getSingleApplication: build.query({
      query: (id) => `client/single/${id}`,
      providesTags: ["SingleApplication"],
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
    updateApplication: build.mutation({
      query: (payload, id) => ({
        url: `client/applications/${id}`,
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Applications", "SingleApplication"],
    }),
    deleteApplication: build.mutation({
      query: (id) => ({
        url: `client/applications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Applications", "SingleApplication"],
    }),
    addUser: build.mutation({
      query: (payload) => ({
        url: `general/register`,
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
  }),
});

export const {
  useGetDashboardQuery,
  useGetApplicationsQuery,
  useAddNewApplicationMutation,
  useGetSingleApplicationQuery,
  useUpdateApplicationMutation,
  useDeleteApplicationMutation,
  useAddUserMutation,
} = api;
