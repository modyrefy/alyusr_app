import React, { FC } from "react";
import { CookieSet } from "../../../utils";
import { LangSwitcherReactI18 } from "../../languageSwitcher/react-i18/langSwitcher";

export const LayoutHeader: FC<any> = () => {
  return (
    <>
      <LangSwitcherReactI18 />
      <p>
        <button
          onClick={() => {
            CookieSet(
              process.env.REACT_APP_languageStorageKey || "xx",
              "aa",
              -10
            );
          }}
        >
          logount
        </button>
      </p>
    </>
  );
};
