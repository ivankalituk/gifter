import { configureStore } from "@reduxjs/toolkit";
<<<<<<< HEAD
import userReducer from "@/redux/userSlice";

export const store = configureStore({
    reducer:{
        user: userReducer,
=======
import userReducer from '@/redux/userSlice'

export const store = configureStore({
    reducer: {
        user: userReducer
>>>>>>> 4ce593b2430cbe87a12c6fbedde1ed577b38fab0
    }
})