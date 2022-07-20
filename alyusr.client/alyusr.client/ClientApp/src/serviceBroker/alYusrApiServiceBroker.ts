import { AuthenticateUserRequest } from "../models/user/authenticateUserRequest";
import { AuthenticateUserResponse } from "../models/user/authenticateUserResponse";
import AlYusrAxiosApiInstance from "../axios/alYusrAxiosApiInstance";
import {
  UserDeleteResponse,
  UserRegisterationResponse,
} from "../models/user/userRegisterationResponse";
import { ResponseBase } from "../models/base/responseBase";
import _ from "lodash";
import {
  Premission,
  UserPremission,
} from "../models/user/useePermissionResponse";
import { CompanySetting } from "../models/company/companySetting";
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
export const deleteUser = async (id: number): Promise<UserDeleteResponse> => {
  let apiResponse: UserDeleteResponse = {
    Errors: [],
    Result: {
      Result: false,
      Errors: [],
    },
    Status: 0,
  };
  try {
    let url: string = `DeleteUser?id=${id}`;
    apiResponse = await AlYusrAxiosApiInstance.post(url);
    console.log("DeleteUser", apiResponse);
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
    let url: string = `SaveUser`;
    apiResponse = await AlYusrAxiosApiInstance.post(url, { ...request });
    console.log("SaveUser", apiResponse);
    return apiResponse;
  } catch (err) {
    alert(err);
  }
  return apiResponse;
};
export const SaveUserPremissions = async (
  request: Premission[]
): Promise<Premission[]> => {
  let apiResponse: Premission[] = [];
  try {
    let url: string = `SaveUserPermissions`;
    apiResponse = await AlYusrAxiosApiInstance.post(url, request);
    console.log("SaveUserPremissions", apiResponse);
    return apiResponse;
  } catch (err) {
    alert(err);
  }
  return apiResponse;
};
export const getUsers = async (): Promise<UserRegisterationResponse[]> => {
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
export const getUserInformation = async (
  id: number
): Promise<UserRegisterationResponse | null> => {
  try {
    let url: string = `GetUsersList`;
    const result: ResponseBase<UserRegisterationResponse[]> =
      await AlYusrAxiosApiInstance.get(url);
    // @ts-ignore
    var responseObject =
      result !== null &&
      result !== undefined &&
      result.Result != null &&
      result.Result?.length !== 0
        ? _.find(result.Result, (o) => {
            return o.ID === id;
          })
        : null;
    return responseObject !== null && responseObject !== undefined
      ? responseObject
      : null;
  } catch (err) {
    alert(err);
  }
  return null;
};
export const getUserPremission = async (
  id: number,
  isArabic: boolean
): Promise<Premission[]> => {
  try {
    let url: string = `GetUserPermission?userID=${id}&lang=${isArabic ? 1 : 2}`;
    const result: ResponseBase<UserPremission> =
      await AlYusrAxiosApiInstance.get(url);
    // const premissions: PremissionKeys[] = [
    //   {
    //     IDForm: 3,
    //     NameAr: "IDForm_3",
    //     NameEn: "IDForm_3",
    //   },
    //   {
    //     IDForm: 55,
    //     NameAr: "IDForm_55",
    //     NameEn: "IDForm_55",
    //   },
    //   {
    //     IDForm: 13,
    //     NameAr: "IDForm_13",
    //     NameEn: "IDForm_13",
    //   },
    //   {
    //     IDForm: 162,
    //     NameAr: "IDForm_162",
    //     NameEn: "IDForm_162",
    //   },
    //   {
    //     IDForm: 11155,
    //     NameAr: "IDForm_11155",
    //     NameEn: "IDForm_11155",
    //   },
    // ];

    // var merged = _.merge(
    //   _.keyBy(result.Result, "IDForm"),
    //   _.keyBy(premissions, "IDForm")
    // );
    // @ts-ignore
    console.log("sss", result.Result[0]);
    // @ts-ignore
    return result !== null && result !== undefined ? result.Result : [];
  } catch (err) {
    alert(err);
  }
  return [];
};
//#endregion
//#region setting
export const getCompanySetting = async (): Promise<CompanySetting | null> => {
  try {
    let url: string = `GetCompanySettings`;
    const result: ResponseBase<CompanySetting> =
      await AlYusrAxiosApiInstance.get(url);
    // @ts-ignore
    return result !== null && result !== undefined ? result.Result : null;
  } catch (err) {
    alert(err);
  }
  return null;
};
export const SaveCompanySetting = async (
  request: CompanySetting
): Promise<ResponseBase<CompanySetting> | null> => {
  try {
    let url: string = `SaveCompanySetting`;
    console.log("request_111", request);
    const result: ResponseBase<CompanySetting> =
      await AlYusrAxiosApiInstance.post(url, request);
    console.log("result_111", result);
    // @ts-ignore
    return result;
  } catch (err) {
    alert(err);
  }
  return null;
};
//#endregion
