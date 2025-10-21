import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enCommon from '../locales/en/common.json';
import zhCommon from '../locales/zh/common.json';
import esCommon from '../locales/es/common.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: enCommon },
      zh: { common: zhCommon },
      es: { common: esCommon },
    },
    lng: localStorage.getItem("language") || "en",
    fallbackLng: "en",
    ns: ["common"],
    defaultNS: "common",
    interpolation: { escapeValue: false },
  });

export default i18n;
