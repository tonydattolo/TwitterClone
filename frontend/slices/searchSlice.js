import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "search",
  initialState: {
    search_term: "",
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.search_term = action.payload;
    }
  }
});

export const {
  setSearchTerm,
} = slice.actions

export default slice.reducer