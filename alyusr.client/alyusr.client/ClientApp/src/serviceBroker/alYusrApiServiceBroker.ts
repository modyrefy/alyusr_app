import { AuthenticateUserRequest } from "../models/user/authenticateUserRequest";
import { AuthenticateUserResponse } from "../models/user/authenticateUserResponse";
import AlYusrAxiosApiInstance from "../axios/alYusrAxiosApiInstance";
import { UserRegisterationRequest } from "../models/user/userRegisterationRequest";
import { UserRegisterationResponse } from "../models/user/userRegisterationResponse";
import { ResponseBase } from "../models/base/responseBase";
import { resolveTypeReferenceDirective } from "typescript";
import axios from "axios";
//#region lookup

//#endregion
//#region user
export const AuthenticateUser = async (
  request: AuthenticateUserRequest
): Promise<AuthenticateUserResponse> => {
  let apiResponse: AuthenticateUserResponse = {
    isAuthenticated: false,
    isLoading: false,
  };
  try {
    let url: string = `ValidateLogin?userName=${request.userName}&password=${request.password}`;
    //var result: any = await AlYusrAxiosApiInstance.get(url);
    apiResponse = await AlYusrAxiosApiInstance.get(url);
    //console.log("apiResponse-11", result);
    return apiResponse;
  } catch (err) {
    alert(err);
  }
  return apiResponse;
};
export const registerUser = async (
  request: UserRegisterationResponse
): Promise<UserRegisterationResponse> => {
  let apiResponse: UserRegisterationResponse = {
    User_Name: "",
    Name_EN: "",
    Name: "",
    Password: "",
    IsAdmin: false,
    JWT: undefined,
    ID: 0,
    CreatedBy: 0,
    ModifiedBy: 0,
    Errors: [],
    rowState: 0,
  };
  try {
    let url: string = `${process.env.REACT_APP_AlyusrApiEndpoint}SaveUser`;
    console.log("request-SaveUser", { ...request });
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };

    apiResponse = await axios.post(url, { ...request }, { headers });
    // apiResponse = await AlYusrAxiosApiInstance.post(url, { ...request });
    //apiResponse = await AlYusrAxiosApiInstance.post(url, request);
    console.log("SaveUser", apiResponse);
    return apiResponse;
  } catch (err) {
    alert(err);
  }
  return apiResponse;
};
export const getUsers = async (): Promise<UserRegisterationResponse[]> => {
  //let apiResponse: UserRegisterationResponse[] = [];
  try {
    let url: string = `GetUsersList`;
    const result: ResponseBase<UserRegisterationResponse[]> =
      await AlYusrAxiosApiInstance.get(url);
    // @ts-ignore
    return result !== null && result !== undefined ? result.Result : [];
  } catch (err) {
    alert(err);
  }
  return [];
};
//#endregion
