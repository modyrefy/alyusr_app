import { ReactNode } from "react";

export interface IRouteBase {
    key: string,
    //title: string,
    path: string,
    //isAuthenticationRequired: boolean
    content: ReactNode,
    jsxContent?: JSX.Element,
    //componentName?: string
}

export interface IDynamicRouteBase {
    key: string,
    title: string,
    path: string,
    isAuthenticationRequired: boolean
    jsxContent: ReactNode | null,
    componentName?: string
}