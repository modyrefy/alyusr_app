import { FC, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ConfirmModelDialogBox } from "../../components/box/confirmDialogBox";
import { LoadingBox } from "../../components/box/loadingBox";
import { MessageBox } from "../../components/box/messageBox";
import { ModelDialogBox } from "../../components/box/modelDialogBox";
import { ToastBox } from "../../components/box/toastBox";
import {
  RegisterUser,
  UserPremissions,
  UsersList,
} from "../../components/user";
import { ToastModel } from "../../models/common/toastModel";
import { ActionButtons } from "../../models/dialog/dialogModel";
import { ActionTypeEnum } from "../../models/enums/enumList";
import {
  RequestAction,
  UserRegisterationResponse,
} from "../../models/user/userRegisterationResponse";
import { ValidationError } from "../../models/validation/error";
import {
  deleteUser,
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
  const [showDeleteUserModel, setShowDeleteUserModel] = useState(false);
  const [showUserPremissionModel, setShowUserPremissionModel] = useState(false);
  //#endregion
  //#region varaibles
  const deleteUserActions: ActionButtons[] = [
    {
      text: t("connfirmDialog.yes"),
      onClick: () => {
        handleDeleteUser();
      },
    },
    {
      text: t("connfirmDialog.no"),
      onClick: () => {
        setUser(null);
        setShowDeleteUserModel(false);
      },
    },
  ];
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
  const handleUserAction = async (request: RequestAction) => {
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
        setUser(user);
        setShowDeleteUserModel(true);
        break;
      case ActionTypeEnum.GrantPremissions:
        setUser(user);
        setShowUserPremissionModel(true);
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
  const handleDeleteUser = async () => {
    setShowDeleteUserModel(false);
    var deleteUserResponse = await deleteUser(user !== null ? user.ID : 0);
    let toastObjectToastModel = toastModel;
    toastObjectToastModel.show = true;
    if (
      deleteUserResponse.Result.Errors != null &&
      deleteUserResponse.Result.Errors.length !== 0
    ) {
      toastObjectToastModel.body = "process failed try again alter";
      toastObjectToastModel.variant = "Danger";
    } else {
      toastObjectToastModel.body = "process completed successfully";
      toastObjectToastModel.variant = "Success";
      getAllUsers();
    }
    setToastModel(toastObjectToastModel);
  };
  //#endregion
  //#region html
  return (
    <>
      {loading && <LoadingBox />}
      {<MessageBox errors={validationErrors} />}
      {toastModel.show && <ToastBox request={toastModel} />}

      {/* delete user  */}
      <ConfirmModelDialogBox
        isModelVisible={showDeleteUserModel}
        onCloseEvent={() => {
          setShowDeleteUserModel(false);
        }}
        actions={deleteUserActions}
      >
        <>Are you sure?</>
      </ConfirmModelDialogBox>
      {/* register user  */}
      <ModelDialogBox
        isModelVisible={showAddUserModel}
        isCloseButtonVisible={false}
        //onCloseEvent={() => {setShowAddUserModel(false);}}
      >
        <RegisterUser onComplete={handleAddUserComplete} />
      </ModelDialogBox>
      <Button
        variant="outline-primary"
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
      >
        <RegisterUser onComplete={handleModifyUserComplete} request={user} />
      </ModelDialogBox>

      {/* user  premission*/}
      <ModelDialogBox
        isModelVisible={showUserPremissionModel}
        isCloseButtonVisible={false}
        // onCloseEvent={() => {
        //   setShowUserPremissionModel(false);
        // }}
      >
        <UserPremissions
          userObject={user}
          onComplete={() => {
            setShowUserPremissionModel(false);
          }}
        />
      </ModelDialogBox>

      {/* user list */}
      {users && users.length !== 0 && (
        <UsersList
          request={users}
          onActionEvent={(o: RequestAction) => {
            handleUserAction(o);
          }}
          onCompleteEvent={getAllUsers}
        />
      )}
    </>
  );
  //#endregion
};
