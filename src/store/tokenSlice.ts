import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TokenType = {
  name: string;
};

const tokenSlice = createSlice({
  name: "token",
  initialState: {
    name: "",
  },
  reducers: {
    addToken: (state, action: PayloadAction<TokenType>) => {
      state.name = action.payload.name; // redux 내부적으로 imer 라이브러리를 통해 새 객체 반환
    },
    removeToken: (state) => {
      state.name = "";
    },
  },
});

export default tokenSlice;
export const tokenActions = tokenSlice.actions;
