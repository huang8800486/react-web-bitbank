import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import options from './options/reducer';

const perCombineReducers = combineReducers({
  options,
});
// eslint-disable-next-line import/no-mutable-exports
let store: ReturnType<typeof initializeStore>;

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

store = initializeStore();

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;

export function useStore() {
  return useMemo(() => initializeStore(), []);
}
