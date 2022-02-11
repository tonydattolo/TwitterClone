import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/search/",
    prepareHeaders: (headers, { getState }) => {
      headers.set("Accept", "application/json");
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["search"],
  endpoints: (builder) => ({
    mainSearch: builder.query({
      query: (searchTerm) => `${searchTerm}/`,
    }),
  }),
  // refetchOnMountOrArgChange: ["searchPosts"],
  refetchOnMountOrArgChange: true,
})

export const {
  useMainSearchQuery,
} = searchApi

