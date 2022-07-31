export interface LookupModel {
  Name: string;
  Type_ID: number;
  Code?: string | null;
  NameEn: string;
  Note?: string | null;
  IsDefault: boolean;
  Active: boolean;
  Value?: number | null;
  ID: number;
  CreatedBy: number;
  ModifiedBy: number;
  rowState: number;
}
export interface LookupErrorModel {
  ValueError?: string | null;
}
export interface DeleteLookupModel {
  Result: boolean;
}
