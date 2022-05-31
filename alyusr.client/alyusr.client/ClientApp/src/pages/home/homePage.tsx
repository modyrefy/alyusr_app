import axios from "axios";
import { FC, useEffect } from "react";
import { LoginForm } from "../../components/authentication/loginForm";
import { AuthenticateUser } from "../../serviceBroker/alYusrApiServiceBroker";
export const HomePage: FC<{}> = () => {
  useEffect(() => {
    // const fillData = async () => {
    //   const data = await AuthenticateUser({ userName: "admin", password: "1" });
    //   // console.log("url-112");
    //   console.log("AuthenticateUser", data);
    // };
    // const fillData1 = async () => {
    //   const result = await axios.get(
    //     "https://alyusrmobileapi.alyusrsoft.com/ValidateLogin?userName=admin&password=1"
    //   );
    //   console.log("result-", result);
    // };
    //fillData();
    //fillData1();
  }, []);

  return (
    <>
      <LoginForm />
    </>
  );
};
