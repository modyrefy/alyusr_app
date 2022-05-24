import { MasterLayout } from "../../components/layout/masterLayout/masterLayout";
import { IRouteBase } from "../../models/routes/iRouteBase";
import { HomePage } from "../../pages";

export const DefaultRouteItems: IRouteBase[] = [
    {
        key: "homePage",
        path: '/',
        content: (
            <MasterLayout>
            <HomePage/>
            </MasterLayout>
        )
    },
];