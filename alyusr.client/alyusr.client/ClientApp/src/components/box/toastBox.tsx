import { FC, useRef, useState } from "react";
import { Col, Row, Toast } from "react-bootstrap";
import { ToastModel } from "../../models/common/toastModel";

export const ToastBox: FC<{
  request: ToastModel;
}> = ({ request }) => {
  let toastModel = useRef<ToastModel>(request);
  toastModel.current.delayDuration =
    request.delayDuration !== null && request.delayDuration !== undefined
      ? request.delayDuration
      : 3000;
  const variant: string =
    request.variant !== null && request.variant !== undefined
      ? request.variant
      : "Primary";

  const [show, setShow] = useState(toastModel.current.show);
  return (
    <Row>
      <Col xs={6}>
        <Toast
          onClose={() => {
            toastModel.current.show = false;
            //request.show = false;
            setShow(toastModel.current.show);
          }}
          show={toastModel.current.show}
          delay={toastModel.current.delayDuration}
          autohide={toastModel.current.delayDuration !== 0 ? true : false}
          bg={variant.toLowerCase()}
        >
          {toastModel.current.Header && (
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto"></strong>
              <small>{toastModel.current.Header}</small>
            </Toast.Header>
          )}
          {toastModel.current.body && (
            <Toast.Body>{toastModel.current.body}</Toast.Body>
          )}
        </Toast>
      </Col>
    </Row>
  );
};
