import { createSlice } from "@reduxjs/toolkit";
import defaultAxiosApiInstance from "../axios/alYusrAxiosApiInstance";
import {
  AuthenticateUserResponse,
  UserResponse,
} from "../models/user/authenticateUserResponse";
import { LayoutEnum, UserRoleEnum } from "../models/enums/enumList";
import { AuthenticateUserRequest } from "../models/user/authenticateUserRequest";
import { CookieEncryptedSet, CookieSet } from "../utils/cookies/cookiesManager";
import { AuthenticateUser } from "../serviceBroker/alYusrApiServiceBroker";

const initialState: AuthenticateUserResponse = {
  Result: null,
  userToken: null,
  isLoading: false,
  isAuthenticated: false,
  Errors: [],
};

const slice = createSlice({
  name: "UserAuthenticate",
  initialState: initialState,
  reducers: {
    setLoading: (state, action) => {
      // alert('state ' +JSON.stringify(state));
      return {
        ...state,
        isLoading: action.payload,
      };
    },
    setAuthenticateSuccess: (state, action) => {
      const { response, token, remember } = action.payload;
      generateUserDefaultLayoutStorage(response).then((r) => {
        console.log(r);
      });
      if (remember === true) {
        CookieSet(
          process.env.REACT_APP_authenticatedTokenStorageKey ||
            "authenticationToken",
          token
        );
        CookieSet(
          process.env.REACT_APP_authenticatedUserStorageKey ||
            "authenticationUser",
          JSON.stringify(response)
        );
      }
      return {
        ...state,
        Result: response, //action.payload,
        userToken: token,
        isLoading: false,
        isAuthenticated: true,
        Errors: [],
      };
    },
    setIntegrationAuthenticateSuccess: (state, action) => {
      const { token } = action.payload;
      // @ts-ignore
      //LocalStorageSet(process.env.REACT_APP_authenticatedTokenStorageKey, token);
      CookieSet(process.env.REACT_APP_authenticatedTokenStorageKey, token);
      return {
        ...state,
        Result: null, //action.payload,
        userToken: token,
        isLoading: false,
        isAuthenticated: true,
        errors: [],
      };
    },
    setAuthenticateFailed: (state, action) => {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        Errors: action.payload,
      };
    },
    setAuthenticationReset: (state, action) => {
      return {
        ...state,
        Result: null,
        isLoading: false,
        isAuthenticated: false,
        userToken: null,
        redirectUrl: "/",
        Rrrors: [],
      };
    },
  },
});

export default slice.reducer;
const {
  setLoading,
  setAuthenticateSuccess,
  setAuthenticateFailed,
  setAuthenticationReset,
  setIntegrationAuthenticateSuccess,
} = slice.actions;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const generateUserDefaultLayoutStorage = async (
  user: AuthenticateUserResponse
): Promise<string | undefined> => {
  let defaultLayout: number = LayoutEnum.DefaultLayout;
  if (user !== null && user != undefined) {
    //switch (user.roleId) {
    //    case UserRoleEnum.OnlineUser:
    //        defaultLayout = LayoutEnum.OnlineLayout;
    //        break;
    //    // case UserRoleEnum.Admin:
    //    //     defaultLayout = LayoutEnum.AdminLayout;
    //    //     break;
    //    // case UserRoleEnum.SeniorAdmin:
    //    //     defaultLayout = LayoutEnum.SeniorAdminLayout;
    //    //     break;
    //    case UserRoleEnum.Inspector:
    //    case UserRoleEnum.SeniorAdmin:
    //    case UserRoleEnum.Admin:
    //    default:
    //        defaultLayout = LayoutEnum.DefaultLayout;
    //        break;
    //}
    //const result = LocalStorageEncryptedWithReturnValueSet(AppConfiguration.Setting().defaultLayoutStorageKey, defaultLayout.toString());
    //const result = LocalStorageSet(process.env.REACT_APP_localStorageEncryptKey||'-', defaultLayout.toString());
    const result = CookieSet(
      process.env.REACT_APP_localStorageEncryptKey || "-",
      defaultLayout.toString()
    );
    return result === null || result === undefined ? "" : result;
  }
};
export const authenticateUser = (obj: AuthenticateUserRequest) => {
  return async (dispatch: any, getState: any) => {
    try {
      dispatch(setLoading(true));
      const params = { ...obj };
      let apiResponse: AuthenticateUserResponse = await AuthenticateUser(
        params
      );
      console.log("authincate " + JSON.stringify(apiResponse));
      if (
        apiResponse != null &&
        apiResponse.Result !== null &&
        apiResponse.Result !== undefined
      ) {
        //alert("apiRespopnse" + JSON.stringify(apiRespopnse));
        dispatch(
          setAuthenticateSuccess({
            response: apiResponse.Result,
            remember: obj.remember,
            token: apiResponse.Result.Token,
          })
        );
      } else {
        console.log("apiResponse.Errors " + JSON.stringify(apiResponse.Errors));
        dispatch(setAuthenticateFailed(apiResponse.Errors));
      }
    } catch (err: any) {
      // alert('setAuthenticateFailed '+ err);
      dispatch(
        setAuthenticateFailed([
          {
            message: err.message,
          },
        ])
      );
    } finally {
      // dispatch(setLoading(false));
    }
  };
};
export const resetAuthenticateUser =
  () => async (dispatch: any, getstate: any) => {
    dispatch(setAuthenticationReset(null));
  };
export const authenticateIntegrationUser =
  (token: string) => async (dispatch: any, getstate: any) => {
    dispatch(setIntegrationAuthenticateSuccess({ token: token }));
  };
export const logoutUser = () => {
  return async (dispatch: any, getstate: any) => {
    dispatch(setAuthenticationReset(null));
  };
};
