
import { createSlice } from "@reduxjs/toolkit";


const initialState = {currEvent:""}

const eventSlice = createSlice({
    name:'event',
    initialState: initialState,
    reducers:{
        setCurrEvent:(state,action)=>{
            // console.log("setState.",action.payload)
            state.currEvent = action.payload; 
        }
    }

});

export default eventSlice.reducer;
export const { setCurrEvent } = eventSlice.actions;

