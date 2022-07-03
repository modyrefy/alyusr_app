import { ValidationError } from "../validation/error";
export interface PremissionKeys {
  IDForm: number;
  NameAr: string;
  NameEn?: string;
}
export interface Premission {
  NameAr?: string | null;
  NameEn?: string | null;
  Permission: number;
  IDForm: number;
  EnableSave: boolean;
  IsEnabledForTablet: boolean;
  EnableUpdate: boolean;
  EnableDelete: boolean;
  EnableSearch: boolean;
  ID: number;
  CreatedBy: number;
  ModifiedBy: number;
  Errors: ValidationError[];
  rowState: number;
}
export interface UserPremission {
  Errors: ValidationError[];
  Premissions: Premission[];
  Status: number;
}
