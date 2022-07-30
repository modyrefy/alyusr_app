import { FC } from "react";
import { useTranslation } from "react-i18next";
import { UnitModel } from "../../models/unit/unit";
import { isArabicCurrentLanguage } from "../../utils";
import _ from "lodash";
import { Button } from "react-bootstrap";
import { ActionTypeEnum } from "../../models/enums/enumList";
export const UnitList: FC<{
  request: UnitModel[];
  onActionEvent?: any | null;
  onCompleteEvent?: any | null;
}> = ({ request, onActionEvent, onCompleteEvent }) => {
  //#region varaible
  const isArabic: boolean = isArabicCurrentLanguage();
  //#endregion
  //#region state(request);
  const { t } = useTranslation();
  //#endregion
  //#region html
  return (
    <>
      {request != null && request.length !== 0 && (
        <table className="table-bordered" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th className="width-50">#</th>
              <th>{t("unit.name")}</th>
              <th>{t("unit.isDefault")}</th>
            </tr>
          </thead>
          <tbody>
            {request.map((row, index) => {
              return (
                <tr key={`user-${index}`}>
                  <td>{index + 1}</td>
                  <td>
                    <label>{isArabic ? row.Name : row.Name_En}</label>
                  </td>
                  <td>
                    <input type="checkbox" checked={row.IsDefault}></input>
                  </td>
                  <td>
                    <Button
                      type="button"
                      variant="outline-primary"
                      onClick={() => {
                        onActionEvent({
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
                      variant="outline-primary"
                      onClick={() => {
                        //onSelect({ id: row.ID, type: "update" });
                        onActionEvent({
                          id: row.ID,
                          action: ActionTypeEnum.Delete,
                        });
                      }}
                    >
                      {t("user.Delete")}
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
