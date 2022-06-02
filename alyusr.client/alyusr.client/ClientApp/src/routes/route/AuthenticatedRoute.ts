import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isUserAuthenticated } from "../../utils";

export const AuthenticatedRoute: FC<{ children: any }> = ({ children }) => {
  let navigate = useNavigate();
  useEffect(() => {
    return isUserAuthenticated() ? children : navigate("/forbiddenPage"); // <Navigate to="/unAuthenticated"/>
  }, []);
  //   const User: AuthenticateUserResponse = useSelector((state: any) => ({
  //     ...state.user,
  //   }));
  //   console.log("User-object-1", User);

  return null;
  //   //@ts-ignore
  //   const User = useSelector((state: IuserState) => ({ ...state.User }));
  //   console.log("isUserAuthenticated", isUserAuthenticated);
  //   return User && User.isAuthenticated ? children : navigate("/forbiddenPage"); // <Navigate to="/unAuthenticated"/>
};
