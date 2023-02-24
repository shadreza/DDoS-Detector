import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TempState {
  dataJson: any[],
  headers: string[],
  isDataReadyForTable: boolean,
  hasDataProcessingStarted: boolean,
}

let initialState: TempState = {
  dataJson: [],
  headers: [],
  isDataReadyForTable: false,
  hasDataProcessingStarted: false,
}

export const counterSlice = createSlice({
  name: 'dataJson',
  initialState,
  reducers: {
    setDataJson: (state, action: PayloadAction<any[]>) => {
      state.dataJson = action.payload
    },
    clearDataJson: (state) => {
      state.dataJson = []
    },
    setHeaders: (state, action: PayloadAction<string[]>) => {
      state.headers = action.payload
    },
    clearHeaders: (state) => {
      state.headers = []
    },
    setIsDataReadyForTable: (state, action: PayloadAction<boolean>) => { 
      state.isDataReadyForTable = action.payload
    },
    setHasDataProcessingStarted: (state, action: PayloadAction<boolean>) => { 
      state.hasDataProcessingStarted = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {setDataJson, clearDataJson, setHeaders, clearHeaders, setIsDataReadyForTable, setHasDataProcessingStarted} = counterSlice.actions

export default counterSlice.reducer