import { createSlice } from '@reduxjs/toolkit'

const friendsSlice = createSlice({
    name: 'friends',
    initialState: {
        value: []
    },
    reducers: {
        updateFriends(state, action) {
            state.value = action.payload
        }
    }
  });

  export const { updateFriends } = friendsSlice.actions
  export default friendsSlice.reducer