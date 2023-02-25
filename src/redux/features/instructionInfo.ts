import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const instructions = [
  "Upload a CSV file first -> Press Process Button",
  "Check your CSV file that is now in the table -> Press Proceed Button",
  "Choose correct options -> Press Run Model",
  "Your Results are shown."
]

const stepInfos = [
  "Upload Log File [CSV]",
  "Visualize",
  "Choose Model",
  "Result"
]

const index = 0

export interface InstructionInfoState {
  instruction: string,
  showInstruction: boolean,
  stepCount: number,
  stepInfo: string,
  shallFlowBeBroken: boolean,
  maxStepCount: number
}


let initialState: InstructionInfoState = {
  instruction: instructions[index],
  showInstruction: false,
  stepCount: index,
  stepInfo: stepInfos[index],
  shallFlowBeBroken: false,
  maxStepCount: index
}

export const counterSlice =  createSlice({
  name: 'instructionInfo',
  initialState,
  reducers: {
    setStepCount: (state, action: PayloadAction<number>) => {
      let resLoad = 0
      if (action.payload >= 0 && action.payload <= 3) {
        if (action.payload > state.maxStepCount) { 
          resLoad = state.maxStepCount
        } else {
          resLoad = action.payload
        }
      } 
      state.stepInfo = stepInfos[resLoad]
      state.instruction = instructions[resLoad]
      state.stepCount = resLoad
    },

    setMaxStepCount: (state, action: PayloadAction<number>) => {
      if (action.payload >= 0 && action.payload <= 3) {
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
    setShallFlowBeBroken: (state, action: PayloadAction<boolean>) => {
      state.shallFlowBeBroken = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {setShowInstruction, setStepCount, setShallFlowBeBroken, setMaxStepCount} = counterSlice.actions

export default counterSlice.reducer