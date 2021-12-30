import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsers: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { getUsers } = usersSlice.actions;

export default usersSlice.reducer;
