import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FeatureState {
  impFeatureSet: string[],
}

let initialState: FeatureState = {
  impFeatureSet: [
    'Total Backward Packets',
    'Total Fwd Packets',
    'Bwd IAT Std',
    'Subflow Fwd Bytes',
    'Bwd Packet Length Std',
    'Active Min',
    'Down/Up Ratio',
    'Bwd IAT Min',
    'Flow Packets/s',
    'Fwd IAT Min',
    'Bwd Packet Length Min',
    'Active Max',
    'URG Flag Count',
    'Bwd Packets/s',
    'Flow IAT Mean',
    'Packet Length Variance',
    'SYN Flag Count',
    'Bwd Packet Length Max',
    'Bwd IAT Total',
    'Active Mean',
    'Fwd IAT Mean',
    'Flow IAT Max',
    'Avg Packet Size',
    'Fwd Packet Length Min',
    'Idle Mean',
    'Fwd Packet Length Max',
    'Packet Length Max',
    'Fwd Packets/s',
    'Fwd Act Data Packets',
    'Flow Bytes/s',
    'Fwd Header Length',
    'Idle Std',
    'Protocol',
    'Bwd Packets Length Total',
    'Fwd IAT Max',
    'Bwd Packet Length Mean',
    'Bwd IAT Max',
    'Bwd Header Length',
    'Init Bwd Win Bytes',
    'Idle Max',
    'Packet Length Std',
    'Fwd Seg Size Min'
  ]
}

export const counterSlice =  createSlice({
  name: 'isScreenOnMobileInfo',
  initialState,
  reducers: {
    setImpFeatureSet: (state, action: PayloadAction<string[]>) => {
      state.impFeatureSet = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {setImpFeatureSet} = counterSlice.actions

export default counterSlice.reducer