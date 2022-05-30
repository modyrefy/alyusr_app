import React, { FC } from "react";
import { Spinner } from "react-bootstrap";

export const LoadingBox: FC<{}> = () => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "0",
          width: "100vw",
          height: "100vh",
          zIndex: "999",
          backgroundColor: "rgb(0,0,0,0.2)",
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <div
            style={{
              display: "block",
              position: "fixed",
              top: "calc(50% - (58px / 2))",
              right: "calc(50% - (58px / 2))",
            }}
            role="status"
          >
            <Spinner animation="border" variant="primary" />
            <Spinner animation="border" variant="primary" />
            <Spinner animation="border" variant="primary" />
            <Spinner animation="border" variant="primary" />
            <Spinner animation="border" variant="primary" />
            <Spinner animation="border" variant="primary" />
          </div>
        </div>
      </div>
      <div className="text-center py-5" id="backdrop"></div>
    </>
  );
};
