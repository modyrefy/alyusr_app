import { ValidationError } from "../validation/error";

export interface testModel {
  UserId: number;
  UserName: string;
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
