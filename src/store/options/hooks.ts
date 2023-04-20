import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { AppState, useAppDispatch } from '../index';
import { useTranslation } from 'react-i18next';
import {
  updatedOptionsInvitedAddress,
  updatedOptionsScreen,
  updatedOptionsScroll,
  updatedOptionsDarkMode,
  updatedOptionsLang,
} from './actions';
import { ScreenType, ScrollType, ThemeEnum } from './types';
import { updateTheme } from '/@/utils';
import { LocaleType } from '/@/locales/config';

export function useOptionsInvitedAddress(): [string, (address: string) => void] {
  const dispatch = useAppDispatch();
  const optionsInvitedAddress = useSelector<AppState, AppState['options']['optionsInvitedAddress']>((state) => {
    return state.options.optionsInvitedAddress;
  });

  const setOptionsInvitedAddress = useCallback(
    (address: string) => {
      dispatch(updatedOptionsInvitedAddress({ optionsInvitedAddress: address }));
    },
    [dispatch]
  );

  return [optionsInvitedAddress, setOptionsInvitedAddress];
}

export function useOptionsScreen(): [ScreenType, (screen: ScreenType) => void] {
  const dispatch = useAppDispatch();
  const optionsScreen = useSelector<AppState, AppState['options']['optionsScreen']>((state) => {
    return state.options.optionsScreen;
  });

  const setOptionsScreen = useCallback(
    (screen: ScreenType) => {
      dispatch(updatedOptionsScreen({ optionsScreen: screen }));
    },
    [dispatch]
  );

  return [optionsScreen, setOptionsScreen];
}

export function useOptionsScroll(): [ScrollType, (scroll: ScrollType) => void] {
  const dispatch = useAppDispatch();
  const optionsScroll = useSelector<AppState, AppState['options']['optionsScroll']>((state) => {
    return state.options.optionsScroll;
  });

  const setOptionsScroll = useCallback(
    (scroll: ScrollType) => {
      dispatch(updatedOptionsScroll({ optionsScroll: scroll }));
    },
    [dispatch]
  );

  return [optionsScroll, setOptionsScroll];
}

export function useOptionsDarkMode(): [ThemeEnum, (mode: ThemeEnum) => void] {
  const dispatch = useAppDispatch();
  const optionsDarkMode = useSelector<AppState, AppState['options']['optionsDarkMode']>((state) => {
    return state.options.optionsDarkMode;
  });

  const setOptionsDarkMode = useCallback(
    (mode: ThemeEnum) => {
      updateTheme();
      localStorage.setItem('theme', mode);
      dispatch(updatedOptionsDarkMode({ optionsDarkMode: mode }));
    },
    [dispatch]
  );

  return [optionsDarkMode, setOptionsDarkMode];
}

export function useOptionsLang(): [LocaleType, (lan: LocaleType) => void] {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const optionsLang = useSelector<AppState, AppState['options']['optionsLang']>((state) => {
    return state.options.optionsLang;
  });

  const setOptionsLang = useCallback(
    (lan: LocaleType) => {
      updateTheme();
      localStorage.setItem('i18nextLng', lan);
      dispatch(updatedOptionsLang({ optionsLang: lan }));
      i18n.changeLanguage(lan);
    },
    [dispatch]
  );

  return [optionsLang, setOptionsLang];
}
