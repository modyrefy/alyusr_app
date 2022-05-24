import { FC } from "react";
import { DefaultLayout } from "../layouts/defaultLayout/defaultLayout";
export const MasterLayout: FC<{}> = (props:any) => {
    const generateLayout = (): any => {
        // if (iLayoutConfiguration === null || iLayoutConfiguration === undefined) {
        //     iLayoutConfiguration = {layoutEnum: LayoutEnum.PublicLayout}
        //     const layoutFromStorage = LocalStorageGet(AppConfiguration.Setting().defaultLayoutStorageKey);
        //     iLayoutConfiguration.layoutEnum = layoutFromStorage !== null && layoutFromStorage !== undefined ? Number(layoutFromStorage) : iLayoutConfiguration.layoutEnum;
        // }
        // switch (iLayoutConfiguration.layoutEnum) {
        //     case enums.LayoutEnum.None:
        //     case enums.LayoutEnum.PublicLayout:
        //         return <PublicLayout> {props}</PublicLayout>
        //         break;
        //     case enums.LayoutEnum.AdminLayout:
        //         return <AdminLayout> {props}</AdminLayout>
        //         break;
        //     default:
        //         return <Layout1> {props}</Layout1>
        //         break
        //
        // }
        return <DefaultLayout> {props.children}</DefaultLayout>
    }
    return (<>
        {generateLayout()}
    </>)
}