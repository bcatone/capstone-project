import { createSlice } from '@reduxjs/toolkit'

const postsSlice = createSlice({
    name: 'me',
    initialState: {
        value: []
    },
    reducers: {
        updatePosts(state, action) {
            state.value = action.payload
        }
    }
  });

  export const { updatePosts } = postsSlice.actions
export default postsSlice.reducer
  