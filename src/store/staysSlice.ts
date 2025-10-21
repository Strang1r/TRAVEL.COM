import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Favorite } from "./favorite";

/* interface Stays {
  id: number;
  title: string;
  subtitle: string;
  reviews: string;
  image: string;
} */

type UserStays = {
  [userId: string]: Favorite[];
}

const loadFromLocalStorage = (): UserStays => {
  try {
    const data = localStorage.getItem("staysFavoritesByUser");
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

const initialState: UserStays = loadFromLocalStorage();

const staysSlice = createSlice({
  name: "stays",
  initialState,
  reducers: {
    addStay: (state, action: PayloadAction<{ userId: string; stay: Favorite }>) => {
      const { userId, stay } = action.payload;
      if (!state[userId]) {
        state[userId] = [];
      }
      const exists = state[userId].find(s => s.id === stay.id);
      if (!exists) {
        state[userId].push(stay);
      }
      localStorage.setItem("staysFavoritesByUser", JSON.stringify(state));
    },
    removeStay: (state, action: PayloadAction<{ userId: string; id: number }>) => {
      const { userId, id } = action.payload;
      if (!state[userId]) return;
      state[userId] = state[userId].filter(s => s.id !== id);
      localStorage.setItem("staysFavoritesByUser", JSON.stringify(state));
    }
  }
});

export const { addStay, removeStay } = staysSlice.actions;
export default staysSlice.reducer;
