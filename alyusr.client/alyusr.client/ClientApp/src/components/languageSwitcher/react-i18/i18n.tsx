import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import Backend  from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import {TRANSLATIONS_EN} from "../../../resources/react-i18/en";
import {TRANSLATIONS_AR} from "../../../resources/react-i18/ar";

i18next
    .use(initReactI18next)
    .use(Backend )
    .use(LanguageDetector) // Registering the detection plugin
    // .use(Cache)
    // .use(postProcessor)
    .init({
        // Standard language used
        fallbackLng: 'en-US',
        debug: true,
        interpolation: {
            escapeValue: false
        },
        react: {
            useSuspense: false
        },
        resources: {
            "en-US": {translation: TRANSLATIONS_EN},
            "ar-AE": {translation: TRANSLATIONS_AR},
        }
    });
export default i18next;
