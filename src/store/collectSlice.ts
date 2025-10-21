import { createSlice } from "@reduxjs/toolkit";

interface CollectState {
  plusOne: boolean;
}

const initialState: CollectState = {
  plusOne: false,
}

const collectSlice = createSlice({
  name: "collect",
  initialState,
  reducers: {
    triggerPlusOne: (state) => {
      state.plusOne = true;
    },
    resetPlusOne: (state) => {
      state.plusOne = false;
    },
  }
});

export const { triggerPlusOne, resetPlusOne } = collectSlice.actions;
export default collectSlice.reducer;