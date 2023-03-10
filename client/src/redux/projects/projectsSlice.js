import { createSlice } from '@reduxjs/toolkit'

const projectsSlice = createSlice({
    name: 'projects',
    initialState: {
        value: []
    },
    reducers: {
        updateProjects(state, action) {
            state.value = action.payload
        }
    }
  });

  export const { updateProjects } = projectsSlice.actions
export default projectsSlice.reducer
  