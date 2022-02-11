import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const messagesApi = createApi({
  reducerPath: "messagesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/messages/",
    prepareHeaders: (headers, { getState }) => {
      headers.set("Accept", "application/json");
      headers.set("Content-Type", "application/json");
      return headers;
    }
  }),
  tagTypes: ["conversations", "messages"],
  endpoints: (builder) => ({
    getAllConversations: builder.query({
      query(data) {
        const { access_token } = data;
        return {
          url: ``,
          method: "GET",
          headers: {
            "Authorization": `JWT ${access_token}`
          }
        }
      },
      providesTags: ["conversations"],
    }),
    createNewDM: builder.mutation({
      query(data) {
        const { message, receiver, access_token } = data
        return {
          url: `create/`,
          method: "POST",
          headers: {
            "Authorization": `JWT ${access_token}`,
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          body: {
            message: `${message}`,
            receiver: `${receiver}`,
          }

        }
      },
      invalidatesTags: ["conversations"],

    }),
    getConversationDetail: builder.query({
      query(data) {
        const { displayName, access_token } = data
        return {
          url: `direct/${displayName}/`,
          method: "GET",
          headers: {
            "Authorization": `JWT ${access_token}`,
            "Accept": "application/json",
            "Content-Type": "application/json",
          }
        }
      },
      providesTags: ["messages"],
    }),
    sendMessage: builder.mutation({
      query(data) {
        const { message, receiver, conversation_id, access_token } = data
        return {
          url: `send/`,
          method: "POST",
          headers: {
            "Authorization": `JWT ${access_token}`,
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          body: {
            conversation_id: `${conversation_id}`,
            message: `${message}`,
            receiver: `${receiver}`,
          }
        }
      },
      invalidatesTags: ["messages"],
    }),

    
  }),
});

export const {
  useGetAllConversationsQuery,
  useLazyGetConversationDetailQuery,
  useCreateNewDMMutation,
  useGetConversationDetailQuery,
  useSendMessageMutation,

} = messagesApi;