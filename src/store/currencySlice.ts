import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

export type CurrencyType = "USD" | "CNY" | "EUR";

export interface CurrencyState {
  current: CurrencyType;
  rates: Record<CurrencyType, number>;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CurrencyState = {
  current: (localStorage.getItem("currency") as CurrencyType) || "USD",
  rates: {
    USD: 1,
    CNY: 7.3,
    EUR: 0.85
  },
  status: 'idle'
};

// 异步获取汇率
export const fetchRates = createAsyncThunk(
  'currency/fetchRates',
  async (base: CurrencyType = "USD") => {
    const url = `https://api.exchangeratesapi.io/v1/latest?access_key=7e6c74844e0ed0aa82d5dcd475f5350e&base=${base}&symbols=USD,CNY,EUR`
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await res.json();
    console.log(data);
    return data.rates as Record<CurrencyType, number>;
  }
);

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<CurrencyType>) => {
      state.current = action.payload;
      localStorage.setItem("currency", action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRates.fulfilled, (state, action: PayloadAction<Record<CurrencyType, number>>) => {
        state.status = 'idle';
        state.rates = action.payload;
      })
      .addCase(fetchRates.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export const { setCurrency } = currencySlice.actions;

export default currencySlice.reducer;
