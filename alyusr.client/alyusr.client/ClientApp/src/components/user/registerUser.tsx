import { useFormik } from "formik";
import * as Yup from "yup";
import { FC, useState } from "react";
import {
  UserRegisterationOptionsRequest,
  UserRegisterationResponse,
} from "../../models/user/userRegisterationResponse";
import { useTranslation } from "react-i18next";
import { isArabicCurrentLanguage } from "../../utils";
import { Button } from "react-bootstrap";
import { registerUser } from "../../serviceBroker/alYusrApiServiceBroker";
import { ValidationError } from "../../models/validation/error";
import { LoadingBox } from "../box/loadingBox";
import { MessageBox } from "../box/messageBox";
export const RegisterUser: FC<{
  request?: UserRegisterationResponse | null;
  options?: UserRegisterationOptionsRequest | null;
  onComplete: any | null;
}> = ({ request, options, onComplete }) => {
  //#region varaibles
  options = options ?? {
    isUserNameModifiable: true,
    isPasswordModifiable: true,
    isNameArModifiable: true,
    isNameEnModifiable: true,
    isAdminModifiable: true,
  };
  const cssPrefix: string = isArabicCurrentLanguage() ? "_ar" : "_en";
  const initialValues: UserRegisterationResponse = request ?? {
    User_Name: "",
    Name_EN: "",
    Name: "",
    Password: "",
    IsAdmin: false,
    JWT: undefined,
    ID: 0,
    CreatedBy: 0,
    ModifiedBy: 0,
    Errors: [],
    rowState: 0,
  };
  //#endregion
  //#region state
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
  const [validationSchema, setValidationSchema] = useState(
    Yup.object({
      User_Name: options.isUserNameModifiable
        ? Yup.string().required(t("user.register.username.missing"))
        : Yup.string(),
      Name_EN: options.isNameEnModifiable
        ? Yup.string().required(t("user.register.nameen.missing"))
        : Yup.string(),
      Name: options.isNameArModifiable
        ? Yup.string().required(t("user.register.name.missing"))
        : Yup.string(),
      Password: options.isPasswordModifiable
        ? Yup.string().required(t("user.register.password.missing"))
        : Yup.string(),
    })
  );
  //#endregion
  //#region function
  const handleSubmit = async (request: UserRegisterationResponse) => {
    try {
      setLoading(true);
      // //throw " I will not close if you click outside me. Don't even try to press escape key.";
      const res = await registerUser(request);
      if (res != null && res.Errors != null && res.Errors.length !== 0) {
        setValidationErrors(res.Errors);
        setLoading(false);
      } else {
        setValidationErrors([]);
        onComplete(true);
      }
    } catch (err: any) {
      setLoading(false);
      const errors: ValidationError[] = [{ MessageAr: err, MessageEn: err }];
      setValidationErrors(errors);
    }
  };
  //#en
  //#endregion
  //#region formik
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onReset: (values) => {
      console.log("reset");
      onComplete(false);
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      await handleSubmit(values);
      resetForm();
    },
  });
  //#endregion
  //#region html
  return (
    <>
      {loading && <LoadingBox />}
      {<MessageBox errors={validationErrors} />}
      <form onSubmit={formik.handleSubmit}>
        {/* <p>id: {initialValues.ID}</p> */}
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">{t("user.userName")}</label>
          </div>
          <div className="col-md-4">
            <input
              id="User_Name"
              name="User_Name"
              readOnly={!options.isUserNameModifiable}
              type="text"
              value={formik.values.User_Name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.errors.User_Name
                  ? `text-input error${cssPrefix}`
                  : formik.values.User_Name
                  ? `text-input success${cssPrefix}`
                  : `text-input error${cssPrefix}`
              }
            />
            {formik.errors.User_Name ? <>{formik.errors.User_Name}</> : null}
          </div>
        </div>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">{t("user.password")}</label>
          </div>
          <div className="col-md-4">
            <input
              id="Password"
              name="Password"
              type="text"
              // className="form-control"
              value={formik.values.Password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.errors.Password
                  ? `text-input error${cssPrefix}`
                  : formik.values.Password
                  ? `text-input success${cssPrefix}`
                  : `text-input error${cssPrefix}`
              }
            />
            {formik.errors.Password ? <>{formik.errors.Password}</> : null}
          </div>
        </div>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">{t("user.nameEn")}</label>
          </div>
          <div className="col-md-4">
            <input
              id="Name_EN"
              name="Name_EN"
              type="text"
              //className="form-control"
              value={formik.values.Name_EN}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.errors.Name_EN
                  ? `text-input error${cssPrefix}`
                  : formik.values.Name_EN
                  ? `text-input success${cssPrefix}`
                  : `text-input error${cssPrefix}`
              }
            />
            {formik.errors.Name_EN ? <>{formik.errors.Name_EN}</> : null}
          </div>
        </div>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">{t("user.nameAr")}</label>
          </div>
          <div className="col-md-4">
            <input
              id="Name"
              name="Name"
              type="text"
              value={formik.values.Name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.errors.Name
                  ? `text-input error${cssPrefix}`
                  : formik.values.Name
                  ? `text-input success${cssPrefix}`
                  : `text-input error${cssPrefix}`
              }
            />
            {formik.errors.Name ? <>{formik.errors.Name}</> : null}
          </div>
        </div>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">{t("user.isAdmin")} </label>
          </div>
          <div className="col-md-4 ">
            <input
              id="IsAdmin"
              name="IsAdmin"
              type="checkbox"
              checked={formik.values.IsAdmin}
              //value={formik.values.IsAdmin ? 1 : 0}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>
        <div className="accordion-footer">
          <div className="col-md-12 d-flex justify-content-end">
            <Button
              type="submit"
              className="btn btn-orange"
              variant="outline-primary"
            >
              {t("user.registerUser")}
            </Button>
            <Button
              variant="outline-primary"
              type="button"
              className="btn btn-orange"
              onClick={formik.handleReset}
            >
              {t("user.reset")}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
  //#endregion
};
