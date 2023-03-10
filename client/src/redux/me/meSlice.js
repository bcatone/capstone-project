import { createSlice } from '@reduxjs/toolkit'

const meSlice = createSlice({
    name: 'me',
    initialState: {
        value: {}
    },
    reducers: {
        updateMe(state, action) {
            state.value = action.payload
        }
    }
  });

  export const { updateMe } = meSlice.actions
export default meSlice.reducer
  