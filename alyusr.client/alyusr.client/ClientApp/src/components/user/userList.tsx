import { FC } from "react";
import { useTranslation } from "react-i18next";
import { UserRegisterationResponse } from "../../models/user/userRegisterationResponse";
export const UsersList: FC<{ request: UserRegisterationResponse[] }> = ({
  request,
}) => {
  //#region state
  const { t } = useTranslation();
  //#endregion
  //#region html
  return (
    <>
      {request != null && request.length !== 0 && (
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th className="width-50">#</th>
              <th>{t("user.userName")}</th>
              <th>{t("user.isAdmin")}</th>
            </tr>
          </thead>
          <tbody>
            {request.map((row, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <label>{row.User_Name}</label>
                  </td>
                  <td>
                    <label>{row.User_Name}</label>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
  //#endregion
};
