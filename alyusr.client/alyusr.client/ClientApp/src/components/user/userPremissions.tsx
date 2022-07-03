import _ from "lodash";
import { FC, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { PremissionTypeEnum } from "../../models/enums/enumList";
import { Premission } from "../../models/user/useePermissionResponse";
import { UserRegisterationResponse } from "../../models/user/userRegisterationResponse";
import {
  getUserPremission,
  SaveUserPremissions,
} from "../../serviceBroker/alYusrApiServiceBroker";
import { isArabicCurrentLanguage } from "../../utils";
import { LoadingBox } from "../box/loadingBox";

export const UserPremissions: FC<{
  userObject?: UserRegisterationResponse | null;
  onComplete?: any | null;
}> = ({ userObject, onComplete }) => {
  //#region varaible
  const isArabic: boolean = isArabicCurrentLanguage();
  //#endregion
  //#region state
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [userPremissionObject, setUserPremissionObject] = useState<
    Premission[] | null
  >(null);
  //#endregion
  //#region useEffect
  useEffect(() => {
    const fillData = async () => {
      setLoading(true);
      // @ts-ignore
      var premissions = await getPremissions(userObject.ID);
      setUserPremissionObject(premissions);
      setLoading(false);
    };
    fillData();
  }, []);
  //#endregion
  //#region function
  const getPremissions = async (id: number): Promise<Premission[]> => {
    var premissions = await getUserPremission(id);
    if (
      premissions !== null &&
      premissions !== undefined &&
      premissions.length !== 0
    ) {
      return _.sortBy(premissions, "ID");
    }
    return [];
  };
  const getPremissionRecord = (
    data: Premission[],
    id: number
  ): Premission | null => {
    const record: Premission = _.find(data, (obj) => {
      return obj.ID === id;
    }) as Premission;
    return record;
  };
  const handleHorizontalChange = (id: number, checked: boolean) => {
    const data: Premission[] = userPremissionObject as Premission[];
    const record = getPremissionRecord(data, id);
    if (record != null) {
      record.EnableDelete = checked;
      record.EnableSave = checked;
      record.EnableSearch = checked;
      record.EnableUpdate = checked;
      record.IsEnabledForTablet = checked;
      _.remove(data, (obj) => {
        return obj.ID === record.ID;
      });
      data.push(record);
      setUserPremissionObject(_.sortBy(data, "ID"));
    }
  };
  const handleVerticalChange = (checked: boolean, type: PremissionTypeEnum) => {
    const data: Premission[] = userPremissionObject as Premission[];
    _.each(data, (o) => {
      switch (type) {
        case PremissionTypeEnum.Save:
          o.EnableSave = checked;
          break;
        case PremissionTypeEnum.Update:
          o.EnableUpdate = checked;
          break;
        case PremissionTypeEnum.Delete:
          o.EnableDelete = checked;
          break;
        case PremissionTypeEnum.Search:
          o.EnableSearch = checked;
          break;
        case PremissionTypeEnum.Tablet:
          o.IsEnabledForTablet = checked;
          break;
      }
    });
    setUserPremissionObject(_.sortBy(data, "ID"));
  };
  const handleCheckBoxChange = (id: number, type: PremissionTypeEnum) => {
    const data: Premission[] = userPremissionObject as Premission[];
    const record = getPremissionRecord(data, id);
    if (record != null) {
      switch (type) {
        case PremissionTypeEnum.Save:
          record.EnableSave = !record.EnableSave;
          break;
        case PremissionTypeEnum.Update:
          record.EnableUpdate = !record.EnableUpdate;
          break;
        case PremissionTypeEnum.Delete:
          record.EnableDelete = !record.EnableDelete;
          break;
        case PremissionTypeEnum.Search:
          record.EnableSearch = !record.EnableSearch;
          break;
        case PremissionTypeEnum.Tablet:
          record.IsEnabledForTablet = !record.IsEnabledForTablet;
          break;
      }
      _.remove(data, (obj) => {
        return obj.ID === record.ID;
      });
      data.push(record);
      setUserPremissionObject(_.sortBy(data, "ID"));
    }
  };
  //#endregion
  //#region html
  return (
    <>
      {loading && <LoadingBox />}
      {userPremissionObject != null && userPremissionObject.length !== 0 && (
        <table className="table-bordered" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th className="width-50">#</th>
              <th>{t("premission.premissionName")}</th>
              <th></th>
              <th>{t("premission.EnableSave")}</th>
              <th>{t("premission.EnableUpdate")}</th>
              <th>{t("premission.EnableDelete")}</th>
              <th>{t("premission.EnableSearch")}</th>
              <th>{t("premission.IsEnabledForTablet")}</th>
            </tr>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th>
                <input
                  type="checkbox"
                  id={`vertical_save`}
                  defaultChecked={false}
                  onChange={(o) => {
                    handleVerticalChange(
                      o.target.checked,
                      PremissionTypeEnum.Save
                    );
                  }}
                ></input>
              </th>
              <th>
                <input
                  type="checkbox"
                  id={`vertical_update`}
                  defaultChecked={false}
                  onChange={(o) => {
                    handleVerticalChange(
                      o.target.checked,
                      PremissionTypeEnum.Update
                    );
                  }}
                ></input>
              </th>
              <th>
                <input
                  type="checkbox"
                  id={`vertical_delete`}
                  defaultChecked={false}
                  onChange={(o) => {
                    handleVerticalChange(
                      o.target.checked,
                      PremissionTypeEnum.Delete
                    );
                  }}
                ></input>
              </th>
              <th>
                <input
                  type="checkbox"
                  id={`vertical_search`}
                  defaultChecked={false}
                  onChange={(o) => {
                    handleVerticalChange(
                      o.target.checked,
                      PremissionTypeEnum.Search
                    );
                  }}
                ></input>
              </th>
              <th>
                <input
                  type="checkbox"
                  id={`vertical_tablet`}
                  defaultChecked={false}
                  onChange={(o) => {
                    handleVerticalChange(
                      o.target.checked,
                      PremissionTypeEnum.Tablet
                    );
                  }}
                ></input>
              </th>
            </tr>
          </thead>
          <tbody>
            {userPremissionObject.map((row, index) => {
              return (
                <tr key={`premission-${index}`}>
                  <td>{index + 1}</td>
                  <td>
                    <label>{isArabic ? row.ID : row.NameEn}</label>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      id={`horizontal_${index}`}
                      defaultChecked={false}
                      onChange={(o) => {
                        handleHorizontalChange(row.ID, o.target.checked);
                      }}
                    ></input>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      id={`EnableSave_${index}`}
                      checked={row.EnableSave}
                      onChange={() => {
                        handleCheckBoxChange(row.ID, PremissionTypeEnum.Save);
                      }}
                    ></input>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      id={`EnableUpdate${index}`}
                      checked={row.EnableUpdate}
                      onChange={() => {
                        handleCheckBoxChange(row.ID, PremissionTypeEnum.Update);
                      }}
                    ></input>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      id={`EnableDelete${index}`}
                      checked={row.EnableDelete}
                      onChange={() => {
                        handleCheckBoxChange(row.ID, PremissionTypeEnum.Delete);
                      }}
                    ></input>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      id={`EnableSearch${index}`}
                      checked={row.EnableSearch}
                      onChange={() => {
                        handleCheckBoxChange(row.ID, PremissionTypeEnum.Search);
                      }}
                    ></input>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      id={`IsEnabledForTablet${index}`}
                      checked={row.IsEnabledForTablet}
                      onChange={() => {
                        handleCheckBoxChange(row.ID, PremissionTypeEnum.Tablet);
                      }}
                    ></input>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="btn btn-orange"
                  onClick={async () => {
                    setLoading(true);
                    const data = userPremissionObject;
                    _.each(data, (o) => {
                      o.rowState = 2;
                    });
                    await SaveUserPremissions(data);
                    setLoading(false);
                    onComplete();
                  }}
                >
                  {t("button.save")}
                </Button>
              </td>
              <td>
                <Button
                  type="button"
                  variant="outline-primary"
                  className="btn btn-orange"
                  onClick={onComplete}
                >
                  {t("button.cancel")}
                </Button>
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </>
  );
  //#endregion
};
