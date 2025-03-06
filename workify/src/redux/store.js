import { configureStore } from "@reduxjs/toolkit";// ✅ Fix import
import authSlice from "./authSlice";
import jobSlice from './jobSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        job:jobSlice
    }
});

export default store;
