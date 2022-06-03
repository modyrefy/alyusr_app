import { MasterLayout } from "../../components/layout/masterLayout/masterLayout";
import { IRouteBase } from "../../models/routes/iRouteBase";
import { DashboardPage, ForbiddenPage, HomePage, UsersPage } from "../../pages";
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
    path: "/forbidden",
    content: (
      <MasterLayout>
        <ForbiddenPage />
      </MasterLayout>
    ),
  },
  {
    key: "dashboardPage",
    path: "/dashboard",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <DashboardPage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    key: "usersPage",
    path: "/users",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <UsersPage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
];
