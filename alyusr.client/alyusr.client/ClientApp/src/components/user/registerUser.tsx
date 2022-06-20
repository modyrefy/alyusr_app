import { Field, useFormik } from "formik";
import * as Yup from "yup";
import { FC, useState } from "react";
import { UserRegisterationResponse } from "../../models/user/userRegisterationResponse";
import { useTranslation } from "react-i18next";
import { Accordion } from "react-bootstrap";
import deepEqual from "lodash.isequal";
import { isArabicCurrentLanguage } from "../../utils";
export const RegisterUser: FC<{
  onSubmit: any | null;
}> = ({ onSubmit }) => {
  //#region varaibles
  const cssPrefix: string = isArabicCurrentLanguage() ? "_ar" : "_en";
  const initialValues: UserRegisterationResponse = {
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
  const [validationSchema, setValidationSchema] = useState(
    Yup.object({
      User_Name: Yup.string().required(t("user.register.username.missing")),
      Name_EN: Yup.string().required(t("user.register.nameen.missing")),
      Name: Yup.string().required(t("user.register.name.missing")),
      Password: Yup.string().required(t("user.register.password.missing")),
    })
  );
  //#endregion
  //#region function
  const handleSubmit = async (data: UserRegisterationResponse) => {
    onSubmit(data);
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
      <form onSubmit={formik.handleSubmit}>
        {/* <Accordion defaultActiveKey="0" flush className="insp-accordiona-panel">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <>{t("user.registerUser")}</>
            </Accordion.Header>
            <Accordion.Body> */}
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">{t("user.userName")}</label>
            <input
              id="User_Name"
              name="User_Name"
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
          <div className="col-md-4">
            <label className="form-label">{t("user.password")}</label>
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
          <div className="col-md-4">
            <label className="form-label">{t("user.nameEn")}</label>
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
          <div className="col-md-4">
            <label className="form-label">{t("user.nameAr")}</label>
            <input
              id="Name"
              name="Name"
              type="text"
              // className="form-control"
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
          <div className="col-md-4">
            <label className="form-label">{t("user.isAdmin")}</label>
            <input
              id="IsAdmin"
              name="IsAdmin"
              type="checkbox"
              className="form-control"
              checked={formik.values.IsAdmin}
              //value={formik.values.IsAdmin ? 1 : 0}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>
        {/* </Accordion.Body> */}
        <div className="accordion-footer">
          <div className="col-md-12 d-flex justify-content-end">
            <button type="submit" className="btn btn-orange">
              {t("user.registerUser")}
            </button>
            <button
              type="button"
              className="btn btn-orange"
              onClick={formik.handleReset}
            >
              {t("user.reset")}
            </button>
          </div>
        </div>
        {/* </Accordion.Item>
        </Accordion> */}
      </form>
    </>
  );
  //#endregion
};
