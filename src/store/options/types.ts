import { LocaleType } from '/@/locales/config';
export enum ThemeEnum {
  DARK = 'dark',
  LIGHT = 'light',
}
export interface ScreenType {
  index: number;
  type: string;
  clientWidth: number;
  clientHeight: number;
}
export interface ScrollType {
  scrollLeft: number;
  scrollTop: number;
}
export interface OptionsState {
  optionsInvitedAddress: string;
  optionsScreen: ScreenType;
  optionsScroll: ScrollType;
  optionsDarkMode: ThemeEnum;
  optionsLang: LocaleType;
}

export const defaultReferrerAddress = '0x0000000000000000000000000000000000000000';
export const darkMode = ThemeEnum.LIGHT;
