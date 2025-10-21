import "./App.scss";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import "./iconfont.css"
import { useEffect } from "react";
import { setUser } from "./store/authSlice";
import { fetchRates } from "./store/currencySlice";
import { useAppDispatch } from "./store/hooks";

function App() {
  const dispatch = useAppDispatch();
  const initialCurrency = (localStorage.getItem("currency") as "USD" | "CNY" | "EUR") || "USD";

  useEffect(() => {
    dispatch(setUser());
    dispatch(fetchRates(initialCurrency));
  }, [dispatch, initialCurrency]);

  return (
    <RouterProvider router={router} />
  );
}

export default App
