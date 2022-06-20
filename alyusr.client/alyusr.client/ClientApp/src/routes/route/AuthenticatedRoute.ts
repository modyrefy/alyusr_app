import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ForbiddenPage } from "../../pages";
import { isUserAuthenticated } from "../../utils";
export const AuthenticatedRoute: FC<{ children: any }> = ({ children }) => {
  let navigate = useNavigate();
  useEffect(() => {
    console.log("isUserAuthenticated", isUserAuthenticated());
    if (!isUserAuthenticated()) {
      //navigate("/forbidden");
      navigate("/");
    }
  }, []);
  return children;
};
