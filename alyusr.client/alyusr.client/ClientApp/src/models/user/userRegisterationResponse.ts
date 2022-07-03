import { ActionTypeEnum } from "../enums/enumList";
import { ValidationError } from "../validation/error";

export interface testModel {
  UserId: number;
  UserName: string;
}
export interface RequestAction {
  id: number;
  action: ActionTypeEnum;
}
export interface UserDeleteResponse {
  Errors: ValidationError[];
  Result: {
    Result: boolean;
    Errors: ValidationError[];
  };
  Status: number;
}
export interface UserRegisterationOptionsRequest {
  isUserNameModifiable?: boolean;
  isPasswordModifiable?: boolean;
  isNameArModifiable?: boolean;
  isNameEnModifiable?: boolean;
  isAdminModifiable?: boolean;
}
export interface UserRegisterationResponse {
  User_Name: string;
  Name_EN: string;
  Name: string;
  Password: string;
  IsAdmin: boolean;
  JWT: any;
  ID: number;
  CreatedBy: number;
  ModifiedBy: number;
  Errors: ValidationError[];
  rowState: number;
}
