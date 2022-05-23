import {ValidationError} from "../validation/error"
import {UserResponse} from "./authenticateUserResponse";


export interface IUserState {
    userAccount?: UserResponse |null
    userToken?:string|null,
    isLoading:boolean,
    isAuthenticated:boolean,
    redirectUrl?:string,
    errors?:ValidationError[]
}
