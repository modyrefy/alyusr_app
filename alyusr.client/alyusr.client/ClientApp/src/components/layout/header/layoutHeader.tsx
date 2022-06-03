import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { CookieSet, isUserAuthenticated } from "../../../utils";
import { LangSwitcherReactI18 } from "../../languageSwitcher/react-i18/langSwitcher";

export const LayoutHeader: FC<any> = () => {
  const { t } = useTranslation();
  const tokenKey = process.env.REACT_APP_authenticatedTokenStorageKey || "xx";
  const userKey = process.env.REACT_APP_authenticatedUserStorageKey || "xx";
  return (
    <>
      <LangSwitcherReactI18 />
      <p>
        {isUserAuthenticated() && (
          <button
            onClick={() => {
              CookieSet(tokenKey, "", -10);
              CookieSet(userKey, "", -10);
            }}
          >
            {t("logout.button")}
          </button>
        )}
      </p>
    </>
  );
};
