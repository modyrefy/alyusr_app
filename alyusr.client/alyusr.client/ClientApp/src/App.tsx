import React from 'react';
import { useTranslation } from "react-i18next";
import { BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import './App.css';
import { RoutesComponent } from './routes/route/RoutesComponent';

function App() {
    const { t } = useTranslation();
    // @ts-ignore
    const theme: IThemeState = useSelector((state: IThemeState) => ({ ...state.theme }));
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
