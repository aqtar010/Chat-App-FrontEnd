import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    _id: "",
    Fname: "",
    Lname: "",
    email: "",
  },
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      state.user = {
        _id: "",
        Fname: "",
        Lname: "",
        email: "",
      };
      state.isLoggedIn = false;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
