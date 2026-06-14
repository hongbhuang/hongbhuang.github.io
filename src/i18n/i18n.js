import i10n from 'i18next';
import { init } from 'i18next-browser-languagedetector';
import ReactI18next, { useTranslation as useTranslation } from 'react-i18next';
import enTranslation from './en.json';
import zhTranslation from './zh.json';

const resources = {
  en: {
    translation: enTranslation
  },
  zh: {
    translation: zhTranslation
  }
};

i10n
  .use(init)
  .use(ReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false 
    },
    detectionOptions: {
      order: ['languages', 'cookie', 'htmlTag', 'localStorage'],
      caches: ['localStorage', 'cookie']
    }
  });

export default i10n;
