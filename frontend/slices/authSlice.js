import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const slice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    access: null,
    refresh: null
  },
  reducers: {
    setToken: (state, {payload: { access, refresh }}) => {
      state.access = access
      state.refresh = refresh
      state.isAuthenticated = true
    },
    setUser: (state, { payload }) => {
    // setUser: (state, { payload: { user } }) => {
      state.user = payload
    },
    setAuthenticated: (state) => {
      state.isAuthenticated = true
    },
    setLogout: (PURGE, (state) => {
      state.user = null
      state.isAuthenticated = false
      state.access = null
      state.refresh = null
    })
  },
  extraReducers: (builder) => {
    // https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
    // this case is needed on logout to purge persisted storage or you get phantom calls in the cache? idk
    builder.addCase(PURGE, (state) => {
      setLogout.removeAll(state);
    })
  // extraReducers: (builder) => {
    // example from official docs if you need to access login status from other Apis?
    // builder
    //   .addMatcher(postApi.endpoints.login.matchPending, (state, action) => {
    //     console.log('pending', action);
    //   })
    //   .addMatcher(postApi.endpoints.login.matchFulfilled, (state, action) => {
    //     console.log('fulfilled', action);
    //     state.user = action.payload.result.user;
    //     state.token = action.payload.result.token;
    //   })
    //   .addMatcher(postApi.endpoints.login.matchRejected, (state, action) => {
    //     console.log('rejected', action);
    //   });
  }
})


// export const {  } = slice.actions
export const { 
  setLogout,
  setCredentials,
  setToken,
  setUser,
  setAuthenticated
} = slice.actions
export default slice.reducer
export const selectCurrentUser = (state) => state.auth.user
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export const selectToken = (state) => state.auth.token
export const selectAccess = (state) => state.auth.access
export const selectRefresh = (state) => state.auth.refresh