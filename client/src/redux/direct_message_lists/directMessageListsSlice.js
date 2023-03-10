import { createSlice } from '@reduxjs/toolkit'

const directMessageListsSlice = createSlice({
    name: 'direct_message_lists',
    initialState: {
        value: []
    },
    reducers: {
        updateDirectMessageLists(state, action) {
            state.value = action.payload
        }
    }
  });

  export const { updateDirectMessageLists } = directMessageListsSlice.actions
  export default directMessageListsSlice.reducer
  