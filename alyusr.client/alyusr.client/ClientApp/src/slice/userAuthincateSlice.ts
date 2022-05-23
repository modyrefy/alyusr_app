import { createSlice } from "@reduxjs/toolkit";
import defaultAxiosApiInstance from "../axios/defaultAxiosApiInstance";
import { AuthenticateUserResponse, UserResponse } from "../models/user/AuthenticateUserResponse";
import { LayoutEnum, UserRoleEnum } from "../models/enums/EnumList";
import { IUserState } from "../models/user/UserState";
import { AuthenticateUserRequest } from "../models/user/AuthenticateUserRequest";
import { CookieEncryptedSet, CookieSet } from "../utils/cookies/CookiesManager";


const initialState: IUserState = {
    userAccount: null,
    userToken: null,
    isLoading: false,
    isAuthenticated: false,
    errors: []
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
            }
        },
        setAuthenticateSuccess: (state, action) => {
            const { response, token, remember } = action.payload;
            generateUserDefaultLayoutStorage(response).then((r) => {
                console.log(r);
            });
            if (remember === true) {
                CookieSet(process.env.REACT_APP_authenticatedTokenStorageKey || 'authenticationToken', JSON.stringify(token));
                CookieEncryptedSet(process.env.REACT_APP_authenticatedUserStorageKey || 'authenticationUser', JSON.stringify(response))
                // LocalStorageSet(process.env.REACT_APP_authenticatedTokenStorageKey||'authenticationToken', JSON.stringify(token));
                // LocalStorageEncryptedSet(process.env.REACT_APP_authenticatedUserStorageKey||'authenticationUser', JSON.stringify(response));
            }
            return {
                ...state,
                userAccount: response,//action.payload,
                userToken: token,
                isLoading: false,
                isAuthenticated: true,
                errors: [],
            };
        },
        setIntegrationAuthenticateSuccess: (state, action) => {
            const { token } = action.payload;
            // @ts-ignore
            //LocalStorageSet(process.env.REACT_APP_authenticatedTokenStorageKey, token);
            CookieSet(process.env.REACT_APP_authenticatedTokenStorageKey, token);
            return {
                ...state,
                userAccount: null,//action.payload,
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
                errors: action.payload,
            };
        },
        setAuthenticationReset: (state, action) => {
            return {
                ...state,
                userAccount: null,
                isLoading: false,
                isAuthenticated: false,
                redirectUrl: "/inspection/unAuthenticated",
                errors: [],
            };
        },
    }
});

export default slice.reducer;
const {
    setLoading,
    setAuthenticateSuccess,
    setAuthenticateFailed,
    setAuthenticationReset,
    setIntegrationAuthenticateSuccess
} = slice.actions;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const generateUserDefaultLayoutStorage = async (user: UserResponse): Promise<string | undefined> => {
    let defaultLayout: number = LayoutEnum.DefaultLayout;
    if (user !== null && user != undefined) {
        switch (user.roleId) {
            case UserRoleEnum.OnlineUser:
                defaultLayout = LayoutEnum.OnlineLayout;
                break;
            // case UserRoleEnum.Admin:
            //     defaultLayout = LayoutEnum.AdminLayout;
            //     break;
            // case UserRoleEnum.SeniorAdmin:
            //     defaultLayout = LayoutEnum.SeniorAdminLayout;
            //     break;
            case UserRoleEnum.Inspector:
            case UserRoleEnum.SeniorAdmin:
            case UserRoleEnum.Admin:
            default:
                defaultLayout = LayoutEnum.DefaultLayout;
                break;
        }
        //const result = LocalStorageEncryptedWithReturnValueSet(AppConfiguration.Setting().defaultLayoutStorageKey, defaultLayout.toString());
        //const result = LocalStorageSet(process.env.REACT_APP_localStorageEncryptKey||'-', defaultLayout.toString());
        const result = CookieSet(process.env.REACT_APP_localStorageEncryptKey || '-', defaultLayout.toString());
        return result === null || result === undefined ? '' : result;

    }

};
export const authenticateUser = (obj: AuthenticateUserRequest) => {
    return async (dispatch: any, getState: any) => {
        try {
            dispatch(setLoading(true));
            //await sleep(2000);
            const params = { ...obj };
            // alert('alert ' + JSON.stringify(params))
            let apiResponse: AuthenticateUserResponse = await defaultAxiosApiInstance.post("user/authenticate", params);
            //onsole.log('authincate ' + JSON.stringify(apiResponse));
            if (apiResponse != null && apiResponse.result != null && apiResponse.result != undefined) {
                //alert("apiRespopnse" + JSON.stringify(apiRespopnse));
                dispatch(setAuthenticateSuccess(
                    {
                        response: apiResponse.result,
                        remember: obj.remember,
                        token: apiResponse.token
                    }));
            } else {
                //alert('setAuthenticateFailed 11'+ JSON.stringify(apiRespopnse.errors));
                dispatch(setAuthenticateFailed(apiResponse.errors));
            }
        } catch (err: any) {
            // alert('setAuthenticateFailed '+ err);
            dispatch(setAuthenticateFailed([
                {
                    message: err.message,
                },
            ]));
        } finally {
            // dispatch(setLoading(false));
        }
    };
};
export const resetAuthenticateUser = () => async (dispatch: any, getstate: any) => {
    dispatch(setAuthenticationReset(null));
};
export const authenticateIntegrationUser = (token: string) => async (dispatch: any, getstate: any) => {
    dispatch(setIntegrationAuthenticateSuccess({ token: token }))
}
export const logoutUser = () => async (dispatch: any, getstate: any) => {
    dispatch(setAuthenticationReset(null));
};