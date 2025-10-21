import type { RootState } from "../store/store";

export const symbols: Record<string, string> = { USD: "$", CNY: "¥", EUR: "€" };

export const convertPrice = (state: RootState, basePrice: number): string => {
  const { current, rates } = state.currency;
  if (!rates || !rates[current]) return basePrice.toFixed(0);
  const rate = rates[current] / rates["USD"];
  return (basePrice * rate).toFixed(0);
};