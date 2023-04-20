// 1.默认语言
export const DEFAULTLANG = 'en-US';

// 2.可选择的语言列表
export type LocaleType = 'zh-CN' | 'en-US';

export const LOCALE: { [key: string]: LocaleType } = {
  EN_US: 'en-US',
  zh_CN: 'zh-CN',
};

// 3.语言对应列表
export interface LangListType {
  text: string;
  value: LocaleType;
}
export const LOCALELANG: LangListType[] = [
  {
    text: 'English',
    value: 'en-US',
  },
  {
    text: '简体中文',
    value: 'zh-CN',
  },
];
