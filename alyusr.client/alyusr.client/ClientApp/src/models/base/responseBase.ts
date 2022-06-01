import { ValidationError } from "../validation/error";

export interface ResponseBase<T> {
  Result?: T;
  status?: number;
  Errors?: ValidationError[];
  token?: string;
  recordCount?: number;
}
