import { createSlice } from "@reduxjs/toolkit";

export const errorSlice = createSlice({
    name: 'error',
    initialState: {
        value: []
    },
    reducers: {
        updateErrors(state, action) {
            state.value = action.payload
        }
    }
});

export const { updateErrors } = errorSlice.actions;
export default errorSlice.reducer;