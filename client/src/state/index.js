import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  user: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    logout: () => initialState,
    setUser: (state, action) => {
      state.user = action.payload;
    },
    getUser: (state, action) => {
      return state.user;
    },
  },
});

export const { setMode, logout, setUser, getUser } = globalSlice.actions;

export default globalSlice.reducer;
