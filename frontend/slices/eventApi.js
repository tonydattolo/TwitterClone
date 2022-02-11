import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const eventApi = createApi({
    reducerPath: 'eventApi',
    baseQuery:fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/' }),
    tagTypes:['Events'],
    endpoints:  (builder) =>({
        createEvent: builder.mutation({
            query:(data)=>{

                // http://127.0.0.1:8000/events/create/
                // console.log("Inside Events API:", data);
                return {
                    url:'events/create/',
                    method:'POST',
                    body:{
                        eventName: data.eventName,
                        authorPage: data.authorPage,
                        eventDescription: data.eventDescription,
                        eventDate: data.eventDate,
                        eventTime: data.eventTime,
                        location: data.location
                    },
                    headers:{
                        Authorization: `JWT ${data.access_token}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                }
            },
            invalidatesTags:['Events'],
        }),

        getEventsByPage: builder.query({
            query:(data)=>{

                // http://127.0.0.1:8000/events/{pageName}/getall/
                // console.log("Inside Events API:", data);
                return {
                    url:`events/${data.authorPage}/getall`,
                    method:'GET',
                    headers:{
                        Authorization: `JWT ${data.access_token}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                }
            },
            providesTags:['Events'],
        }),


        getEventsDetails: builder.query({
            query:(data)=>{
                // http://127.0.0.1:8000/events/{eventName}/
                // console.log("Inside Events API:", data);
                return {
                    url:`events/${data.eventName}/`,
                    method:'GET',
                    headers:{
                        Authorization: `JWT ${data.access_token}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                }
            },
            providesTags:['Events'],
        }),

        editEvent: builder.mutation({
            query:(data)=>{

                // http://127.0.0.1:8000/events/{eventName}/update/
                // console.log("Inside Events API:", data);
                return {
                    url:`events/${data.currEventName}/update/`,
                    method:'PATCH',
                    body:{
                        eventName: data.eventName,
                        eventDescription: data.eventDescription,
                        eventDate: data.eventDate,
                        eventTime: data.eventTime,
                        location: data.location
                    },
                    headers:{
                        Authorization: `JWT ${data.access_token}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                }
            },
            invalidatesTags:['Events'],
        }),

        
        deleteEvent: builder.mutation({
            query:(data)=>{

                // http://127.0.0.1:8000/events/{eventName}/delete/
                // console.log("Inside Events API:", data);
                return {
                    url:`events/${data.eventName}/delete/`,
                    method:'DELETE',
                    body:{
                        eventName: data.eventName,
                    },
                    headers:{
                        Authorization: `JWT ${data.access_token}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                }
            },
            invalidatesTags:['Events'],
        }),


        createNotification: builder.mutation({
            query:(data)=>{

                // http://127.0.0.1:8000/events/notifications/{userID}/create/'
                // console.log("Inside EvcurrentUserents API:", data);
                return {
                    url:`events/notifications/create/`,
                    method:'POST',
                    body:{
                        userIDs: data.userIDs,
                        eventName: data.eventName,
                        pageName: data.pageName,
                        
                    },
                    headers:{
                        Authorization: `JWT ${data.access_token}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                }
            },
            invalidatesTags:['Events'],
        }),

        updateNotification: builder.mutation({
            query:(data)=>{

                // http://127.0.0.1:8000/events/notifications/{eventName}/update/'
                // console.log("Inside EvcurrentUserents API:", data);
                return {
                    url:`events/notifications/${data.eventName}/update/`,
                    method:'PATCH',
                    body:{
                        userID: data.userID,
                        eventName: data.editedEventName,
                        pageName: data.pageName,
                        
                    },
                    headers:{
                        Authorization: `JWT ${data.access_token}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                }
            },
            invalidatesTags:['Events'],
        }),

        deleteNotification: builder.mutation({
            query:(data)=>{

                // http://127.0.0.1:8000/events/notifications/{eventName}/update/'
                // console.log("Inside EvcurrentUserents API:", data);
                return {
                    url:`events/notifications/${data.eventName}/delete/`,
                    method:'DELETE',
                    body:{
                        eventName: data.eventName,
                        
                    },
                    headers:{
                        Authorization: `JWT ${data.access_token}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                }
            },
            invalidatesTags:['Events'],
        }),

        getEventNotifications: builder.query({
            query:(data)=>{
                // http://127.0.0.1:8000/events/notifications/{userID}/get/'
                // console.log("Inside Events API:", data);
                return {
                    url:`events/notifications/${data.userID}/get/`,
                    method:'GET',
                    headers:{
                        Authorization: `JWT ${data.access_token}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                }
            },
            providesTags:['Events'],
        }),

 
    })

});


export const { useCreateEventMutation,
    useGetEventsByPageQuery,
    useGetEventsDetailsQuery,
    useEditEventMutation,
    useDeleteEventMutation,
    useCreateNotificationMutation,
    useUpdateNotificationMutation,
    useDeleteNotificationMutation,
    useGetEventNotificationsQuery,
    } = eventApi;


