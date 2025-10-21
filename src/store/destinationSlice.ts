import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Favorite } from "./favorite";

/* interface Destination {
  id: number;
  title: string;
  subtitle: string;
  reviews: string;
  image: string;
  routeName: string;
}
 */
/* const loadFromLocalStorage = (): Destination[] => {
  try {
    const data = localStorage.getItem("desFavorites");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

const initialState: Destination[] = loadFromLocalStorage();

const destinationSlice = createSlice({
  name: "destination",
  initialState,
  reducers: {
    addDestination: (state, action: PayloadAction<Destination>) => {
      const exists = state.find(dest => dest.id === action.payload.id);
      if (!exists) {
        state.push(action.payload);
      }
      localStorage.setItem("desFavorites", JSON.stringify(state));
    },
    removeDestination: (state, action: PayloadAction<number>) => {
      const newState = state.filter(dest => dest.id !== action.payload);
      localStorage.setItem("desFavorites", JSON.stringify(newState));
      return newState;
    },
    clearDestinations: () => {
      localStorage.removeItem("desFavorites");
      return [];
    }
  }
});

export const { addDestination, removeDestination, clearDestinations } = destinationSlice.actions;
export default destinationSlice.reducer; */


// 绑定User ID的版本
type UserDestinations = {
  [userId: string]: Favorite[];
}

const loadFromLocalStorage = (): UserDestinations => {
  try {
    const data = localStorage.getItem("desFavoritesByUser");
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

const initialState: UserDestinations = loadFromLocalStorage();

const destinationSlice = createSlice({
  name: "destination",
  initialState,
  reducers: {
    addDestination: (state, action: PayloadAction<{ userId: string; destination: Favorite }>) => {
      const { userId, destination } = action.payload;
      if (!state[userId]) {
        state[userId] = [];
      }
      const exists = state[userId].find(dest => dest.id === destination.id);
      if (!exists) {
        state[userId].push(destination);
      }
      localStorage.setItem("desFavoritesByUser", JSON.stringify(state));
    },
    removeDestination: (state, action: PayloadAction<{ userId: string; id: number }>) => {
      const { userId, id } = action.payload;
      if (!state[userId]) return;
      state[userId] = state[userId].filter(dest => dest.id !== id);
      localStorage.setItem("desFavoritesByUser", JSON.stringify(state));
    }
  }
});

export const { addDestination, removeDestination } = destinationSlice.actions;
export default destinationSlice.reducer;