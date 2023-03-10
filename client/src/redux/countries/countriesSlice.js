import { createSlice } from '@reduxjs/toolkit'

const countriesSlice = createSlice({
    name: 'countries',
    initialState: {
        value: []
    },
    reducers: {
        updateCountries(state, action) {
            state.value = action.payload
        }
    }
  });

  export const { updateCountries } = countriesSlice.actions
export default countriesSlice.reducer
  