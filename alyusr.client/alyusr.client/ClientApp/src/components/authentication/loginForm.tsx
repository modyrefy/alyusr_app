import { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthenticateUserRequest } from "../../models/user/authenticateUserRequest";
import { useTranslation } from "react-i18next";
import { LoadingBox } from "../box/loadingBox";
import { useDispatch, useSelector } from "react-redux";
import { AuthenticateUserResponse } from "../../models/user/authenticateUserResponse";
import { useNavigate } from "react-router-dom";
import { ValidationError } from "../../models/validation/error";
import { authenticateUser } from "../../slice/userAuthincateSlice";

export const LoginForm: FC<{}> = () => {
  //#region variables region
  const initialValues: AuthenticateUserRequest = {
    userName: "",
    password: "",
  };
  //#endregion
  //#region state region
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    ValidationError[] | undefined
  >(undefined);
  const [validationSchema, setValidationSchema] = useState(
    Yup.object({
      userName: Yup.string().required(t("login.userNameMissing")),
      password: Yup.string().required(t("login.passwordMissing")),
    })
  );
  const User: AuthenticateUserResponse = useSelector((state: any) => ({
    ...state.user,
  }));

  const dispatch = useDispatch();
  let navigate = useNavigate();
  //#endregion
  //#region functions region
  const handleUserAuthentication = async (request: AuthenticateUserRequest) => {
    setLoading(true);

    try {
      // const result = await AuthenticateUser(request);
      dispatch(
        authenticateUser({{
          userName: request.userName,
          password: request.password,
          remember: true,
        }})
      );
      // setValidationErrors(result.errors);
      // if (
      //   result != null &&
      //   result.errors !== null &&
      //   result.errors !== undefined &&
      //   result.errors.length !== 0
      // ) {
      //   window.scrollTo(0, 0);
      // }
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setValidationErrors(err);
      window.scrollTo(0, 0);
    }
  };
  //#endregion
  //#region formik region
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    onReset: (values) => {},
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await authenticateUser(values);
    },
  });
  //#endregion
  //#region useEffect region
  useEffect(() => {
    if (
      User &&
      User.errors !== null &&
      User.errors !== undefined &&
      User.errors.length !== 0
    ) {
      window.scrollTo(0, 0);
    }
    if (User.isAuthenticated) {
      //props.history.push("/");
      navigate("/product");
    }
  }, []);
  useEffect(() => {
    if (
      User &&
      User.errors !== null &&
      User.errors !== undefined &&
      User.errors.length !== 0
    ) {
      window.scrollTo(0, 0);
    }
    if (User.isAuthenticated) {
      navigate("/product");
    }
  }, [User.isAuthenticated, User.errors]);
  //#endregion
  return (
    <>
      {loading && <LoadingBox />}
      <form className="form-signin" onSubmit={formik.handleSubmit}>
        <h3 className="h3 mb-3 font-weight-normal">Sign In</h3>
        <div className="mb-3">
          <label className="form-label">
            {t("login.userName")} <span className="asterisk">*</span>
          </label>
          <input
            id="userName"
            name="userName"
            type="text"
            className="form-control"
            placeholder={t("login.enter_userName")}
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.userName ? (
            <span className="field-validate">{formik.errors.userName}</span>
          ) : null}
        </div>
        <div className="mb-3">
          <label className="form-label">
            {t("login.password")} <span className="asterisk">*</span>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-control"
            placeholder={t("login.enter_password")}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.userName ? (
            <span className="field-validate">{formik.errors.userName}</span>
          ) : null}
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            {t("login.submit")}
          </button>
        </div>
      </form>
    </>
  );
};
