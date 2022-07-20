import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import Dropzone, { Accept, FileRejection, useDropzone } from "react-dropzone";
import { LoadingBox } from "../box/loadingBox";
import { MessageBox } from "../box/messageBox";
import { ValidationError } from "../../models/validation/error";
import { CompanySetting } from "../../models/company/companySetting";
import { isArabicCurrentLanguage } from "../../utils";
import { render } from "@testing-library/react";
import { SaveCompanySetting } from "../../serviceBroker/alYusrApiServiceBroker";
import { Button } from "react-bootstrap";
export const CompanySettingDetails: FC<{ request?: CompanySetting | null }> = ({
  request,
}) => {
  //#region varaibles
  const allowedMimeTypes: string[] = ["image/png", "image/jpg", "image/jpeg"];
  const accesptTypes: Accept = { allowedMimeTypes };

  const cssPrefix: string = isArabicCurrentLanguage() ? "_ar" : "_en";
  const initialValues: CompanySetting = request ?? {
    FormatDecimal: "",
    DefaultCurrency_ID: 0,
    Currency_ID: 0,
    CurrencyShortCut: "",
    IsTrialVersion: false,
    SoftwareName: undefined,
    Advert: undefined,
    PrintItemPrescriptionOfTransaction: false,
    BacckGroundImage: "",
    LogoImage: "",
    BackColor: 0,
    BackGroundImageName: "",
    LogoImageName: "",
    Phone: "",
    Mail: "",
    Password: "",
    DateType: false,
    TextLogo: "",
    ValueOfPoint: 0,
    SendMailOfSalesOnClose: false,
    RecivedMail: "",
    Header: undefined,
    DecimalPlace: 0,
    PathBackUp: "",
    UserNameSMS: "",
    PasswordSMS: "",
    MobileReceiver: "",
    SendSMS: false,
    SenderName: "",
    SetScaleOnPrice: false,
    SetScaleWeightonKG: false,
    UseOldModelForSearch: false,
    DefaultTaxPercentage: 0,
    ApplyTax: false,
    TaxNumber: "",
    HideItemFromCloseDay: false,
    MaxQuantity: 0,
    TransferTaxToDiscount: false,
    ShowItemPriceWithoutTax: false,
    PrintItemArabicEngInBill: false,
    Company_Address: "",
    CalcDiscountWithVAT: false,
    SetCostPriceZeroOnSalePriceZero: false,
    Is_Company_Authorized_Tobacco: false,
    WaterMarkImage: "",
    ServiceUI: "",
    IsUploadTransactionToCloud: false,
    Printer_Tablet_List: "",
    SystemSettings: "",
    IncludeVatOnEditPrice: false,
    DaysOfDeleteBackupFiles: 0,
    IsCodeTransactionSeparated: false,
    CompanyAddress: "",
    IsSentEmailReportAfterCloseDayOnly: false,
    CompanySetting_UniqueId: "",
    TermsAndCondations: "",
    IsFloorSecondeCurrency: false,
    CheckBalanceOfItemOnAdd: false,
    LogoImage64: "",
    ValueOfCurrency: 0,
    FormatDate: "",
    ArabicLanguage: "",
    EnglishLanguage: "",
    voucherSettings: undefined,
    AttachmentFolder: undefined,
    IsUploadShipmentTrackToCloud: false,
    Token: undefined,
    IsEnableToUploadEinvoice: false,
    ID: 0,
    CreatedBy: undefined,
    ModifiedBy: undefined,
    Name: "",
    CreationDate: "",
    ModificationDate: "",
    VerifyOnUpdate: false,
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
      Name: Yup.string().required(t("setting.companyName.missing")),
    })
  );
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone();
  //#endregion
  //#region function
  const handleFileDrop = async (type: number, files: File[]) => {
    setLoading(true);
    try {
      if (files != null && files.length !== 0) {
        files.map((file) => {
          // acceptedFiles.push(file);
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            switch (type) {
              case 1:
                // @ts-ignore
                const _logoImage: string = reader.result || "";
                // @ts-ignore
                setLogoImage(
                  _logoImage.replace(/^data:image\/[a-z]+;base64,/, "")
                );
                break;
            }
          };
          reader.onabort = () => console.log("file reading was aborted");
          reader.onerror = () => console.log("file reading has failed");
          setLoading(false);
        });
      }
    } catch (err) {
      alert(err);
      setLoading(false);
    } finally {
    }
  };
  const handleFileReject = (files: FileRejection[]) => {
    files.map(async (file) => {
      alert(
        `${file.file.name} ${file.errors[0].code}  ${file.errors[0].message}`
      );
    });
    //console.log("handleFileReject", JSON.stringify(files[0]));
    //  alert("handleFileReject");
  };
  const handleSubmit = async (data: CompanySetting) => {
    try {
      setLoading(true);
      // @ts-ignore
      data.rowState = 2;
      data.LogoImageName = "";
      if (logoImage != null) {
        console.log("image_assign_1");
        data.LogoImage = logoImage;
      } else {
        console.log("image_assign_0");
      }
      const res = await SaveCompanySetting(data);
      if (res != null && res.Errors != null && res.Errors.length !== 0) {
        setValidationErrors(res.Errors);
        setLoading(false);
      } else {
        setValidationErrors([]);
        setLoading(false);
        //onComplete(true);
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
    // enableReinitialize: true,
    onReset: (values) => {
      console.log("reset");
      //onComplete(false);
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log("compsnysetting", values);
      await handleSubmit(values);
      // resetForm();
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
          <div className="col-md-2">
            <label className="form-label">{t("setting.CompanyName")}</label>
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

          <div className="col-md-2">
            <label className="form-label">{t("setting.Phone")}</label>
          </div>
          <div className="col-md-4">
            <input
              id="Phone"
              name="Phone"
              type="text"
              value={formik.values.Phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.errors.Phone
                  ? `text-input error${cssPrefix}`
                  : formik.values.Phone
                  ? `text-input success${cssPrefix}`
                  : `text-input error${cssPrefix}`
              }
            />
            {formik.errors.Phone ? <>{formik.errors.Phone}</> : null}
          </div>
        </div>
        <div className="row g-3">
          <div className="col-md-2">
            <label className="form-label">{t("setting.TextLogo")}</label>
          </div>
          <div className="col-md-10">
            <input
              id="TextLogo"
              name="TextLogo"
              type="text"
              value={formik.values.TextLogo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.errors.TextLogo
                  ? `col-md-10 error${cssPrefix}`
                  : formik.values.TextLogo
                  ? `col-md-10 success${cssPrefix}`
                  : `col-md-10 error${cssPrefix}`
              }
            />
            {formik.errors.TextLogo ? <>{formik.errors.TextLogo}</> : null}
          </div>
        </div>

        <div className="row g-3">
          <div className="col-md-2">
            <label className="form-label">{t("setting.LogoImage64")}</label>
          </div>
          <div className="col-md-8">
            {formik.values.LogoImage64 && (
              <img
                alt=""
                src={`data:image/jpeg;base64,${formik.values.LogoImage64}`}
              />
            )}
          </div>
          <div className="col-md-2">
            <Dropzone
              key={`dropZone-LogoImage64`}
              accept={accesptTypes}
              maxFiles={1}
              onDrop={(files: File[]) => {
                handleFileDrop(1, files).then((r) => {});
              }}
              onDropRejected={handleFileReject}
            >
              {({ getRootProps, getInputProps, acceptedFiles }) => {
                return (
                  <div className="container">
                    <div {...getRootProps({ className: "dropzone" })}>
                      <input {...getInputProps()} />
                      <p>Drag 'n' drop some files here</p>
                    </div>
                    <aside>
                      <h4>Files</h4>
                      <ul>
                        {acceptedFiles.map((file, index) => (
                          <li key={`file_${index}`}>
                            {file.name} - {file.size} bytes
                          </li>
                        ))}
                      </ul>
                    </aside>
                  </div>
                );
              }}
            </Dropzone>
          </div>
        </div>

        <div className="accordion-footer">
          <div className="col-md-12 d-flex justify-content-end">
            <Button
              type="submit"
              className="btn btn-orange"
              variant="outline-primary"
            >
              {t("setting.Save")}
            </Button>
            <Button
              variant="outline-primary"
              type="button"
              className="btn btn-orange"
              onClick={formik.handleReset}
            >
              {t("setting.reset")}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
  //#endregion
};
