import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { DEFAULTLANG, LocaleType } from '/@/locales/config';
import LanguageDetector from 'i18next-browser-languagedetector';
import zh from './zh.json';
import en from './en.json';
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init
export const resources = {
  'en-US': {
    translation: en,
  },
  'zh-CN': {
    translation: zh,
  },
};
i18n
  // 检测用户语言
  .use(LanguageDetector)
  // 将 i18n 实例传递给 react-i18next
  .use(initReactI18next)
  // 初始化 i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en-US',
    lng: (localStorage.getItem('i18nextLng') || DEFAULTLANG) as LocaleType,
    debug: true,
    resources,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
