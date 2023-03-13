import { createSlice } from '@reduxjs/toolkit'

const directMessagesSlice = createSlice({
    name: 'direct_messages',
    initialState: {
        value: [],
    },
    reducers: {
        updateDirectMessages(state, action) {
            state.value = action.payload
        }
    }
  });

  export const { updateDirectMessages } = directMessagesSlice.actions
  export default directMessagesSlice.reducer
  