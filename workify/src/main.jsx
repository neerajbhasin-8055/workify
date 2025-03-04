import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

createRoot(document.getElementById("root")).render(
  <StrictMode>
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
    toastStyle={{ backgroundColor: "#000", color: "#fff" }} /> {/* ✅ Use React-Toastify Toaster */}
    <App />
  </StrictMode>
);
