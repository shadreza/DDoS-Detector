import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TempState {
  isScreenOnMobile: string,
}

let initialState: TempState = {
  isScreenOnMobile: "large",
}

export const counterSlice =  createSlice({
  name: 'isScreenOnMobileInfo',
  initialState,
  reducers: {
    setIsScreenOnMobile: (state, action: PayloadAction<string>) => {
      state.isScreenOnMobile = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {setIsScreenOnMobile} = counterSlice.actions

export default counterSlice.reducer