import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import enTranslation from './en.json'
import zhTranslation from './zh.json'

const resources = {
  en: {
    translation: enTranslation,
  },
  zh: {
    translation: zhTranslation,
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    // Project's primary content is Chinese; fall back to zh (not en) when
    // the detected language is neither en nor zh. This matches user
    // expectations: a Chinese product that is partially translated should
    // default to Chinese, not English.
    fallbackLng: 'zh',
    supportedLngs: ['zh', 'en'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      // v8 deprecated the 'languages' key; use 'navigator' which reads
      // window.navigator.languages in priority order.
      order: ['navigator', 'localStorage', 'htmlTag'],
      caches: ['localStorage'],
    },
  })

export default i18n
