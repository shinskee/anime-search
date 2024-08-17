import { configureStore } from '@reduxjs/toolkit'
import currentQueryReducer from '../features/currentQuerySlice'
import { api } from '../api/api'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    currentQuery: currentQueryReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

setupListeners(store.dispatch)