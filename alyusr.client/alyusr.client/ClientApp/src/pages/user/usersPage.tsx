import { FC, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { LoadingBox } from "../../components/box/loadingBox";
import { MessageBox } from "../../components/box/messageBox";
import { ModelDialogBox } from "../../components/box/modelDialogBox";
import { ToastBox } from "../../components/box/toastBox";
import { RegisterUser, UsersList } from "../../components/user";
import { ToastModel } from "../../models/common/toastModel";
import { ActionTypeEnum } from "../../models/enums/enumList";
import {
  RequestAction,
  UserRegisterationResponse,
} from "../../models/user/userRegisterationResponse";
import { ValidationError } from "../../models/validation/error";
import {
  getUserInformation,
  getUsers,
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
  const [showAddUserModel, setShowAddUserModel] = useState(false);
  const [showModifyUserModel, setShowModifyUserModel] = useState(false);
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
  const getUserDetails = async (request: RequestAction) => {
    var user = await getUserInformation(request.id);

    switch (request.action) {
      case ActionTypeEnum.Update:
        // @ts-ignore
        user.Password = "";
        // @ts-ignore
        user.rowState = 2;
        setUser(user);
        setShowModifyUserModel(true);
        break;
      case ActionTypeEnum.Delete:
        break;
      case ActionTypeEnum.GrantPremissions:
        break;
    }
  };
  const getAllUsers = async () => {
    setLoading(true);
    const userList = await getUsers();
    setUsers(userList);
    setLoading(false);
  };
  const handleAddUserComplete = async (status: boolean) => {
    setShowAddUserModel(false);
    switch (status) {
      case true:
        setLoading(true);
        await getAllUsers();
        let toastObjectToastModel = toastModel;
        toastObjectToastModel.show = true;
        toastObjectToastModel.body = "process completed successfully";
        setLoading(false);
        setToastModel(toastObjectToastModel);
        break;
      default:
        break;
    }
  };
  const handleModifyUserComplete = async (status: boolean) => {
    setShowModifyUserModel(false);
    switch (status) {
      case true:
        setLoading(true);
        await getAllUsers();
        let toastObjectToastModel = toastModel;
        toastObjectToastModel.show = true;
        toastObjectToastModel.body = "process completed successfully";
        setLoading(false);
        setToastModel(toastObjectToastModel);
        break;
      default:
        break;
    }
  };
  //#endregion
  //#region html
  return (
    <>
      {loading && <LoadingBox />}
      {<MessageBox errors={validationErrors} />}
      {toastModel.show && <ToastBox request={toastModel} />}
      {/* register user  */}
      <ModelDialogBox
        isModelVisible={showAddUserModel}
        isCloseButtonVisible={false}
        isHiddenEnabled={false}
        onClose={() => {
          setShowAddUserModel(false);
        }}
      >
        <RegisterUser onComplete={handleAddUserComplete} />
      </ModelDialogBox>
      <Button
        onClick={() => {
          setShowAddUserModel(true);
        }}
      >
        {t("user.Add")}
      </Button>
      {/* modify user  */}
      <ModelDialogBox
        isModelVisible={showModifyUserModel}
        isCloseButtonVisible={false}
        isHiddenEnabled={true}
        onClose={() => {
          setShowModifyUserModel(false);
        }}
      >
        <RegisterUser
          request={user}
          onComplete={handleModifyUserComplete}
          options={{ isUserNameModifiable: false }}
        />
      </ModelDialogBox>

      {/* user list */}
      {users && users.length !== 0 && (
        <UsersList
          request={users}
          onEventRaise={(o: RequestAction) => {
            getUserDetails(o);
          }}
        />
      )}
    </>
  );
  //#endregion
};
