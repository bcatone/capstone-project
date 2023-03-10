import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
    name: 'loading',
    initialState: {
        value: false
    },
    reducers: {
        updateLoading(state, action) {
            state.value = action.payload
        }
    }
});

export const { updateLoading } = loadingSlice.actions;
export default loadingSlice.reducer;