import { FC, ReactNode } from "react";
import { Button, Modal } from "react-bootstrap";
import { ActionButtons } from "../../models/dialog/dialogModel";
import { isArabicCurrentLanguage } from "../../utils";

export const ConfirmModelDialogBox: FC<{
  isModelVisible: boolean;
  title?: string;
  onCloseEvent?: any;
  actions: ActionButtons[];
  children?: ReactNode | undefined;
}> = ({ isModelVisible, title, onCloseEvent, actions, children }) => {
  //#region state
  //#endregion
  //#region varaible
  const isArabic: boolean = isArabicCurrentLanguage();
  const direction: string = isArabic ? "rtl" : "ltr";
  const isHiddenEnabled: boolean =
    onCloseEvent !== null && onCloseEvent !== undefined ? true : false;
  //#endregion
  //#region function
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
        <Modal.Footer dir={direction}>
          {actions.map((row, index) => {
            return (
              <Button
                id={`button_action_` + index}
                variant={
                  row.variant === null
                    ? "outline-primary"
                    : `outline-${row.variant}`
                }
                onClick={() => {
                  row.onClick();
                }}
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
