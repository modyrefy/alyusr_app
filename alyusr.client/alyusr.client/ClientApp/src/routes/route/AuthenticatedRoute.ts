import { FC } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const AuthenticatedRoute: FC<{ children: any }> = ({ children }) => {
    let navigate = useNavigate();
    // @ts-ignore
    const User = useSelector((state: IuserState) => ({ ...state.User }));
    return User && User.isAuthenticated ? children : navigate("/unAuthenticated");// <Navigate to="/unAuthenticated"/>
    
}