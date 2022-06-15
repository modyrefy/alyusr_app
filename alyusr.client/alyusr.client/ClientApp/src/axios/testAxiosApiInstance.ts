import axios from "axios";
import { ResponseBase } from "../models/base/responseBase";
import { GeneralResponse } from "../models/base/generalResponse";
import { ValidationError } from "../models/validation/error";
import { CookieGet } from "../utils";
// @ts-ignore
const TestAxiosApiInstance = axios.create({
  baseURL: process.env.REACT_APP_TestApiEndpoint,
  // headers: {
  //   Accept: "application/json",
  //   "Content-Type": "application/json",
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  //   "Access-Control-Allow-Headers":
  //     "Origin, X-Requested-With, Content-Type, Accept",
  // },
});
TestAxiosApiInstance.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);
TestAxiosApiInstance.interceptors.response.use(
  (response) => {
    // @ts-ignore
    return response.data;
  },
  (error) => {
    console.log("response-axios-error", error);
    let result: ResponseBase<GeneralResponse> = { Result: undefined };
    if (error.response) {
      if (error.response.status === 401) {
        result = {
          recordCount: 0,
          token: "",
          Result: {},
          Errors: [
            {
              MessageEn: "authorization failed please try to login",
              MessageAr: "فشل فى تسجيل الدخول الرجاء اعادة المحاولة مرة اخرى",
            },
          ],
        };
      } else if (error.response.status === 400) {
        const errors: ValidationError[] = [];
        if (
          error.response !== null &&
          error.response.data !== null &&
          error.response.data.errors !== null &&
          error.response.data.errors !== undefined &&
          error.response.data.errors.length !== 0
        ) {
          error.response.data.errors.map((err: any) => {
            errors.push({
              MessageAr: err.errorMessage,
              MessageEn: err.errorMessage,
            });
          });
        } else {
        }
        result = {
          recordCount: 0,
          token: "",
          Result: {},
          Errors: errors,
        };
      }
    } else {
      if (error.message) {
        result = {
          recordCount: 0,
          Result: {},
          token: "",
          Errors: [
            { MessageAr: error.errorMessage, MessageEn: error.errorMessage },
          ],
        };
        return result;
      } else if (error.request) {
        result = {
          recordCount: 0,
          token: "",
          Result: {},
          Errors: [
            {
              MessageEn: "error occurred  try again later",
              MessageAr: "حدث خطأ حاول مرة أخرى في وقت لاحق",
            },
          ],
        };
        //return  error.request.data;
      }
    }
    return result;
  }
);
export default TestAxiosApiInstance;
