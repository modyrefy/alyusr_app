import { FC, useEffect, useState } from "react";
import { LoadingBox } from "../../components/box/loadingBox";
import { RegisterUser, UsersList } from "../../components/user";
import { UserRegisterationResponse } from "../../models/user/userRegisterationResponse";
import { getUsers } from "../../serviceBroker/alYusrApiServiceBroker";
export const UsersPage: FC<{}> = () => {
  //#region state
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserRegisterationResponse[]>([]);
  //#endregion
  //#region useEffect
  useEffect(() => {
    const fillData = async () => {
      setLoading(true);
      const userList = await getUsers();
      console.log("GetUsersList", userList);
      setUsers(userList);
      setLoading(false);
    };
    fillData();
  }, []);
  //#endregion
  //#region function

  //#endregion
  //#region html
  return (
    <>
      {loading && <LoadingBox />}
      <RegisterUser />
      {users && users.length !== 0 && <UsersList request={users} />}
    </>
  );
  //#endregion
};
