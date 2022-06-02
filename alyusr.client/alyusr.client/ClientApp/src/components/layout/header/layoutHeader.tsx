import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { CookieSet, isUserAuthenticated } from "../../../utils";
import { LangSwitcherReactI18 } from "../../languageSwitcher/react-i18/langSwitcher";

export const LayoutHeader: FC<any> = () => {
  const { t } = useTranslation();
  return (
    <>
      <LangSwitcherReactI18 />
      <p>
        {isUserAuthenticated() && (
          <button
            onClick={() => {
              CookieSet(
                process.env.REACT_APP_languageStorageKey || "xx",
                "aa",
                -10
              );
            }}
          >
            {t("logout.button")}
          </button>
        )}
      </p>
    </>
  );
};
