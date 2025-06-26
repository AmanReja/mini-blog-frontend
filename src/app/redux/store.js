"use client";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer"; // Your combined reducer

const store = configureStore({
  reducer: rootReducer,
  // No need to add thunk manually
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
