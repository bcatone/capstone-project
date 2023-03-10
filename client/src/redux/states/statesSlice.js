import { createSlice } from '@reduxjs/toolkit'

const statesSlice = createSlice({
    name: 'states',
    initialState: {
        value: []
    },
    reducers: {
        updateStates(state, action) {
            state.value = action.payload
        }
    }
  });

  export const { updateStates } = statesSlice.actions
export default statesSlice.reducer
  