import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ForbiddenPage } from "../../pages";
import { isUserAuthenticated } from "../../utils";
import { MasterLayout } from "../../components/layout/masterLayout/masterLayout";
export const AuthenticatedRoute: FC<{ children: any }> = ({ children }) => {
  let navigate = useNavigate();

  useEffect(() => {
    if (!isUserAuthenticated()) {
      navigate("/forbidden");
    }
  }, []);
  return children;
};
