import { createAction } from '@reduxjs/toolkit';
import { ScreenType, ScrollType, ThemeEnum } from './types';
import { LocaleType } from '/@/locales/config';

export const updatedOptionsInvitedAddress = createAction<{ optionsInvitedAddress: string }>('options/optionsInvitedAddress');

export const updatedOptionsScreen = createAction<{ optionsScreen: ScreenType }>('options/optionsScreen');

export const updatedOptionsScroll = createAction<{ optionsScroll: ScrollType }>('options/optionsScroll');

export const updatedOptionsDarkMode = createAction<{ optionsDarkMode: ThemeEnum }>('options/optionsDarkMode');

export const updatedOptionsLang = createAction<{ optionsLang: LocaleType }>('options/optionsLang');
