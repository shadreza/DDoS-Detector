import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ModalState {
  showModal: boolean
  messageForModal: string[]
}

let initialState: ModalState = {
  showModal: false,
  messageForModal: [""]
}

export const counterSlice = createSlice({
  name: 'modalMessage',
  initialState,
  reducers: {
    setShowModal: (state, action: PayloadAction<boolean>) => {
      state.showModal = action.payload
    },
    setMessageForModal: (state, action: PayloadAction<string[]>) => {
      state.messageForModal = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {setShowModal, setMessageForModal} = counterSlice.actions

export default counterSlice.reducer