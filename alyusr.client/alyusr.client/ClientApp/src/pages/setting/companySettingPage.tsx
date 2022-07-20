import { FC, useEffect, useState } from "react";
import { LoadingBox } from "../../components/box/loadingBox";
import { CompanySettingDetails } from "../../components/setting";
import { CompanySetting } from "../../models/company/companySetting";
import { getCompanySetting } from "../../serviceBroker/alYusrApiServiceBroker";

export const CompanySettingPage: FC<{}> = () => {
  //#region state
  const [loading, setLoading] = useState(false);
  const [setting, setSetting] = useState<CompanySetting | null>();
  //#endregion
  //#region useEffect
  useEffect(() => {
    const fillData = async () => {
      await getSetting();
    };
    fillData();
  }, []);
  //#endregion
  //#region function
  const getSetting = async () => {
    setLoading(true);
    const settingDetails = await getCompanySetting();
    console.log("settingDetails", settingDetails);
    setSetting(settingDetails);
    setLoading(false);
  };
  //#endregion
  return (
    <>
      {loading && <LoadingBox />}
      {setting && <CompanySettingDetails request={setting} />}
    </>
  );
};
