import { FC } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { DefaultRouteItems } from "../routeData/defaultRoutes";

type ContainerProps = {
  children: React.ReactNode; // 👈️ type children
};

const Container = (props: ContainerProps) => {
  return <>{props.children}</>;
};
export const RoutesComponent: FC<{}> = () => {
  return (
    <>
      <Routes>
        {DefaultRouteItems.map((item) => (
          <Route
            key={item.key}
            element={<Container>{item.content} </Container>}
            path={item.path}
          />
        ))}
        <Route path="/404" element={<div>Page Not Found</div>} />
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </>
  );
};
