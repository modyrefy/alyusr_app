import { ValidationError } from "../validation/error";

export interface UnitModel {
  Name_En: string;
  Name: string;
  IsDefault: boolean;
  ID: number;
  CreatedBy: number;
  ModifiedBy: number;
  Errors: ValidationError[];
  rowState: number;
}
export interface DeleteunitModel {
  Result: boolean;
}
export interface UnitsModel {
  Errors: ValidationError[];
  Result: UnitModel[];
  Status: number;
}
