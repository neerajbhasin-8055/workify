import { configureStore } from "@reduxjs/toolkit";// ✅ Fix import
import authSlice from "./authSlice";

const store = configureStore({
    reducer: {
        auth: authSlice
    }
});

export default store;
