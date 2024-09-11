import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './slices/moviesSlice';
import movieDetailReducer from './slices/movieDetailSlice';
import searchReducer from './slices/searchSlice';

export const makeStore = (preloadedState = {}) =>
  configureStore({
    reducer: {
      movies: moviesReducer,
      movieDetail: movieDetailReducer,
      search: searchReducer,
    },
    preloadedState,
  });

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
