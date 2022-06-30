import { FC, ReactNode } from "react";
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { isArabicCurrentLanguage } from "../../utils";

export const ModelDialogBox: FC<{
  isModelVisible: boolean;
  isCloseButtonVisible?: boolean;
  isHiddenEnabled?: boolean;
  title?: string;
  onClose?: any;
  children?: ReactNode | undefined;
}> = ({
  isModelVisible = false,
  isCloseButtonVisible = true,
  isHiddenEnabled = true,
  title,
  onClose,
  children,
}) => {
  //#region state
  const { t } = useTranslation();
  //#endregion
  //#region varaible
  const isArabic: boolean = isArabicCurrentLanguage();
  const direction: string = isArabic ? "rtl" : "ltr";
  //#endregion
  //#region function
  const handleClose = () => {
    onClose();
  };
  //#endregion
  return (
    <>
      <Modal
        show={isModelVisible}
        onHide={() => {
          isHiddenEnabled && handleClose();
        }}
      >
        <Modal.Header dir={direction}>
          {title && <Modal.Title>{title}</Modal.Title>}
        </Modal.Header>
        <Modal.Body dir={direction}>{children}</Modal.Body>
        {isCloseButtonVisible && (
          <Modal.Footer dir={direction}>
            <Button variant="primary" onClick={() => handleClose()}>
              {t("CloseButton")}
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};
