import { createSlice } from '@reduxjs/toolkit'

const friendRequestsSlice = createSlice({
    name: 'friend_requests',
    initialState: {
        value: []
    },
    reducers: {
        updateFriendRequests(state, action) {
            state.value = action.payload
        }
    }
  });

  export const { updateFriendRequests } = friendRequestsSlice.actions
  export default friendRequestsSlice.reducer
  