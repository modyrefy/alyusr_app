import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthenticateUserResponse } from "../../../models/user/authenticateUserResponse";
import { logoutUser } from "../../../slice/userAuthincateSlice";
import { CookieSet, isUserAuthenticated } from "../../../utils";
import { LangSwitcherReactI18 } from "../../languageSwitcher/react-i18/langSwitcher";

export const LayoutHeader: FC<any> = () => {
  const { t } = useTranslation();
  const tokenKey = process.env.REACT_APP_authenticatedTokenStorageKey || "xx";
  const userKey = process.env.REACT_APP_authenticatedUserStorageKey || "xx";
  // let user: AuthenticateUserResponse = useSelector((state: any) => ({
  //   ...state.user,
  // }));
  // user = {
  //   Result: null,
  //   userToken: null,
  //   isLoading: false,
  //   isAuthenticated: false,
  // };
  //console.log("user", user);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <LangSwitcherReactI18 />
      <p>
        {isUserAuthenticated() && (
          <button
            onClick={async () => {
              CookieSet(tokenKey, "", -10);
              CookieSet(userKey, "", -10);
              dispatch(
                // @ts-ignore
                logoutUser()
              );
              navigate("/");
            }}
          >
            {t("logout.button")}
          </button>
        )}
      </p>
    </>
  );
};
