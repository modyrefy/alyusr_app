import { FC } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ActionTypeEnum } from "../../models/enums/enumList";
import { UserRegisterationResponse } from "../../models/user/userRegisterationResponse";
import { isArabicCurrentLanguage } from "../../utils";
export const UsersList: FC<{
  request: UserRegisterationResponse[];
  onEventRaise?: any | null;
}> = ({ request, onEventRaise }) => {
  //#region varaible
  const isArabic: boolean = isArabicCurrentLanguage();
  //#endregion
  //#region state
  const { t } = useTranslation();
  //#endregion
  //#region funcation
  //#endregion
  //#region html
  return (
    <>
      {request != null && request.length !== 0 && (
        <table className="table-bordered" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th className="width-50">#</th>
              <th>{t("user.userName")}</th>
              <th>{t("user.name")}</th>
              <th>{t("user.isAdmin")}</th>
            </tr>
          </thead>
          <tbody>
            {request.map((row, index) => {
              return (
                <tr key={`user-${index}`}>
                  <td>{index + 1}</td>
                  <td>
                    <label>{row.User_Name}</label>
                  </td>
                  <td>
                    <label>{isArabic ? row.Name : row.Name_EN}</label>
                  </td>
                  <td>
                    <input type="checkbox" checked={row.IsAdmin}></input>
                  </td>
                  <td>
                    <Button
                      type="button"
                      onClick={() => {
                        //onSelect({ id: row.ID, type: "update" });
                        onEventRaise({
                          id: row.ID,
                          action: ActionTypeEnum.Update,
                        });
                      }}
                    >
                      {t("user.Modify")}
                    </Button>
                  </td>
                  <td>
                    <Button
                      type="button"
                      onClick={() => {
                        //onSelect({ id: row.ID, type: "update" });
                        onEventRaise({
                          id: row.ID,
                          action: ActionTypeEnum.Delete,
                        });
                      }}
                    >
                      {t("user.Delete")}
                    </Button>
                  </td>
                  <td>
                    <Button
                      type="button"
                      onClick={() => {
                        //onSelect({ id: row.ID, type: "update" });
                        onEventRaise({
                          id: row.ID,
                          action: ActionTypeEnum.GrantPremissions,
                        });
                      }}
                    >
                      {t("user.Premissions")}
                    </Button>
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
