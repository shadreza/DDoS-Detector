import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const instructions = [
  "Upload a CSV file first -> Press Process Button",
  "Check your CSV file that is now in the table -> Press Predict Button",
  "Choose correct options -> Press Run Model",
  "Your Results are shown."
]

const stepInfos = [
  "Upload Csv File",
  "Visualize",
  "Predict With Model",
  "Result"
]

export interface InstructionInfoState {
  instruction: string,
  showInstruction: boolean,
  stepCount: number,
  stepInfo: string,
  breezeThroughSteps: boolean,
  maxStepCount: number
}

let initialState: InstructionInfoState = {
  instruction: instructions[0],
  showInstruction: false,
  stepCount: 0,
  stepInfo: stepInfos[0],
  breezeThroughSteps: false,
  maxStepCount: 0
}

export const counterSlice =  createSlice({
  name: 'instructionInfo',
  initialState,
  reducers: {
    setStepCount: (state, action: PayloadAction<number>) => {
      if (state.stepCount >= 0 && state.stepCount <=3) {
        state.stepInfo = stepInfos[action.payload]
        state.instruction = instructions[action.payload]
        state.stepCount = action.payload
        if (action.payload > state.maxStepCount) { 
          state.stepCount = state.maxStepCount
        }
      } else {
        state.stepInfo = ""
        state.instruction = ""
      }
    },
    setMaxStepCount: (state, action: PayloadAction<number>) => {
      if (state.stepCount >= 0 && state.stepCount <= 3) {
        state.maxStepCount = action.payload
        if (state.stepCount > action.payload) {
          state.stepInfo = stepInfos[action.payload]
          state.instruction = instructions[action.payload]
          state.stepCount = action.payload
        }
      }
    },
    setShowInstruction: (state, action: PayloadAction<boolean>) => {
      state.showInstruction = action.payload
    },
    setBreezeThroughSteps: (state, action: PayloadAction<boolean>) => {
      state.breezeThroughSteps = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {setShowInstruction, setStepCount, setBreezeThroughSteps, setMaxStepCount} = counterSlice.actions

export default counterSlice.reducer