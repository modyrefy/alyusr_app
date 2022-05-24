import React, {FC, useState} from "react";
import {useTranslation} from 'react-i18next';
import "./i18n";
import {LanguageList} from "../../../resources/localization/languages";
import {CookieGet, CookieSet} from "../../../utils";

const languageLocalStorageName = process.env.REACT_APP_languageStorageKey;
const defaultUiLanguage = process.env.REACT_APP_defaultUiLanguage;
const getDefaultlanguage = (): string => {
    // @ts-ignore
    //const localeValueFomStorage = LocalStorageGet(languageLocalStorageName);
    const localeValueFomStorage = CookieGet(languageLocalStorageName);
    if (localeValueFomStorage === null || localeValueFomStorage === undefined || localeValueFomStorage === '') {
        // @ts-ignore
        //LocalStorageSet(languageLocalStorageName, defaultUiLanguage);
       // CookieSet(languageLocalStorageName, defaultUiLanguage);
        // @ts-ignore
        return defaultUiLanguage;
    }
    return localeValueFomStorage
}
const LangSwitcherReactI18: FC<{}> = () => {
    const { i18n } = useTranslation();
    const [language, setLanguage] = useState(getDefaultlanguage);
    const handleLanguageSelect = (e: any) => {
        i18n.changeLanguage(e.target.value)
        setLanguage(e.target.value);
        // @ts-ignore
        //LocalStorageSet(languageLocalStorageName, e.target.value);
        CookieSet(languageLocalStorageName, e.target.value);
    };
    let languageData = LanguageList.filter(p => p.key === language)[0];
    languageData = languageData === null || languageData === undefined ? LanguageList.filter(p => p.key === 'en-US')[0] : languageData;
    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <td>React-I18</td>
                    </tr>
                    <tr>
                        <td>
                            <select
                                value={i18n.language}
                                onChange={handleLanguageSelect}
                                defaultValue={language}
                            >
                                <option value='en-US'>EN</option>
                                <option value='ar-AE'>AR</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export {LangSwitcherReactI18, getDefaultlanguage}
