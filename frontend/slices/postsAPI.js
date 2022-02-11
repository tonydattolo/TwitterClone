import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/posts/",
    prepareHeaders: (headers, { getState }) => {
      headers.set("Accept", "application/json");
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["posts","todaysPosts"],
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => "",
      providesTags: ["posts"],
    }),
    getPostsByUser: builder.query({
      query: (email) => `${email}`,
      providesTags: ["posts"],
    }),
    createPost: builder.mutation({
      query(data) {
        const { post_author, post_text, access_token } = data;
        return {
          url: "create/",
          headers: {
            Authorization: `JWT ${access_token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: {
            post_author: `${post_author}`,
            post_text: `${post_text}`,
          }
        };
      },
      invalidatesTags: ["posts","todaysPosts"],
    }),
    deletePost: builder.mutation({
      query(data) {
        const { postIDtoDelete, access_Token } = data
        return {
          url: `delete/${postIDtoDelete}/`,
          headers: {
            Authorization: `JWT ${access_Token}`,
          },
          method: "DELETE",
        };
      },
      invalidatesTags: ["posts", "todaysPosts"],
    }),
    getTodaysPosts: builder.query({
      query: () => "hot/today",
      providesTags: ["todaysPosts"],
    }),
    
    refetchOnMountOrArgChange: true,
    
  }),
})

export const {
  useGetPostsByUserQuery,
  useGetAllPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useSearchPostsQuery,
  useGetTodaysPostsQuery,
} = postsApi;
