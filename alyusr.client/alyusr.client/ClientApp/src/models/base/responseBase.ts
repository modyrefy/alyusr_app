import {ValidationError} from "../validation/error";

export interface ResponseBase<T> {
    result?: T,
    status?: number,
    errors?: ValidationError[],
    token?: string,
    recordCount?:number
}
