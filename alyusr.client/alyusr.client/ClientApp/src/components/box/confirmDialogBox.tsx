import { FC, ReactNode } from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ActionButtons } from "../../models/dialog/dialogModel";
import { isArabicCurrentLanguage } from "../../utils";

export const ConfirmModelDialogBox: FC<{
  isModelVisible: boolean;
  title?: string;
  actions: ActionButtons[];
  children?: ReactNode | undefined;
}> = ({ isModelVisible, title, actions, children }) => {
  //#region state
  const { t } = useTranslation();
  //#endregion
  //#region varaible
  const isArabic: boolean = isArabicCurrentLanguage();
  const direction: string = isArabic ? "rtl" : "ltr";
  //#endregion
  return (
    <>
      <Modal show={isModelVisible}>
        <Modal.Header dir={direction}>
          {title && <Modal.Title>{title}</Modal.Title>}
        </Modal.Header>
        <Modal.Body dir={direction}>{children}</Modal.Body>
        <Modal.Footer dir={direction}>
          {actions.map((row, index) => {
            return (
              <Button
                id={`button_action_` + index}
                variant={row.variant === null ? "primary" : row.variant}
                onClick={row.onClick}
              >
                {row.text}
              </Button>
            );
          })}
        </Modal.Footer>
      </Modal>
    </>
  );
};
