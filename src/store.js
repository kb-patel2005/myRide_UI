import { configureStore } from "@reduxjs/toolkit";
import userSlice from './assets/Slices/userSlice'

const store = configureStore({
    reducer: {
        userSlice : userSlice
    },
});

export default store;