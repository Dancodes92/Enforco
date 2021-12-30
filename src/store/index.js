import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './features/api/apiSlice'
import { authSlice } from './features/auth'
import { usersSlice } from './features/users'



export const store = configureStore({
  reducer: {
    auth: authSlice,
    users: usersSlice,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})
