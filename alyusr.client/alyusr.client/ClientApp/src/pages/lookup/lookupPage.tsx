import { FC, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { ConfirmModelDialogBox } from "../../components/box/confirmDialogBox";
import { LoadingBox } from "../../components/box/loadingBox";
import { MessageBox } from "../../components/box/messageBox";
import { ModelDialogBox } from "../../components/box/modelDialogBox";
import { ToastBoxV2 } from "../../components/box/toastBoxV2";
import { LookupList } from "../../components/lookup/lookupList";
import { RegisterLookup } from "../../components/lookup/registerLookup";
import { ToastModel } from "../../models/common/toastModel";
import { ActionButtons } from "../../models/dialog/dialogModel";
import { ActionTypeEnum } from "../../models/enums/enumList";
import { LookupModel } from "../../models/lookup/lookups";
import { RequestAction } from "../../models/user/userRegisterationResponse";
import { ValidationError } from "../../models/validation/error";
import {
  getLookupByType,
  deleteLookup,
} from "../../serviceBroker/alYusrApiServiceBroker";
export const LookupPage: FC<{}> = () => {
  //#region state
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
  const [objects, setObjects] = useState<LookupModel[]>([]);
  const [object, setObject] = useState<LookupModel | null>(null);
  const [toastModel, setToastModel] = useState<ToastModel>({
    show: false,
    variant: "Primary",
  });
  const [showAddModel, setShowAddModel] = useState(false);
  const [showModifyModel, setShowModifyModel] = useState(false);
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [showToastModel, setShowToastModel] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  //#endregion
  //#region varaibles
  const deleteActions: ActionButtons[] = [
    {
      text: t("connfirmDialog.yes"),
      onClick: () => {
        handleDelete();
      },
    },
    {
      text: t("connfirmDialog.no"),
      onClick: () => {
        setObject(null);
        setShowDeleteModel(false);
      },
    },
  ];
  //#endregion
  //#region useEffect
  useEffect(() => {
    const fillData = async () => {
      await getAllObjects();
    };
    fillData();
  }, []);
  //#endregion
  //#region function
  const handleAction = async (request: RequestAction) => {
    var obj = objects.filter((p) => p.ID === request.id)[0];
    switch (request.action) {
      case ActionTypeEnum.Update:
        obj.rowState = 2;
        setObject(obj);
        setShowModifyModel(true);
        break;
      case ActionTypeEnum.Delete:
        setObject(obj);
        setShowDeleteModel(true);
        break;
    }
  };
  const getAllObjects = async () => {
    setLoading(true);
    const result = await getLookupByType(Number(searchParams.get("typeId")));
    console.log("result", result);
    // @ts-ignore
    setObjects(result?.Result);
    // @ts-ignore
    setValidationErrors(result?.Errors);
    setLoading(false);
  };
  const handleAddComplete = async (status: boolean) => {
    setShowAddModel(false);
    switch (status) {
      case true:
        setLoading(true);
        await getAllObjects();
        let toastObjectToastModel = toastModel;
        toastObjectToastModel.body = "process completed successfully";
        toastObjectToastModel.variant = "Success";
        setLoading(false);
        setToastModel(toastObjectToastModel);
        setShowToastModel(true);
        break;
      default:
        break;
    }
  };
  const handleModifyComplete = async (status: boolean) => {
    setShowModifyModel(false);
    switch (status) {
      case true:
        setLoading(true);
        await getAllObjects();
        let toastObjectToastModel = toastModel;
        toastObjectToastModel.body = "process completed successfully";
        toastObjectToastModel.variant = "Success";
        setLoading(false);
        setToastModel(toastObjectToastModel);
        setShowToastModel(true);
        break;
      default:
        break;
    }
  };
  const handleDelete = async () => {
    setShowDeleteModel(false);
    var deleteObjectResponse = await deleteLookup(
      object !== null ? object.ID : 0
    );
    let toastObjectToastModel = toastModel;
    if (
      deleteObjectResponse.Errors != null &&
      deleteObjectResponse.Errors.length !== 0
    ) {
      toastObjectToastModel.body = "process failed try again alter";
      toastObjectToastModel.variant = "Danger";
    } else {
      toastObjectToastModel.body = "process completed successfully";
      toastObjectToastModel.variant = "Success";
      getAllObjects();
    }
    setToastModel(toastObjectToastModel);
    setShowToastModel(true);
  };
  //#endregion
  //#region html
  return (
    <>
      {loading && <LoadingBox />}
      {<MessageBox errors={validationErrors} />}
      {showToastModel && (
        <ToastBoxV2
          isShown={showToastModel}
          header={toastModel.Header}
          body={toastModel.body}
          variant={toastModel.variant}
          delayDuration={toastModel.delayDuration}
          onCloseEvent={() => {
            setShowToastModel(false);
          }}
        />
      )}
      {/* delete object  */}
      <ConfirmModelDialogBox
        isModelVisible={showDeleteModel}
        onCloseEvent={() => {
          setShowDeleteModel(false);
        }}
        actions={deleteActions}
      >
        <>Are you sure?</>
      </ConfirmModelDialogBox>
      {/* register object  */}
      <ModelDialogBox
        isModelVisible={showAddModel}
        isCloseButtonVisible={false}
      >
        <RegisterLookup onComplete={handleAddComplete} />
      </ModelDialogBox>
      <Button
        variant="outline-primary"
        onClick={() => {
          setShowAddModel(true);
        }}
      >
        {t("user.Add")}
      </Button>

      {/* modify user  */}
      <ModelDialogBox
        isModelVisible={showModifyModel}
        isCloseButtonVisible={false}
      >
        <RegisterLookup onComplete={handleModifyComplete} request={object} />
      </ModelDialogBox>
      {/* unit list */}
      {objects && objects.length !== 0 && (
        <LookupList
          request={objects}
          onActionEvent={(o: RequestAction) => {
            handleAction(o);
          }}
          onCompleteEvent={getAllObjects}
        />
      )}
    </>
  );
  //#endregion
};
