import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setRtl } from "../slice/themeSlice";

const useCulture = (language: string) => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(language);
    //@ts-ignore
    dispatch(setRtl(language === "ar-AE"));
  }, [language]);
  const changeCulture = (language: string) => {
    const isRtl: boolean = language === "ar-AE" ? true : false;
    i18n.changeLanguage(language);
    //@ts-ignore
    dispatch(setRtl(isRtl));
  };
  return { changeCulture };
};
export default useCulture;
