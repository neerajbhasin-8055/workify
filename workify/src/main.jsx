import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import { Provider } from 'react-redux'
import store from "./redux/store.js";
import { persistStore } from "redux-persist";
import { PersistGate } from 'redux-persist/integration/react'

const persistor = persistStore(store)
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" // This makes text white by default
        toastStyle={{ backgroundColor: "#000", color: "#fff" }} />

  </StrictMode>
);
