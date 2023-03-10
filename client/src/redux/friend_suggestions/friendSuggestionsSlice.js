import { createSlice } from '@reduxjs/toolkit'

const friendSuggestionsSlice = createSlice({
    name: 'friend_suggestions',
    initialState: {
        value: []
    },
    reducers: {
        updateFriendSuggestions(state, action) {
            state.value = action.payload
        }
    }
  });

  export const { updateFriendSuggestions } = friendSuggestionsSlice.actions
  export default friendSuggestionsSlice.reducer
  