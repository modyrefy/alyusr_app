import React from "react";
import { FC } from "react";
import { Alert } from "react-bootstrap";
import { ValidationError } from "../../models/validation/error";
import { isArabicCurrentLanguage } from "../../utils";

export const MessageBox: FC<{
  errors?: ValidationError[];
  variant?: string | null;
}> = ({ errors, variant = "danger" }) => {
  if (errors !== null && errors !== undefined && errors?.length !== 0) {
    let isArabic: boolean = isArabicCurrentLanguage();
    return (
      <>
        <Alert key={variant} variant={variant || "danger"}>
          {errors.map((error) => (
            <>
              {isArabic ? error.MessageAr : error.MessageEn}
              <br />
            </>
          ))}
        </Alert>
      </>
    );
  }
  return null;
};
