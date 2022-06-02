export interface UserRegisterationRequest {
  User_Name: string;
  Name_EN: string;
  Name: string;
  Password: string;
  IsAdmin: boolean;
  JWT: string;
  ID: number;
  CreatedBy: number;
  ModifiedBy: number;
  rowState: number;
}
