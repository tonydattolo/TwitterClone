
import { createSlice } from "@reduxjs/toolkit";

const initialState = {currPageName:'', currPagrAuthor:'',currPageDetails:''}

const pageSlice = createSlice({
    name:'page',
    initialState: initialState,
    reducers:{
        setCurrPage:(state,action)=>{
            // console.log("setState.",action.payload)
            state.currPageName = action.payload; 
        },

        setCurrPageAuthor:(state,action)=>{
            // console.log("setState.",action.payload)
            state.currPageAuthor = action.payload; 
        },

        currPageDetails:(state,action)=>{
            // console.log("setState.",action.payload)
            state.currPageDetails = action.payload; 
        }
    }

});

export default pageSlice.reducer;
export const { setCurrPage, setCurrPageAuthor, currPageDetails } = pageSlice.actions;

