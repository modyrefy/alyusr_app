"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var utils_1 = require("../utils");
// @ts-ignore
var DefaultAxiosApiInstance = axios_1.default.create({
    baseURL: process.env.REACT_APP_AlyusrApiEndpoint != null ? process.env.REACT_APP_AlyusrApiEndpoint.toString().trim() : "no-url",
    headers: {
        //Accept:"application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    },
});
DefaultAxiosApiInstance.interceptors.request.use(function (config) {
    var _a;
    // @ts-ignore
    // const token: string | null = LocalStorageGet(process.env.REACT_APP_authenticatedTokenStorageKey);
    var token = (0, utils_1.CookieGet)(process.env.REACT_APP_authenticatedTokenStorageKey);
    if ((_a = config.url) === null || _a === void 0 ? void 0 : _a.includes("file/upload")) {
        // @ts-ignore
        config.headers['content-type'] = 'multipart/form-data';
    }
    else {
        // @ts-ignore
        config.headers['content-type'] = "application/json";
        // @ts-ignore
        config.headers['Accept'] = "application/json";
    }
    if (token) {
        // @ts-ignore
        config.headers['Authorization'] = "Bearer ".concat(token);
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
DefaultAxiosApiInstance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    var result = { result: undefined };
    if (error.response) {
        if (error.response.status === 401) {
            result = {
                recordCount: 0,
                token: '',
                result: {},
                errors: [
                    {
                        messageEn: 'authorization failed please try to login',
                        messageAr: 'فشل فى تسجيل الدخول الرجاء اعادة المحاولة مرة اخرى'
                    }
                ]
            };
        }
        else if (error.response.status === 400) {
            var errors_1 = [];
            if (error.response !== null && error.response.data !== null && error.response.data.Errors !== null && error.response.data.errors !== undefined && error.response.data.errors.length != 0) {
                error.response.data.errors.map(function (err) {
                    errors_1.push({ messageAr: err.errorMessage, messageEn: err.errorMessage });
                });
            }
            else {
            }
            result = {
                recordCount: 0,
                token: '',
                result: {},
                errors: errors_1
            };
        }
    }
    else {
        if (error.message) {
            result = {
                recordCount: 0,
                result: {},
                token: '',
                errors: [{ messageAr: error.errorMessage, messageEn: error.errorMessage }]
            };
            return result;
        }
        else if (error.request) {
            result = {
                recordCount: 0,
                token: '',
                result: {},
                errors: [{
                        messageEn: 'error occurred  try again later',
                        messageAr: 'حدث خطأ حاول مرة أخرى في وقت لاحق'
                    }]
            };
            //return  error.request.data;
        }
    }
    return result;
});
exports.default = DefaultAxiosApiInstance;
//# sourceMappingURL=defaultAxiosApiInstance.js.map