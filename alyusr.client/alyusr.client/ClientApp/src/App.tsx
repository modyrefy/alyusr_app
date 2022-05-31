import React from "react";
import { BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";

import { RoutesComponent } from "./routes/route/RoutesComponent";
import { IThemeState } from "./models/languages/iLanguageTypes";
import "./App.css";
function App() {
  // @ts-ignore
  const theme: IThemeState = useSelector((state: any) => state.theme);
  return (
    //
    <div dir={theme.isRtl ? "rtl" : "ltr"}>
      <BrowserRouter>
        <RoutesComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
