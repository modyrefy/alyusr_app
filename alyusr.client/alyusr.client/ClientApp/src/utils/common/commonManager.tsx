import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { AuthenticateUserResponse } from "../../models/user/authenticateUserResponse";

export const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const isUserAuthenticated = (): boolean => {
  return Cookies.get(process.env.REACT_APP_authenticatedTokenStorageKey || "")
    ? true
    : false;
};
