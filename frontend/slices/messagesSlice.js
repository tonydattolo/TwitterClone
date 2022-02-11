import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    }
  }
});

export const {
  setMessages,
} = slice.actions;

export default slice.reducer