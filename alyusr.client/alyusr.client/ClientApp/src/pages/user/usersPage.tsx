import { FC, useEffect, useState } from "react";
import { LoadingBox } from "../../components/box/loadingBox";
import { MessageBox } from "../../components/box/messageBox";
import { RegisterUser, UsersList } from "../../components/user";
import { UserRegisterationResponse } from "../../models/user/userRegisterationResponse";
import { ValidationError } from "../../models/validation/error";
import {
  getUsers,
  registerUser,
} from "../../serviceBroker/alYusrApiServiceBroker";
export const UsersPage: FC<{}> = () => {
  //#region state
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
  const [users, setUsers] = useState<UserRegisterationResponse[]>([]);
  //#endregion
  //#region useEffect
  useEffect(() => {
    const fillData = async () => {
      setLoading(true);
      const userList = await getUsers();
      setUsers(userList);
      setLoading(false);
    };
    fillData();
  }, []);
  //#endregion
  //#region function
  const handleSubmitUser = async (request: UserRegisterationResponse) => {
    setLoading(true);
    try {
      setLoading(true);
      const res = await registerUser(request);
      setValidationErrors(
        res != null && res.Errors != null && res.Errors.length !== 0
          ? res.Errors
          : []
      );
      setLoading(false);
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
      <RegisterUser onSubmit={handleSubmitUser} />
      {users && users.length !== 0 && <UsersList request={users} />}
    </>
  );
  //#endregion
};
