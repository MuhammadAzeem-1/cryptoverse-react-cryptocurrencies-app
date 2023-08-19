import { configureStore } from "@reduxjs/toolkit";
import { crptoApi } from "../services/cryptoApi";
import { cryptoNewsApi } from "../services/cryptoNewsApi";

export const store = configureStore({
  reducer: {
    [crptoApi.reducerPath]: crptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(crptoApi.middleware)
      .concat(cryptoNewsApi.middleware), // Add the middleware for cryptoNewsApi here
});
