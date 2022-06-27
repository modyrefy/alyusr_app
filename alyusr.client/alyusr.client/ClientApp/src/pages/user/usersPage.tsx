import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LoadingBox } from "../../components/box/loadingBox";
import { MessageBox } from "../../components/box/messageBox";
import { ToastBox } from "../../components/box/toastBox";
import { RegisterUser, UsersList } from "../../components/user";
import { ToastModel } from "../../models/common/toastModel";
import { UserRegisterationResponse } from "../../models/user/userRegisterationResponse";
import { ValidationError } from "../../models/validation/error";
import {
  getUserInformation,
  getUsers,
  registerUser,
} from "../../serviceBroker/alYusrApiServiceBroker";
export const UsersPage: FC<{}> = () => {
  //#region state
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
  const [users, setUsers] = useState<UserRegisterationResponse[]>([]);
  const [user, setUser] = useState<UserRegisterationResponse | null>(null);
  const [toastModel, setToastModel] = useState<ToastModel>({
    show: false,
    variant: "Primary",
  });
  //#endregion
  //#region useEffect
  useEffect(() => {
    const fillData = async () => {
      await getAllUsers();
    };
    fillData();
  }, []);
  //#endregion
  //#region function
  const getUser = async (id: number) => {
    console.log(id);
    setUser(await getUserInformation(id));
  };
  const getAllUsers = async () => {
    setLoading(true);
    const userList = await getUsers();
    setUsers(userList);
    setLoading(false);
  };
  const handleSubmitUser = async (request: UserRegisterationResponse) => {
    try {
      //setToastModel({ show: false });
      setLoading(true);
      const res = await registerUser(request);
      setValidationErrors(
        res != null && res.Errors != null && res.Errors.length !== 0
          ? res.Errors
          : []
      );
      setToastModel({
        body:
          res != null && res.Errors != null && res.Errors.length !== 0
            ? t("process.failed")
            : t("process.Completed"),
        variant:
          res != null && res.Errors != null && res.Errors.length !== 0
            ? "Danger"
            : "Primary",
        delayDuration: 3000,
        show: true,
      });
      setLoading(false);
      await getAllUsers();
    } catch (err: any) {
      setLoading(false);
      setValidationErrors(err);
      window.scrollTo(0, 0);
    }
  };
  //#endregion
  //#region html
  return (
    <>
      {loading && <LoadingBox />}
      {<MessageBox errors={validationErrors} />}
      {toastModel.show && <ToastBox request={toastModel} />}
      <RegisterUser onSubmit={handleSubmitUser} userRequestObject={user} />
      {users && users.length !== 0 && (
        <UsersList
          request={users}
          onSelect={(o: number) => {
            getUser(o);
          }}
        />
      )}
    </>
  );
  //#endregion
};
