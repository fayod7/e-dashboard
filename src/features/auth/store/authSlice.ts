import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface IinitialState {
  token: string | null;
  user: any;
  key: string;
}

const initialState: IinitialState = {
  token: localStorage.getItem("token") || null,
  user: null,
  key: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem("token", state.token);
    },
    removeToken: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
    setKey: (state, action: PayloadAction<string>) => {
      state.key = action.payload;
    },
    removeKey: (state) => {
      state.key = "";
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
});

export const { removeToken, setToken, removeKey, setKey, removeUser, setUser } =
  authSlice.actions;
export default authSlice.reducer;
