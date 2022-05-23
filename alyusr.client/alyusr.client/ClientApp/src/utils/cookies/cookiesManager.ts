import Cookies from 'js-cookie'
import CryptoJS from "crypto-js";

const CookieSet=(name:string,
                 value:string,
                 expiryMinutes:number=Number(process.env.REACT_APP_cookieExpiryMinutes)||240)=> {
    Cookies.set(name, value,
        {expires: new Date(new Date().getTime() + expiryMinutes * 60  * 1000)});
};
const CookieEncryptedSet=(name:string,
                          value:string,
                          expiryMinutes:number=Number(process.env.REACT_APP_cookieExpiryMinutes)||240,
                          encryptKey:string=process.env.REACT_APP_cookieEncryptKey||'cookieSecretKey')=> {
    Cookies.set(name,
        CryptoJS.AES.encrypt(value, encryptKey).toString(),
        {expires: new Date(new Date().getTime() + expiryMinutes * 60 * 1000)});
};
const CookieGet=(name:string):string|undefined=>{
    return  Cookies.get(name);
};
const CookieEncryptedGet=(name:string,
                          encryptKey:string=process.env.REACT_APP_cookieEncryptKey||'cookieSecretKey'
):string|undefined=> {
    const cookieValue:string|undefined=  Cookies.get(name)
    return  cookieValue!==undefined && cookieValue!==null?CryptoJS.AES.decrypt(cookieValue.toString(), encryptKey).toString(CryptoJS.enc.Utf8):undefined;
};

export {CookieSet,CookieEncryptedSet,CookieGet,CookieEncryptedGet};
