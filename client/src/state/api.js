import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),

  reducerPath: "adminAPI",
  tagTypes: ["User", "Dashboard", "Applications", "SingleApplication"],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getDashboard: build.query({
      query: (id) => `client/dashboard/${id}`,
      providesTags: ["Dashboard"],
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
  }),
});

export const {
  useGetUserQuery,
  useGetDashboardQuery,
  useGetApplicationsQuery,
  useAddNewApplicationMutation,
  useGetSingleApplicationQuery,
  useUpdateApplicationMutation,
  useDeleteApplicationMutation,
} = api;
