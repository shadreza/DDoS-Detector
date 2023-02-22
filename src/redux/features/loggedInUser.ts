import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TempState {
  loggedInUserJson: any
}

let initialState: TempState = {
  loggedInUserJson: {}
}

export const counterSlice = createSlice({
  name: 'loggedInUserJson',
  initialState,
  reducers: {
    setloggedInUserJson: (state, action: PayloadAction<Object>) => {
      state.loggedInUserJson = action.payload
    },
    clearloggedInUserJson: (state) => {
      state.loggedInUserJson = null
    }
  },
})

// Action creators are generated for each case reducer function
export const {setloggedInUserJson, clearloggedInUserJson} = counterSlice.actions

export default counterSlice.reducer