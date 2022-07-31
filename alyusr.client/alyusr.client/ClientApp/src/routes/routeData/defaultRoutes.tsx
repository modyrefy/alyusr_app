import { MasterLayout } from "../../components/layout/masterLayout/masterLayout";
import { IRouteBase } from "../../models/routes/iRouteBase";
import {
  DashboardPage,
  ForbiddenPage,
  HomePage,
  LookupPage,
  UnitPage,
  UsersPage,
} from "../../pages";
import { CompanySettingPage } from "../../pages/setting/companySettingPage";
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
  {
    key: "companySettingPage",
    path: "/company/setting",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <CompanySettingPage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    key: "unitsPage",
    path: "/units",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <UnitPage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    key: "lookupPage",
    path: "/lookup",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <LookupPage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
];
