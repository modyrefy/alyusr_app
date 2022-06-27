import { FC } from "react";
import Accordion from "react-bootstrap/esm/Accordion";
import { useTranslation } from "react-i18next";
import { UserRegisterationResponse } from "../../models/user/userRegisterationResponse";
export const UsersList: FC<{
  request: UserRegisterationResponse[];
  onSelect?: any | null;
}> = ({ request, onSelect }) => {
  //#region state
  const { t } = useTranslation();
  //#endregion
  //#region funcation
  //#endregion
  //#region html
  return (
    <>
      {request != null && request.length !== 0 && (
        <Accordion defaultActiveKey="0" flush className="insp-accordiona-panel">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <></>
            </Accordion.Header>
            <Accordion.Body>
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
                      <tr key={`user-${index}`}>
                        <td>{index + 1}</td>
                        <td>
                          <label>{row.User_Name}</label>
                        </td>
                        <td>
                          <label>{row.User_Name}</label>
                        </td>
                        <td>
                          <label>
                            <button
                              type="button"
                              onClick={() => {
                                onSelect(row.ID);
                                //console.log("user-id", row.ID);
                              }}
                            >
                              update
                            </button>
                          </label>
                        </td>
                        <td>
                          <label>detele</label>
                        </td>
                        <td>
                          <label>premission</label>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
    </>
  );
  //#endregion
};
