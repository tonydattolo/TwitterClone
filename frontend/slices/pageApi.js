import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pageApi = createApi({
    reducerPath: 'pagesApi',
    baseQuery:fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/' }),
    tagTypes:['Pages','Followers'],
    endpoints:  (builder) =>({
        createPage: builder.mutation({
            query:(data)=>{
                // console.log(body);
                // [access_token, ...data] = body;
                // console.log("Inside pageAPI createPage ",data);
                return {
                    url:'pages/create/',
                    method:'POST',
                    body:{
                        pageName: data.pageName,
                        pageAuthor: data.pageAuthor,
                        pageEmail: data.pageEmail,
                        pageDescription: data.pageDescription
                    },
                    headers:{
                        Authorization: `JWT ${data.access_token}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                }
            },
            invalidatesTags:['Pages'],
        }),

        getPageDetailsByUser: builder.query({
            query:(data)=>{

                // console.log("User Id is: ",data.id);
                return{
                    url:`pages/${data.id}`,
                    method:'GET',
                    headers:{
                        Authorization: `JWT ${data.access_token}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                }
            },
            providesTags:['Pages'],

        }),

        getPageDetailsOfAllPages: builder.query({
            query:(data)=>{

                // console.log("User Id is: ",data.id);
                return{
                    url:'pages/',
                    method:'GET',
                    headers:{
                        Authorization: `JWT ${data.access_token}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                }
            },
            providesTags:['Pages'],

        }),

        getPageDetails: builder.query({
            query:(data)=>{

                // console.log("Page Name: ",data.pageName);
                return{
                    url:`pages/${data.pageName}`,
                    method:'GET',
                    headers:{
                        Authorization: `JWT ${data.access_token}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                }
            },
            providesTags:['Pages'],
        }),


        editPage: builder.mutation({
            // ttp://127.0.0.1:8000/pages/{pageName}/update/
            query:(data)=>{
                // console.log(body);
                // [access_token, ...data] = body;
                // console.log("Inside pageAPI createPage ",data);
                return {
                    url:  `pages/${data.pageName}/update/`,
                    method:'PATCH',
                    body:{
                        pageName: data.pageName,
                        pageEmail: data.pageEmail,
                        pageDescription: data.pageDescription
                    },
                    headers:{
                        Authorization: `JWT ${data.access_token}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                }
            },
            invalidatesTags:['Pages'],
        }),

        // Follow a page
        // http://127.0.0.1:8000/pages//{pageName}/{user_id}}/
        followPage: builder.mutation({
            // ttp://127.0.0.1:8000/pages/{pageName}/update/
            query:(data)=>{
                //  console.log("Inside pageAPI followPage ",data);
                return {
                    url:`pages/${data.pageName}/${data.userId}/`,
                    method:'POST',
                    body:{
                        pageName: data.pageName,
                        user_id: data.userId,
                        userEmail: data.userEmail
                        
                    },
                    headers:{
                        Authorization: `JWT ${data.access_token}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                }
            },
            invalidatesTags:['Followers'],
        }),

        // http://127.0.0.1:8000/pages/{pageName}/delete/
        deletePage: builder.mutation({
            query:(data)=>{
                //  console.log("Inside pageAPI createPage ",data);
                return {
                    url:`pages/${data.pageName}/delete/`,
                    method:'DELETE',
                    body:{
                        pageName: data.pageName
                        
                    },
                    headers:{
                        Authorization: `JWT ${data.access_token}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                }
            },
            invalidatesTags:['Followers'],
        }),

        // Get followers list from backend
        // http://127.0.0.1:8000/pages/{pageName}/followers/
        getAllFollowers: builder.query({
            query:(data)=>{

                // console.log("Page Name Inside API: ",data);
                return{
                    url:`pages/${data.pageName}/followers/`,
                    method:'GET',
                    headers:{
                        Authorization: `JWT ${data.access_token}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                }
            },
            providesTags:['Followers'],
        }),


        checkUserIsFollower: builder.query({
            query:(data)=>{

                // console.log("inside page API: ",data);
                return{
                    url:`pages/${data.pageName}/${data.userID}/`,
                    method:'GET',
                    headers:{
                        Authorization: `JWT ${data.access_token}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                }
            },
            providesTags:['Followers'],

        }),


        unFollowPage: builder.mutation({
            // ttp://127.0.0.1:8000/pages/{pageName}/update/
            query:(data)=>{
                //  console.log("Inside pageAPI unFollowPage ",data);
                return {
                    url:`pages/${data.pageName}/${data.userID}/`,
                    method:'DELETE',
                    body:{
                        pageName: data.pageName,
                        user_id: data.userID,
                        
                    },
                    headers:{
                        Authorization: `JWT ${data.access_token}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                }
            },
            invalidatesTags:['Followers'],
        }),
        

    })

});


export const {  useCreatePageMutation, 
                useGetPageDetailsByUserQuery, 
                useGetPageDetailsOfAllPagesQuery, 
                useGetPageDetailsQuery, 
                useEditPageMutation,
                useFollowPageMutation, 
                useGetAllFollowersQuery,
                useDeletePageMutation,
                useCheckUserIsFollowerQuery,
                useUnFollowPageMutation,
            } = pageApi


