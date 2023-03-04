import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FeatureState {
  impFeatureSet: string[],
  featureNameConsistency: string[],
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
  ],
  featureNameConsistency : [
    'Flow ID',
    ' Flow ID',
    
    'Source IP',
    ' Source IP',
    
    'Src IP',
    ' Src IP',
    
    'Source Port',
    ' Source Port',
    
    'Src Port',
    ' Src Port',
    
    'Destination IP',
    ' Destination IP',
    
    'Dst IP',
    ' Dst IP',
    
    'Destination Port',
    ' Destination Port',
    
    'Dst Port',
    ' Dst Port',
    
    'Protocol','Protocol',
    ' Protocol','Protocol',
    
    'Timestamp','Timestamp',
    ' Timestamp','Timestamp',
    
    'Flow Duration',
    ' Flow Duration',
    
    'Total Fwd Packets',
    ' Total Fwd Packets',
    
    'Tot Fwd Pkts',
    ' Tot Fwd Pkts',
    
    'Total Backward Packets',
    ' Total Backward Packets',
    
    'Tot Bwd Pkts',
    ' Tot Bwd Pkts',
    
    'Total Length of Fwd Packets',
    ' Total Length of Fwd Packets',
    'Fwd Packets Length Total',
    ' Fwd Packets Length Total',
    
    'TotLen Fwd Pkts',
    ' TotLen Fwd Pkts',
    
    'Total Length of Bwd Packets',
    ' Total Length of Bwd Packets',
    'Bwd Packets Length Total',
    ' Bwd Packets Length Total',
    
    'TotLen Bwd Pkts',
    ' TotLen Bwd Pkts',
    
    'Fwd Packet Length Max',
    ' Fwd Packet Length Max',
    
    'Fwd Pkt Len Max',
    ' Fwd Pkt Len Max',
    
    'Fwd Packet Length Min',
    ' Fwd Packet Length Min',
    
    'Fwd Pkt Len Min',
    ' Fwd Pkt Len Min',
    
    'Fwd Packet Length Mean',
    ' Fwd Packet Length Mean',


    
    'Fwd Pkt Len Mean',
    ' Fwd Pkt Len Mean',


    
    'Fwd Packet Length Std',
    ' Fwd Packet Length Std',


    
    'Fwd Pkt Len Std',
    ' Fwd Pkt Len Std',


    
    'Bwd Packet Length Max',
    ' Bwd Packet Length Max',


    
    'Bwd Pkt Len Max',
    ' Bwd Pkt Len Max',


    
    'Bwd Packet Length Min',
    ' Bwd Packet Length Min',


    
    'Bwd Pkt Len Min',
    ' Bwd Pkt Len Min',


    
    'Bwd Packet Length Mean',
    ' Bwd Packet Length Mean',


    
    'Bwd Pkt Len Mean',
    ' Bwd Pkt Len Mean',


    
    'Bwd Packet Length Std',
    ' Bwd Packet Length Std',


    
    'Bwd Pkt Len Std',
    ' Bwd Pkt Len Std',


    
    'Flow Bytes/s',
    ' Flow Bytes/s',


    
    'Flow Byts/s',
    ' Flow Byts/s',


    
    'Flow Packets/s',
    ' Flow Packets/s',


    
    'Flow Pkts/s',
    ' Flow Pkts/s',


    
    'Flow IAT Mean',
    ' Flow IAT Mean',


    
    'Flow IAT Std',
    ' Flow IAT Std',


    
    'Flow IAT Max',
    ' Flow IAT Max',


    
    'Flow IAT Min',
    ' Flow IAT Min',
    
    'Fwd IAT Total',
    ' Fwd IAT Total',
    
    'Fwd IAT Tot',
    ' Fwd IAT Tot',
    
    'Fwd IAT Mean',
    ' Fwd IAT Mean',
    
    'Fwd IAT Std',
    ' Fwd IAT Std',
    
    'Fwd IAT Max',
    ' Fwd IAT Max',
    
    'Fwd IAT Min',
    ' Fwd IAT Min',
    
    'Bwd IAT Total',
    ' Bwd IAT Total',
    
    'Bwd IAT Tot',
    ' Bwd IAT Tot',
    
    'Bwd IAT Mean',
    ' Bwd IAT Mean',
    
    'Bwd IAT Std',
    ' Bwd IAT Std',
    
    'Bwd IAT Max',
    ' Bwd IAT Max',
    
    'Bwd IAT Min',
    ' Bwd IAT Min',
    
    'Fwd PSH Flags',
    ' Fwd PSH Flags',
    
    'Bwd PSH Flags',
    ' Bwd PSH Flags',
    
    'Fwd URG Flags',
    ' Fwd URG Flags',
    
    'Bwd URG Flags',
    ' Bwd URG Flags',
    
    'Fwd Header Length',
    ' Fwd Header Length',
    
    'Fwd Header Len',
    ' Fwd Header Len',
    
    'Bwd Header Length',
    ' Bwd Header Length',
    
    'Bwd Header Len',
    ' Bwd Header Len',
    
    'Fwd Packets/s',
    ' Fwd Packets/s',
    
    'Fwd Pkts/s',
    ' Fwd Pkts/s',
    
    'Bwd Packets/s',
    ' Bwd Packets/s',
    
    'Bwd Pkts/s',
    ' Bwd Pkts/s',
    
    'Min Packet Length',
    ' Min Packet Length',
    
    'Pkt Len Min',
    ' Pkt Len Min',
    
    'Max Packet Length',
    ' Max Packet Length',
    
    'Pkt Len Max',
    ' Pkt Len Max',
    
    'Packet Length Mean',
    ' Packet Length Mean',
    
    'Pkt Len Mean',
    ' Pkt Len Mean',
    
    'Packet Length Std',
    ' Packet Length Std',
    
    'Pkt Len Std',
    ' Pkt Len Std',
    
    'Packet Length Variance',
    ' Packet Length Variance',
    
    'Pkt Len Var',
    ' Pkt Len Var',
    
    'FIN Flag Count',
    ' FIN Flag Count',
    
    'FIN Flag Cnt',
    ' FIN Flag Cnt',
    
    'SYN Flag Count',
    ' SYN Flag Count',
    
    'SYN Flag Cnt',
    ' SYN Flag Cnt',
    
    'RST Flag Count',
    ' RST Flag Count',
    
    'RST Flag Cnt',
    ' RST Flag Cnt',
    
    'PSH Flag Count',
    ' PSH Flag Count',
    
    'PSH Flag Cnt',
    ' PSH Flag Cnt',
    
    'ACK Flag Count',
    ' ACK Flag Count',
    
    'ACK Flag Cnt',
    ' ACK Flag Cnt',
    
    'URG Flag Count',
    ' URG Flag Count',
    
    'URG Flag Cnt',
    ' URG Flag Cnt',
    
    'CWE Flag Count',
    ' CWE Flag Count',
    
    'CWE Flag Cnt',
    ' CWE Flag Cnt',
    
    'ECE Flag Count',
    ' ECE Flag Count',
    
    'ECE Flag Cnt',
    ' ECE Flag Cnt',
    
    'Down/Up Ratio',
    ' Down/Up Ratio',
    
    'Average Packet Size',
    ' Average Packet Size',
    
    'Pkt Size Avg',
    ' Pkt Size Avg',
    
    'Avg Fwd Segment Size',
    ' Avg Fwd Segment Size',
    
    'Fwd Seg Size Avg',
    ' Fwd Seg Size Avg',
    
    'Avg Bwd Segment Size',
    ' Avg Bwd Segment Size',
    
    'Bwd Seg Size Avg',
    ' Bwd Seg Size Avg',
    
    'Fwd Avg Bytes/Bulk',
    ' Fwd Avg Bytes/Bulk',
    
    'Fwd Byts/b Avg',
    ' Fwd Byts/b Avg',
    
    'Fwd Avg Packets/Bulk',
    ' Fwd Avg Packets/Bulk',
    
    'Fwd Pkts/b Avg',
    ' Fwd Pkts/b Avg',
    
    'Fwd Avg Bulk Rate',
    ' Fwd Avg Bulk Rate',
    
    'Fwd Blk Rate Avg',
    ' Fwd Blk Rate Avg',
    
    'Bwd Avg Bytes/Bulk',
    ' Bwd Avg Bytes/Bulk',
    
    'Bwd Byts/b Avg',
    ' Bwd Byts/b Avg',
    
    'Bwd Avg Packets/Bulk',
    ' Bwd Avg Packets/Bulk',
    
    'Bwd Pkts/b Avg',
    ' Bwd Pkts/b Avg',
    
    'Bwd Avg Bulk Rate',
    ' Bwd Avg Bulk Rate',
    
    'Bwd Blk Rate Avg',
    ' Bwd Blk Rate Avg',
    
    'Subflow Fwd Packets',
    ' Subflow Fwd Packets',
    
    'Subflow Fwd Pkts',
    ' Subflow Fwd Pkts',
    
    'Subflow Fwd Bytes',
    ' Subflow Fwd Bytes',
    
    'Subflow Fwd Byts',
    ' Subflow Fwd Byts',
    
    'Subflow Bwd Packets',
    ' Subflow Bwd Packets',
    
    'Subflow Bwd Pkts',
    ' Subflow Bwd Pkts',
    
    'Subflow Bwd Bytes',
    ' Subflow Bwd Bytes',
    
    'Subflow Bwd Byts',
    ' Subflow Bwd Byts',
    
    'Init_Win_bytes_forward',
    ' Init_Win_bytes_forward',
    
    'Init Fwd Win Byts',
    ' Init Fwd Win Byts',
    
    'Init_Win_bytes_backward',
    ' Init_Win_bytes_backward',
    
    'Init Bwd Win Byts',
    ' Init Bwd Win Byts',
    
    'act_data_pkt_fwd',
    ' act_data_pkt_fwd',
    
    'Fwd Act Data Pkts',
    ' Fwd Act Data Pkts',
    
    'min_seg_size_forward',
    ' min_seg_size_forward',
    
    'Fwd Seg Size Min',
    ' Fwd Seg Size Min',
    
    'Active Mean',
    ' Active Mean',
    
    'Active Std',
    ' Active Std',
    
    'Active Max',
    ' Active Max',
    
    'Active Min',
    ' Active Min',
    
    'Idle Mean',
    ' Idle Mean',
    
    'Idle Std',
    ' Idle Std',
    
    'Idle Max',
    ' Idle Max',
    
    'Idle Min',
    ' Idle Min',
    
    'Label',
    ' Label',
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