import { FC, useState } from "react";
import { Col, Row, Toast } from "react-bootstrap";

export const ToastBoxV2: FC<{
  isShown: boolean;
  header?: string | null;
  body?: string | null;
  variant?: string | null;
  delayDuration?: number | null;
  onCloseEvent?: any;
}> = ({
  isShown = false,
  header,
  body,
  variant = "Primary",
  delayDuration = 3000,
  onCloseEvent,
}) => {
  const _variant: string =
    variant === null || variant === undefined ? "Primary" : variant;
  const _delayDuration: number =
    delayDuration === null || delayDuration === undefined
      ? 3000
      : delayDuration;
  const [isShow, setIsShow] = useState(isShown);
  return (
    <Row>
      <Col xs={6}>
        <Toast
          onClose={() => {
            setIsShow(false);
            onCloseEvent();
          }}
          show={isShow}
          delay={_delayDuration}
          autohide={_delayDuration !== 0 ? true : false}
          bg={_variant.toLowerCase()}
        >
          {header && (
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto"></strong>
              <small>{header}</small>
            </Toast.Header>
          )}
          {body && <Toast.Body>{body}</Toast.Body>}
        </Toast>
      </Col>
    </Row>
  );
};
