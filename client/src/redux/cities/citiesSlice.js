import { createSlice } from '@reduxjs/toolkit'

const citiesSlice = createSlice({
    name: 'cities',
    initialState: {
        value: []
    },
    reducers: {
        updateCities(state, action) {
            state.value = action.payload
        }
    }
  });

  export const { updateCities } = citiesSlice.actions
export default citiesSlice.reducer
  