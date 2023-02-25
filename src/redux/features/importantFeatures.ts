import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FeatureState {
  impFeatureSet: string[],
}

let initialState: FeatureState = {
  impFeatureSet: [
    "ACK Flag Count",
    "Active Max",
    "Active Min",
    "Active Std",
    "Avg Packet Size",
    "Bwd Header Length",
    "Bwd IAT Max",
    "Bwd IAT Mean",
    "Bwd IAT Min",
    "Bwd IAT Total",
    "Bwd Packet Length Max",
    "Bwd Packet Length Min",
    "Bwd Packet Length Std",
    "Bwd Packets/s",
    "CWE Flag Count",
    "Down/Up Ratio",
    "Flow Bytes/s",
    "Flow Duration",
    "Flow IAT Mean",
    "Flow Packets/s",
    "Fwd Act Data Packets",
    "Fwd Header Length",
    "Fwd IAT Mean",
    "Fwd IAT Min",
    "Fwd IAT Total",
    "Fwd Packet Length Max",
    "Fwd Packet Length Std",
    "Fwd Seg Size Min",
    "Idle Max",
    "Idle Min",
    "Idle Std",
    "Init Bwd Win Bytes",
    "Init Fwd Win Bytes",
    "Packet Length Min",
    "Packet Length Std",
    "Packet Length Variance",
    "Protocol",
    "RST Flag Count",
    "SYN Flag Count",
    "Subflow Bwd Packets",
    "Total Fwd Packets",
    "URG Flag Count"
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