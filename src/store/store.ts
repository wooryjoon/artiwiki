import { configureStore } from "@reduxjs/toolkit";
import tokenSlice from "./tokenSlice";
const store = configureStore({
  reducer: {
    token: tokenSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>; // store가 보유한 state의 타입 명시
export type AppDispatch = typeof store.dispatch; // dispatch의 타입 명시
