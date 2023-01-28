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
    // getUser: build.query({
    //   query(id) {
    //     return {
    //       url: `general/user/${id}`,
    //       // credentials: "include",
    //     };
    //   },
    //   transformResponse: (result) => {
    //     return result; // result._id
    //   },
    //   async onQueryStarted(args, { dispatch, queryFulfilled }) {
    //     try {
    //       const { data } = await queryFulfilled;
    //       console.log("🚀 ~ file: api.js:24 ~ onQueryStarted ~ data", data);

    //       // dispatch(setUser(data));
    //       dispatch(setUser(data));
    //     } catch (error) {}
    //   },
    // }),

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
      // invalidatesTags: ["User"],
    }),
    login: build.mutation({
      query(data) {
        return {
          url: "general/login",
          method: "POST",
          body: data,
          headers: {
            credentials: "include",
          },
        };
      },

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          if (res.data.user) {
            await dispatch(setUser(res.data.user));
          } else {
            console.log("NO USER");
          }
        } catch (error) {}
      },
    }),
    logoutUser: build.mutation({
      query() {
        return {
          url: "logout",
          // credentials: "include",
        };
      },
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
  useLoginMutation,
} = api;
