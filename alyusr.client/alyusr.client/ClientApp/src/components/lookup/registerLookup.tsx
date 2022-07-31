import { FC, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { ValidationError } from "../../models/validation/error";
import { isArabicCurrentLanguage } from "../../utils";
import { Button } from "react-bootstrap";
import { saveLookup } from "../../serviceBroker/alYusrApiServiceBroker";
import { LoadingBox } from "../box/loadingBox";
import { MessageBox } from "../box/messageBox";
import { useSearchParams } from "react-router-dom";
import { LookupModel } from "../../models/lookup/lookups";

export const RegisterLookup: FC<{
  request?: LookupModel | null;
  onComplete: any | null;
}> = ({ request, onComplete }) => {
  //#region varaibles

  const cssPrefix: string = isArabicCurrentLanguage() ? "_ar" : "_en";
  const initialValues: LookupModel = request ?? {
    Name: "",
    Type_ID: 0,
    NameEn: "",
    IsDefault: false,
    Active: true,
    ID: 0,
    Value: 0,
    CreatedBy: 0,
    ModifiedBy: 0,
    rowState: 0,
  };
  //#endregion
  //#region state
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
  const [validationSchema, setValidationSchema] = useState(
    Yup.object({
      Name: Yup.string().required(t("lookup.register.nameAr.missing")),
      NameEn: Yup.string().required(t("lookup.register.nameEn.missing")),
      //IsDefault: Yup.boolean(),
    })
  );
  const typeId = Number(searchParams.get("typeId"));
  const [showValueControl, setShowValueControl] = useState(() => {
    switch (typeId) {
      case 1:
        return true;
      case 2:
        return true;
      default:
        return false;
    }
  });
  //#endregion
  //#region function
  const handleSubmit = async (request: LookupModel) => {
    try {
      setLoading(true);
      request.Type_ID = typeId; // Number(searchParams.get("typeId"));
      const res = await saveLookup(request);
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
  const validate = (values: LookupModel): any => {
    // @ts-ignore
    const errors: any = {};

    switch (typeId) {
      case 1:
      case 2:
        if (
          values.Value === null ||
          values.Value === undefined ||
          values.Value === 0
        ) {
          errors.Value = t("lookup.register.value.missing");
        }
        break;
    }
    return errors;
  };
  //#endregion
  //#region formik
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    validate,
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
  console.log("values", typeId);
  return (
    <>
      {loading && <LoadingBox />}
      {<MessageBox errors={validationErrors} />}
      <form onSubmit={formik.handleSubmit}>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">{t("lookup.nameAr")}</label>
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
            <label className="form-label">{t("lookup.nameEn")}</label>
          </div>
          <div className="col-md-4">
            <input
              id="NameEn"
              name="NameEn"
              type="text"
              value={formik.values.NameEn}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.errors.NameEn
                  ? `text-input error${cssPrefix}`
                  : formik.values.NameEn
                  ? `text-input success${cssPrefix}`
                  : `text-input error${cssPrefix}`
              }
            />
            {formik.errors.NameEn ? <>{formik.errors.NameEn}</> : null}
            {formik.errors.Value ? <>{formik.errors.Value}</> : null}
          </div>
        </div>
        {showValueControl && (
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">{t("lookup.Value")}</label>
            </div>
            <div className="col-md-4">
              <input
                id="Value"
                name="Value"
                type="number"
                // @ts-ignore
                value={formik.values.Value}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.errors.Value
                    ? `text-input error${cssPrefix}`
                    : formik.values.Value
                    ? `text-input success${cssPrefix}`
                    : `text-input error${cssPrefix}`
                }
              />
              {formik.errors.Value ? <>{formik.errors.Value}</> : null}
            </div>
          </div>
        )}
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">{t("lookup.isDefault")}</label>
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
