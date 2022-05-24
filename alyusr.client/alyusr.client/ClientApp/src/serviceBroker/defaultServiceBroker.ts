import {AuthenticateUserRequest} from "../models/user/authenticateUserRequest";
import {AuthenticateUserResponse} from "../models/user/authenticateUserResponse";
import DefaultAxiosApiInstance from "../axios/defaultAxiosApiInstance";
//#region lookup

//#endregion
//#region get
export  const AuthenticateUser=async(request: AuthenticateUserRequest ):Promise<AuthenticateUserResponse> =>{
    let apiResponse:AuthenticateUserResponse={isAuthenticated: false, isLoading: false};
    try {
        let url: string = `ValidateLogin?userName=${request.userName}&password=${request.password}`;
        var result: any = await DefaultAxiosApiInstance.get(url);
        apiResponse = await DefaultAxiosApiInstance.get(url);
        console.log('apiResponse-11', result);
        return  apiResponse;
    } catch (err) {
        alert(err);
    }
    return  apiResponse;
}
//#endregion
//#region post



//#endregion
