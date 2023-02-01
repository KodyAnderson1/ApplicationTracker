import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "./auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  // console.log(args) // request url, method, body
  // console.log(api) // signal, dispatch, getState()
  // console.log(extraOptions) //custom like {shout: true}

  let result = await baseQuery(args, api, extraOptions);

  // If you want, handle other status codes, too
  if (result?.error?.status === 403) {
    console.log("sending refresh token");

    // send refresh token to get new access token
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    if (refreshResult?.data) {
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data }));

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = "Your login has expired. ";
      }
      return refreshResult;
    }
  }

  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: "adminAPI",
  tagTypes: ["User", "Dashboard", "Applications", "SingleApplication"],
  endpoints: (build) => ({
    getDashboard: build.query({
      query: () => `client/dashboard`,
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
      }),
      invalidatesTags: ["Applications"],
    }),
    updateApplication: build.mutation({
      query: (payload, id) => ({
        url: `client/applications/${id}`,
        method: "POST",
        body: payload,
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
