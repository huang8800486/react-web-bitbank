import { createReducer } from '@reduxjs/toolkit';
import { DEFAULTLANG, LocaleType } from '/@/locales/config';
import { defaultReferrerAddress, OptionsState, darkMode } from './types';
import {
  updatedOptionsInvitedAddress,
  updatedOptionsScreen,
  updatedOptionsScroll,
  updatedOptionsDarkMode,
  updatedOptionsLang,
} from './actions';
console.log("localStorage.getItem('i18nextLng')", localStorage.getItem('i18nextLng'));
export const initialState: OptionsState = {
  optionsLang: (localStorage.getItem('i18nextLng') || DEFAULTLANG) as LocaleType,
  optionsDarkMode: darkMode,
  optionsInvitedAddress: defaultReferrerAddress, // 默认地址
  optionsScreen: {
    index: 0,
    type: 'xs',
    clientWidth: document.documentElement.clientWidth || window.innerWidth,
    clientHeight: document.documentElement.clientHeight || window.innerHeight,
  },
  optionsScroll: { scrollLeft: 0, scrollTop: 0 },
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updatedOptionsInvitedAddress, (state, action) => {
      state.optionsInvitedAddress = action.payload.optionsInvitedAddress;
    })
    .addCase(updatedOptionsScreen, (state, action) => {
      state.optionsScreen.clientWidth = action.payload.optionsScreen.clientWidth || initialState.optionsScreen.clientWidth;
      state.optionsScreen.clientHeight = action.payload.optionsScreen.clientWidth || initialState.optionsScreen.clientHeight;
      state.optionsScreen.index = action.payload.optionsScreen.index;
      state.optionsScreen.type = action.payload.optionsScreen.type;
    })
    .addCase(updatedOptionsScroll, (state, action) => {
      state.optionsScroll.scrollLeft = action.payload.optionsScroll.scrollLeft || initialState.optionsScroll.scrollLeft;
      state.optionsScroll.scrollTop = action.payload.optionsScroll.scrollTop || initialState.optionsScroll.scrollTop;
    })
    .addCase(updatedOptionsDarkMode, (state, action) => {
      state.optionsDarkMode = action.payload.optionsDarkMode;
    })
    .addCase(updatedOptionsLang, (state, action) => {
      state.optionsLang = action.payload.optionsLang;
    })
);
