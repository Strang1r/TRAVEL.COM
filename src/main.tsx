import App from './App';
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import store from './store/store';
import "leaflet/dist/leaflet.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);