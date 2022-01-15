import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const signupUser = createAsyncThunk(
  "user/signupUser",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const response = await fetch("auth/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      let data = await response.json();
      console.log("data", data);

      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        return { ...data, email: email };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await fetch("auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      let data = await response.json();
      console.log("response", data);
      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("The ERRRR", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const fetchUserByToken = createAsyncThunk(
  "user/",
  async ({ token }, thunkAPI) => {
    try {
      const response = await fetch("auth/me", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      console.log("data", data, response.status);

      if (response.status === 200) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    name: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    clearState: state => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, { payload }) => {
      console.log("payload", payload);
      state.isFetching = false;
      state.isSuccess = true;
      state.email = payload.email;
      state.name = payload.name;
    },
    [signupUser.pending]: state => {
      state.isFetching = true;
    },
    [signupUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = "user already exists";
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.email = payload.email;
      state.name = payload.name;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [loginUser.rejected]: (state, { payload }) => {
      console.log("payload", payload);
      state.isFetching = false;
      state.isError = true;
    },
    [loginUser.pending]: state => {
      state.isFetching = true;
    },
    [fetchUserByToken.pending]: state => {
      state.isFetching = true;
    },
    [fetchUserByToken.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;

      state.email = payload.email;
      state.name = payload.name;
    },
    [fetchUserByToken.rejected]: state => {
      console.log("fetchUserBytoken");
      state.isFetching = false;
      state.isError = true;
    },
  },
});

export const { clearState } = userSlice.actions;

export const userSelector = state => state.user;
