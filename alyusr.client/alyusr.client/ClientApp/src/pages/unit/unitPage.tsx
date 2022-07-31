import { FC, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ConfirmModelDialogBox } from "../../components/box/confirmDialogBox";
import { LoadingBox } from "../../components/box/loadingBox";
import { MessageBox } from "../../components/box/messageBox";
import { ModelDialogBox } from "../../components/box/modelDialogBox";
import { ToastBoxV2 } from "../../components/box/toastBoxV2";
import { RegisterUnit } from "../../components/units/registerUnit";
import { UnitList } from "../../components/units/unitList";
import { ToastModel } from "../../models/common/toastModel";
import { ActionButtons } from "../../models/dialog/dialogModel";
import { ActionTypeEnum } from "../../models/enums/enumList";
import { UnitModel } from "../../models/unit/unit";
import { RequestAction } from "../../models/user/userRegisterationResponse";
import { ValidationError } from "../../models/validation/error";
import {
  deleteUnit,
  getUnits,
} from "../../serviceBroker/alYusrApiServiceBroker";
export const UnitPage: FC<{}> = () => {
  //#region state
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
  const [objects, setObjects] = useState<UnitModel[]>([]);
  const [object, setObject] = useState<UnitModel | null>(null);
  const [toastModel, setToastModel] = useState<ToastModel>({
    show: false,
    variant: "Primary",
  });
  const [showAddModel, setShowAddModel] = useState(false);
  const [showModifyModel, setShowModifyModel] = useState(false);
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [showToastModel, setShowToastModel] = useState(false);
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
    const result = await getUnits();
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
    var deleteObjectResponse = await deleteUnit(
      object !== null ? object.ID : 0
    );
    let toastObjectToastModel = toastModel;
    if (
      deleteObjectResponse.Errors != null &&
      deleteObjectResponse.Errors.length !== 0
    ) {
      toastObjectToastModel.body = "process failed try again alter-1";
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
        <RegisterUnit onComplete={handleAddComplete} />
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
        <RegisterUnit onComplete={handleModifyComplete} request={object} />
      </ModelDialogBox>
      {/* unit list */}
      {objects && objects.length !== 0 && (
        <UnitList
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
