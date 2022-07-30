import { FC, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { UnitModel } from "../../models/unit/unit";
import { ValidationError } from "../../models/validation/error";
import { isArabicCurrentLanguage } from "../../utils";
import { Button } from "react-bootstrap";
import { saveUnit } from "../../serviceBroker/alYusrApiServiceBroker";
import { LoadingBox } from "../box/loadingBox";
import { MessageBox } from "../box/messageBox";

export const RegisterUnit: FC<{
  request?: UnitModel | null;
  onComplete: any | null;
}> = ({ request, onComplete }) => {
  //#region varaibles
  const cssPrefix: string = isArabicCurrentLanguage() ? "_ar" : "_en";
  const initialValues: UnitModel = request ?? {
    Name_En: "",
    Name: "",
    IsDefault: false,
    ID: 0,
    CreatedBy: 0,
    ModifiedBy: 0,
    Errors: [],
    rowState: 1,
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
      Name: Yup.string().required(t("unit.register.nameAr.missing")),
      Name_En: Yup.string().required(t("unit.register.nameEn.missing")),
      //IsDefault: Yup.boolean(),
    })
  );
  //#endregion
  //#region function
  const handleSubmit = async (request: UnitModel) => {
    try {
      setLoading(true);
      const res = await saveUnit(request);
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
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">{t("unit.nameAr")}</label>
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
            <label className="form-label">{t("unit.nameEn")}</label>
          </div>
          <div className="col-md-4">
            <input
              id="Name_En"
              name="Name_En"
              type="text"
              value={formik.values.Name_En}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.errors.Name_En
                  ? `text-input error${cssPrefix}`
                  : formik.values.Name_En
                  ? `text-input success${cssPrefix}`
                  : `text-input error${cssPrefix}`
              }
            />
            {formik.errors.Name_En ? <>{formik.errors.Name_En}</> : null}
          </div>
        </div>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">{t("unit.isDefault")}</label>
          </div>
          <div className="col-md-4">
            <input
              id="IsDefault"
              name="IsDefault"
              type="checkbox"
              checked={formik.values.IsDefault}
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
              {t("entity.register")}
            </Button>
            <Button
              variant="outline-primary"
              type="button"
              className="btn btn-orange"
              onClick={formik.handleReset}
            >
              {t("entity.reset")}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
  //#endregion
};
