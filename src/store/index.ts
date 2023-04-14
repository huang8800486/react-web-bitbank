import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import options from './options/reducer';

const perCombineReducers = combineReducers({
  options,
});

export function initializeStore() {
  return configureStore({
    reducer: perCombineReducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: true,
        serializableCheck: false,
      }),
    devTools: true,
  });
}

const store: ReturnType<typeof initializeStore> = initializeStore();

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;

export function useStore() {
  return useMemo(() => initializeStore(), []);
}
