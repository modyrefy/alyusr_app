import { FC, ReactNode, useEffect } from "react";
import * as React from "react";
import { LayoutHeader } from "../../header/layoutHeader";
import { LayoutFooter } from "../../footer/layoutFooter";
import useCulture from "../../../../hooks/useCulture";
import { CookieGet } from "../../../../utils";
import Cookies from "js-cookie";

export const DefaultLayout: FC<{ children?: ReactNode | undefined }> = ({
  children,
}) => {
  const { changeCulture } = useCulture("");
  //@ts-ignore
  const uiLanguage: string =
    process.env.REACT_APP_languageStorageKey !== null &&
    process.env.REACT_APP_languageStorageKey !== undefined
      ? process.env.REACT_APP_languageStorageKey
      : "";
  //@ts-ignore
  const language: string = Cookies.get(uiLanguage)
    ? CookieGet(uiLanguage)
    : process.env.REACT_APP_defaultUiLanguage;
  useEffect(() => {
    console.log("current_language", language);
    //@ts-ignore
    changeCulture(language);
  }, [language]);
  return (
    <>
      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <td>{<LayoutHeader />}</td>
          </tr>
        </tbody>
      </table>
      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <td>{children}</td>
          </tr>
        </tbody>
      </table>
      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <td>{<LayoutFooter />}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
