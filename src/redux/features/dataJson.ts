import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TempState {
  dataJson: any[],
  headers: string[],
  isDataReadyForTable: boolean,
  hasDataProcessingStarted: boolean,
  fileInfo: any
}

let initialState: TempState = {
  dataJson: [],
  headers: [],
  isDataReadyForTable: false,
  hasDataProcessingStarted: false,
  fileInfo: {name: "", size: 0}
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
    },
    setFileInfo: (state, action: PayloadAction<any>) => { 
      state.fileInfo = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {setDataJson, clearDataJson, setHeaders, clearHeaders, setIsDataReadyForTable, setHasDataProcessingStarted, setFileInfo} = counterSlice.actions

export default counterSlice.reducer