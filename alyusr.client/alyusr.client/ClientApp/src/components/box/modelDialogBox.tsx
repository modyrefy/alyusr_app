import { FC, ReactNode } from "react";
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { isArabicCurrentLanguage } from "../../utils";

export const ModelDialogBox: FC<{
  isModelVisible: boolean;
  isCloseButtonVisible?: boolean;
  title?: string;
  onCloseEvent?: any;
  children?: ReactNode | undefined;
}> = ({
  isModelVisible = false,
  isCloseButtonVisible = true,
  title,
  onCloseEvent,
  children,
}) => {
  //#region state
  const { t } = useTranslation();
  //#endregion
  //#region varaible
  const isHiddenEnabled: boolean =
    onCloseEvent !== null && onCloseEvent !== undefined ? true : false;
  const isArabic: boolean = isArabicCurrentLanguage();
  const direction: string = isArabic ? "rtl" : "ltr";
  //#endregion
  return (
    <>
      <Modal
        show={isModelVisible}
        onHide={() => {
          isHiddenEnabled && onCloseEvent();
        }}
      >
        <Modal.Header dir={direction}>
          {title && <Modal.Title>{title}</Modal.Title>}
        </Modal.Header>
        <Modal.Body dir={direction}>{children}</Modal.Body>
        {isCloseButtonVisible && (
          <Modal.Footer dir={direction}>
            <Button variant="primary" onClick={() => onCloseEvent()}>
              {t("CloseButton")}
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};
