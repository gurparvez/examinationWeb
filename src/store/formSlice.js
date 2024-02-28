import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    formsData: null
}

const formSlice = createSlice({
    name: "forms",
    initialState,
    reducers: {
        put: (state, action) => {
            state.status = true;
            state.userData = action.payload;
        }
    }
})

export const {put} = formSlice.actions;

export default formSlice.reducer;