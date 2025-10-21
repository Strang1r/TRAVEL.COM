import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  showLogin: boolean;
}

const initialState: UIState = {
  showLogin: false,
}

const loginPopSlice = createSlice({
  name: "loginPop",
  initialState,
  reducers: {
    setShowLoginState: (state, action: PayloadAction<boolean>) => {
      state.showLogin = action.payload;
    }
  }
});

export const { setShowLoginState } = loginPopSlice.actions;
export default loginPopSlice.reducer;