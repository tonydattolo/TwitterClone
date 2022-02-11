import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { authApi } from "slices/authAPI";
import { profileApi } from "slices/profileAPI";
import { postsApi } from "slices/postsAPI";
import { searchApi } from "slices/searchAPI";
import { messagesApi } from "slices/messagesAPI";
import { pageApi } from "slices/pageApi";
import { eventApi } from "slices/eventApi";
import auth from 'slices/authSlice';
import profile from 'slices/profileSlice'
import posts from 'slices/postsSlice'
import search from 'slices/searchSlice'
import messages from 'slices/messagesSlice'
import page from "slices/pageSlice";
import event from "slices/eventSlice";

import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
} from 'redux-persist'

const reducers = combineReducers({
  // Add the generated reducer as a specific top-level slice
  [authApi.reducerPath]: authApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [postsApi.reducerPath]: postsApi.reducer,
  [searchApi.reducerPath]: searchApi.reducer,
  [messagesApi.reducerPath]: messagesApi.reducer,
  [pageApi.reducerPath]: pageApi.reducer,
  [eventApi.reducerPath]: eventApi.reducer,
  auth,
  profile,
  posts,
  search,
  messages,
  page,
  event
})

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [
    authApi.reducerPath,
    profileApi.reducerPath,
    postsApi.reducerPath,
    searchApi.reducerPath,
    messagesApi.reducerPath,
    pageApi.reducerPath,
    eventApi.reducerPath,
    auth, 
    profile,
    posts,
    search,
    messages,
    page,
    event
  ],
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
        .concat(authApi.middleware)
        .concat(profileApi.middleware)
        .concat(postsApi.middleware)
        .concat(searchApi.middleware)
        .concat(messagesApi.middleware)
        .concat(pageApi.middleware)
        .concat(eventApi.middleware)
    
  })
  
export const store = makeStore()

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

