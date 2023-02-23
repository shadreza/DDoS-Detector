import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  loggedInUserJson: any,
  appReady: boolean,
  isAdmin: boolean,
}

let initialState: UserState = {
  loggedInUserJson: null,
  appReady: false,
  isAdmin: false,
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
    setAdmin: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload
    },
    clearloggedInUserJson: (state) => {
      state.loggedInUserJson = null
    }
  },
})

// Action creators are generated for each case reducer function
export const {setloggedInUserJson, clearloggedInUserJson, setAppReady, setAdmin} = counterSlice.actions

export default counterSlice.reducer