import { MasterLayout } from "../../components/layout/masterLayout/masterLayout";
import { IRouteBase } from "../../models/routes/iRouteBase";
import { DashboardPage, ForbiddenPage, HomePage } from "../../pages";
import { AuthenticatedRoute } from "../route/AuthenticatedRoute";

export const DefaultRouteItems: IRouteBase[] = [
  {
    key: "homePage",
    path: "/",
    content: (
      <MasterLayout>
        <HomePage />
      </MasterLayout>
    ),
  },
  {
    key: "forbiddenPage",
    path: "/forbiddenPage",
    content: (
      <MasterLayout>
        <ForbiddenPage />
      </MasterLayout>
    ),
  },
  {
    key: "dashboardPage",
    path: "/dashboardPage",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <DashboardPage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
];
