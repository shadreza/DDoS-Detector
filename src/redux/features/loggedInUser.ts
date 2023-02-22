import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TempState {
  loggedInUserJson: any,
  appReady: boolean,
}

let initialState: TempState = {
  loggedInUserJson: null,
  appReady: false
}

export const counterSlice =  createSlice({
  name: 'loggedInUserJson',
  initialState,
  reducers: {
    setloggedInUserJson: (state, action: PayloadAction<any>) => {
      state.loggedInUserJson = action.payload
      if (!state.appReady) {
        state.appReady = true
      }
    },
    setAppReady: (state, action: PayloadAction<boolean>) => {
      state.appReady = action.payload
    },
    clearloggedInUserJson: (state) => {
      state.loggedInUserJson = null
    }
  },
})

// Action creators are generated for each case reducer function
export const {setloggedInUserJson, clearloggedInUserJson} = counterSlice.actions

export default counterSlice.reducer