import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from '../../translations/en/translation.json';
import translationUK from '../../translations/uk/translation.json';

const resources = {
    en: {
        translation: translationEN,
    },
    uk: {
        translation: translationUK,
    },
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        detection: {
            order: ['localStorage', 'navigator', 'cookie', 'querystring'],
            caches: ['localStorage', 'cookie'],
        },
        supportedLngs: ['en', 'uk'],
        fallbackLng: 'en',
        ns: ['translation'],
        defaultNS: 'translation',
        interpolation: {
            escapeValue: false,
        },
    });


export default i18n;
