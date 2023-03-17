import { createSlice } from '@reduxjs/toolkit'

const inboxSlice = createSlice({
    name: 'inbox',
    initialState: {
        value: []
    },
    reducers: {
        updateInbox(state, action) {
            state.value = action.payload
        }
    }
  });

  export const { updateInbox } = inboxSlice.actions
  export default inboxSlice.reducer