import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { reduxBatch } from "@manaflair/redux-batch";
import userAuthenticate from "../slice/userAuthincateSlice";
import theme from "../slice/themeSlice";
import languageState from "../slice/languageSlice";
import { UserResponse } from "../models/user/authenticateUserResponse";
import { CookieGet } from "../utils";
import Cookies from "js-cookie";

const reducer = {
  user: userAuthenticate,
  lang: languageState,
  theme: theme,
};

// @ts-ignore
const authenticatedTokenStorageKey: string =
  process.env.REACT_APP_authenticatedTokenStorageKey;
// @ts-ignore
const authenticatedUserStorageKey: string =
  process.env.REACT_APP_authenticatedUserStorageKey;
// @ts-ignore
const languageStorageKey: string = process.env.REACT_APP_languageStorageKey;
const userObject = Cookies.get(authenticatedUserStorageKey)
  ? (JSON.parse(CookieGet(authenticatedUserStorageKey) || "{}") as UserResponse)
  : null;
// if (userObject === null || userObject === undefined) {
//   console.log("userObject-1", "empty");
// } else {
//   console.log("userObject-2", userObject);
// }
const preloadedState = {
  user: {
    userAccount: userObject ?? null,
    userToken: Cookies.get(authenticatedTokenStorageKey)
      ? CookieGet(authenticatedTokenStorageKey)
      : null,
    isLoading: false,
    isAuthenticated: Cookies.get(authenticatedTokenStorageKey) ? true : false,
    Errors: [],
  },
  lang: {
    language: "ar-AE",
    // language: Cookies.get(languageStorageKey)
    //   ? CookieGet(languageStorageKey)
    //   : "ar-AE",
  },
  theme: {
    isRtl: Cookies.get(languageStorageKey)
      ? CookieGet(languageStorageKey) === "ar-AE"
        ? true
        : false
      : false,
  },
};

//
// const store1: Store<ArticleState, ArticleAction> & {
//     dispatch: DispatchType
// } = createStore(reducer, applyMiddleware(thunk))

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
  preloadedState,
  enhancers: [reduxBatch],
});

export default store;
